import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background: white;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  color: #2c3e50;
  text-align: center;
  margin-bottom: 2rem;
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 200px;
  padding: 1rem;
  margin-bottom: 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #3498db;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.8rem;
  margin-bottom: 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #3498db;
  }
`;

const Button = styled.button`
  background: #3498db;
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s ease;
  
  &:hover {
    background: #2980b9;
  }
  
  &:disabled {
    background: #bdc3c7;
    cursor: not-allowed;
  }
`;

const Controls = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
`;

const TextToSpeech = () => {
  const [text, setText] = useState('');
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
      setSelectedVoice(availableVoices[0]?.name || '');
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  const handleSpeak = () => {
    if (text && selectedVoice) {
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = voices.find(voice => voice.name === selectedVoice);
      
      utterance.onend = () => {
        setIsSpeaking(false);
      };

      window.speechSynthesis.speak(utterance);
    }
  };

  const handleStop = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  return (
    <Container>
      <Title>Text to Speech Converter</Title>
      <TextArea
        placeholder="Enter text to convert to speech..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Select
        value={selectedVoice}
        onChange={(e) => setSelectedVoice(e.target.value)}
      >
        {voices.map((voice) => (
          <option key={voice.name} value={voice.name}>
            {voice.name} ({voice.lang})
          </option>
        ))}
      </Select>
      <Controls>
        <Button onClick={handleSpeak} disabled={isSpeaking || !text}>
          {isSpeaking ? 'Speaking...' : 'Speak'}
        </Button>
        {isSpeaking && (
          <Button onClick={handleStop}>
            Stop
          </Button>
        )}
      </Controls>
    </Container>
  );
};

export default TextToSpeech;

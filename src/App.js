import React from 'react';
import TextToSpeech from './components/TextToSpeech';
import styled from 'styled-components';

const AppContainer = styled.div`
  min-height: 100vh;
  background: #f5f6fa;
  padding: 20px;
`;

const Header = styled.header`
  text-align: center;
  color: #2c3e50;
  margin-bottom: 2rem;
`;

function App() {
  return (
    <AppContainer>
      <Header>
        <h1>Text to Speech App</h1>
      </Header>
      <TextToSpeech />
    </AppContainer>
  );
}

export default App;

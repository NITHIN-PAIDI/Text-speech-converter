import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { createGlobalStyle } from 'styled-components'
import reportWebVitals from './reportWebVitals'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif
    -webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing: grayscale
  }
`

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>
)

reportWebVitals()

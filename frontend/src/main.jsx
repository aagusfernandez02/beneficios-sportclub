import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import App from './App.jsx'
import { ThemeProvider } from '@emotion/react'
import theme from './assets/theme'

createRoot(document.getElementById('root')).render(
  // Des-comentar strictmode en produccion
  // <StrictMode>
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
  // </StrictMode>,
)

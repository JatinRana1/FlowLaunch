import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { GlobalContextProvider } from './context/GlobalContext.jsx'
import './css/scss/custom.scss';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GlobalContextProvider>
      <App />
    </GlobalContextProvider>
  </StrictMode>
)

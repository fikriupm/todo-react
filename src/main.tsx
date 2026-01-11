import './index.css'
import App from './App'
import { AppContextProvider } from './context/AppContext'
import ReactDOM from 'react-dom/client'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AppContextProvider>
    <App />
  </AppContextProvider>
)

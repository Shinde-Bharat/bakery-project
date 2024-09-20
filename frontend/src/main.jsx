import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';
import App from './App.jsx'
import './index.css'
import { NextUIProvider } from '@nextui-org/react'
import store from './redux/store.js';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <NextUIProvider>
        <App />
      </NextUIProvider>
    </Provider>
  </StrictMode>,
)

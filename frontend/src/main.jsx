import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';
import App from './App.jsx'
import './index.css'
import { NextUIProvider } from '@nextui-org/react'
import store from './redux/store.js';
import { Toaster } from "@/components/ui/toaster"


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <NextUIProvider>
        <App />
        <Toaster />
      </NextUIProvider>
    </Provider>
  </StrictMode>,
)

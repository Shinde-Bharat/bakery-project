import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';
import App from './App.jsx'
import './index.css'
import { NextUIProvider } from '@nextui-org/react'
import { store, persistor } from './redux/store';
import { Toaster } from "@/components/ui/toaster"
import { PersistGate } from 'redux-persist/integration/react';



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NextUIProvider>
          <App />
          <Toaster />
        </NextUIProvider>
      </PersistGate>
    </Provider>
  </StrictMode>,
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/lib/queryClient'
import { Toast } from '@/components/ui/Toast'
import { useAuthStore } from '@/store/auth.store'
import './index.css'
import App from './App.tsx'

useAuthStore.getState().initialize();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
        <Toast />
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {router} from '../src/router/routerConfig'
import { setupAxiosInterceptor } from './api/axiosClient'
import { RouterProvider } from 'react-router'

const queryClient = new QueryClient()
setupAxiosInterceptor()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
)

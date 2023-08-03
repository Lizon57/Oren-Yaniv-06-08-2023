import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { App } from './app'


const queryProvider = new QueryClient()


ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryProvider}>
    <App />
  </QueryClientProvider>,
)

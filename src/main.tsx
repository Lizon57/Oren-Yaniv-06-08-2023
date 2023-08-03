import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider as ReduxProvider } from "react-redux"

import { store } from '@/store/store'

import { App } from './app'


const queryProvider = new QueryClient()


ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryProvider}>
    <ReduxProvider store={store}>
      <App />
    </ReduxProvider>
  </QueryClientProvider>,
)

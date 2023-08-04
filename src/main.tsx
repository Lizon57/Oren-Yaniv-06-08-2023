import ReactDOM from 'react-dom/client'
import { Provider as ReduxProvider } from "react-redux"
import { store } from '@/store/store'
import { App } from './app'


ReactDOM.createRoot(document.getElementById('root')!).render(
    <ReduxProvider store={store}>
      <App />
    </ReduxProvider>,
)

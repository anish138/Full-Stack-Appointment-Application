import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';
import App from './App.jsx'



import { CookiesProvider } from 'react-cookie';
import store from './components/store.jsx';
import { Provider } from 'react-redux';
import { Index } from './project/index.jsx';


createRoot(document.getElementById('root')).render(
  <CookiesProvider>
    <StrictMode>
      <Provider store={store}>
          
        <Index />
        
      </Provider>
    </StrictMode>

  </CookiesProvider>,
)

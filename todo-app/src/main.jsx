import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';
import App from './App.jsx'


import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.js";
import "../node_modules/bootstrap-icons/font/bootstrap-icons.css";
import "../node_modules/react-calendar/dist/Calendar.css"
import { CookiesProvider } from 'react-cookie';
import {store} from './project/store.jsx';
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

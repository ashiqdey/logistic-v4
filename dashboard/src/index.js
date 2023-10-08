
// main scss file
import './assets/scss/main.scss';

import React from "react";
// import ReactDOM from 'react-dom';
import ReactDOM from "react-dom/client";
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

// redux
import { Provider } from "react-redux";
import store from './redux/store';

import { SettingsProvider } from './contexts/SettingsContext';

import App from './App';

// -----------------------------------------------



// ReactDOM.render(
//   <HelmetProvider>
//     <ReduxProvider store={store}>
//       <PersistGate loading={null} persistor={persistor}>
//         <SettingsProvider>
//           <BrowserRouter>
//             <App />
//           </BrowserRouter>
//         </SettingsProvider>
//       </PersistGate>
//     </ReduxProvider>
//   </HelmetProvider>,
//   document.getElementById('root')
// );

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <HelmetProvider>
    <Provider store={store}>
      <SettingsProvider>
      <BrowserRouter basename={process.env.REACT_APP_BASEURL}>
        {/* <BrowserRouter> */}
          <App />
        </BrowserRouter>
      </SettingsProvider>
    </Provider>
  </HelmetProvider >
);

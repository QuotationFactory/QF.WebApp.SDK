import { useEffect } from 'react';
import './App.css';

import { Rh24WebApp } from 'rh24-webapp-sdk';

function App() {
  useEffect(() => {
    const rh24 = new Rh24WebApp({
      partyId: process.env.REACT_APP_RH24_PARTY_ID || '',
      rh24BaseUrl: process.env.REACT_APP_RH24_BASE_URL || '',
      options: {
        marginTop: '0',
        replaceHistoryStateOnLocationChange: true,
        onLocationChange: () => { },
        replaceDocumentTitle: true,
        disableCache: true
      },
      theme: {
        logoSrc: process.env.REACT_APP_RH24_LOGO_SRC || '',
        backgroundColor: 'red',
        backgroundImage: ''
      }
    })

    rh24.render('rh24-container', window.location.pathname || '/projects');
  }, [])

  return (
    <div className="App" id="rh24-container" />
  )
}

export default App;

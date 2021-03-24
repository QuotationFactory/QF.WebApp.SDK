import { useEffect } from 'react';
import './App.css';

import { Rh24WebApp } from '@metal-heaven/rh24-webapp-sdk';
import { colors } from '@material-ui/core';

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
        typography: {
          fontFamily: "'Poppins', sans-serif",
          button: {
            textTransform: 'lowercase' as any
          }
        },
        overrides: {
          MuiCssBaseline: {
            '@global': {
              body: {
                backgroundImage: 'none',
              }
            }
          },
          MuiAppBar: {
            colorPrimary: {
              backgroundColor: colors.grey['900'],
            },
          },
        },
        verticalMenu: {
          backgroundColor: colors.grey['800'],
        },
        palette: {
          type: 'dark',
          primary: { main: colors.lime['400'] },
          text: {
            primary: colors.grey['100'],
          }
        },
        props: {
          MuiInputLabel: {
            shrink: true,
          }
        },
      }
    })

    rh24.render('rh24-container', window.location.pathname || '/projects');
  }, [])

  return (
    <div className="App" id="rh24-container" />
  )
}

export default App;

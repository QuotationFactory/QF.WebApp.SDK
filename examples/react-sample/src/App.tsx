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
              backgroundColor: '#24344d',
            },
          },
        },
        verticalMenu: {
          backgroundColor: '#24344d'
        },
        palette: {
          type: 'dark',
          primary: {
            main: '#5893df',
          },
          secondary: {
            main: '#2ec5d3',
          },
          background: {
            default: '#192231',
            paper: '#24344d',
          },
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

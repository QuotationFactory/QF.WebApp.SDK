import { useEffect } from 'react';
import './App.css';

import { Rh24WebApp } from '@metal-heaven/rh24-webapp-sdk';

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
          fontFamily: ['Lato', 'sans-serif'].join(','),
          button: {
            textTransform: 'none' as any
          }
        },
        verticalMenu: {
          backgroundColor: 'rgba(229, 229, 229, 0.95)',
        },
        overrides: {
          MuiCssBaseline: {
            '@global': {
              body: {
                backgroundImage: 'none',
                backgroundSize: 'cover'
              }
            }
          },
          MuiAppBar: {
            colorPrimary: {
              backgroundColor: '#434C59',
              color: '#fafafa',
              '& button': {
                color: 'inherit'
              },
              '& .MuiInputBase-root > div': {
                color: 'inherit'
              },
            },
          },
          MuiFormLabel: {
            root: {
              whiteSpace: 'nowrap' as any
            }
          },
          MuiInputLabel: {
            root: {
              "&$focused": {
                color: "currentColor",
                borderColor: "black",
              },
              borderColor: "white",
            },
          }
        },
        palette: {
          primary: { main: colors.blue['700'] },
          textPrimary: { main: colors.grey },
          background: {
            default: '#c5c5c560',
            paper: colors.common.white
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

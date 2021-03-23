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
              color: colors.grey['100'],
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
        verticalMenu: {
          backgroundColor: colors.grey['900'],
        },
        palette: {
          type: 'dark',
          primary: { main: colors.common.white },
          // text: {
          //   primary: colors.common.black
          // },
          // background: {
          //   default: '#000',
          //   paper: colors.common.white
          // }
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

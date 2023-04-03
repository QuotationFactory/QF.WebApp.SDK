<!-- PRODUCT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/Rhodium24/rh24-webapp-sdk">
    <img src="https://www.quotationfactory.com/wp-content/uploads/2022/01/rh24.png" alt="Logo">
  </a>

  <h3 align="center">Rhodium24 - WebApp - SDK</h3>

  <p align="center">
    Smart metal calculations, direct quotation and CAM downloads in your company website.
    <br />
    <br />
    <a href="https://www.quotationfactory/rh24-portal">View Demo</a>
    ·
    <a href="https://github.com/Rhodium24/rh24-webapp-sdk/issues">Report Bug</a>
    ·
    <a href="https://github.com/Rhodium24/rh24-webapp-sdk/issues">Request Feature</a>
  </p>
</p>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#getting-started">Getting Started</a>
    </li>
    <li><a href="#prerequisites">Prerequisites</a></li>
    <li>
        <a href="#usage">Usage</a>
        <ul>
            <li>
                <a href="#options">Options</a>
            </li>
            <li>
                <a href="#themev5">Theme</a>
            </li>
            <li>
                <a href="#advanced">Advanced</a>
                <ul>
                    <li>
                        <a href="#routes">Routes and Deeplinks</a>
                    </li>
                    <li>
                        <a href="#onlocationchange">Handling event onLocationChange</a>
                    </li>
                </ul>
            </li>
        </ul>    
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

<div align="center">
  <a href="https://www.youtube.com/watch?v=2JMnIuOxlto"><img src="https://img.youtube.com/vi/2JMnIuOxlto/0.jpg" alt="IMAGE ALT TEXT"></a>
</div>

this package will allow you to easily make Rhodium24 runs in your website

<!-- GETTING STARTED -->

## Getting Started

You can install the package with npm

```bash
npm install @metal-heaven/rh24-webapp-sdk
```

or you can reference the script hosted on Rhodium24 CDN

```html
<script src="https://rhodium24.io/sdk/rh24-webapp-sdk.js"></script>
```

## Prerequisites

The referenced script will allow you to control the render of an `<iframe>` pointing to Rhodium24 webapp. You can call the `render` method any time (after a user click, or after the page load) and control some aspects of the app style (for now just the logo src, but more to came).

Be aware that is preferable to run Rhodium24 using the hole view port. Please contact Rhodium24 staff if you need more control on it.

## Usage

1. Get your partyId in [Rh24 integration settings page](https://rhodium24.io/app/settings/integrations/webapp)

2. Install the script in the desired page

3. You can define a container DOM node to be parent of the iframe.

```html
<div id="rh24-container" />
```

4. Instanciate the rh24-webapp-sdk

```javascript
const rh24 = new rh24Sdk.Rh24WebApp({
            partyId: '<YOUR_PARTY_ID>',
            rh24BaseUrl: 'https://rhodium24.io',
            theme: {
                logoSrc: '<COMPANY LOGO>,
            }
        })

        rh24.render('rh24-container', window.location.hash.slice(1));

```

## Options

The options object comes with some handy flags to control what the sdk will do for you

- `marginTop`: if you wish to keep your site navbar visible at top of page, define the size of the marginTop property so the height of rh24 app will be calculated approperly
- `onLocationChange`: `(relativePath: string) => void`: Callback to control the Rhodium24 onLocationChange event. If you don't define it and has `replaceHistoryStateOnLocationChange` the HTML5 History API (pushState) will be used to change the browser URL
- `replaceHistoryStateOnLocationChange`: If `true` will use the HTML History API to change the browser URL when you navigate in Rhodium24 pages.
- `replaceDocumentTitle`: If `true` will change the `document.title` to be in sync with Rhodium24 context
- `disableCache`: If `true` will add a dummy querystring (`?v=Math.random()`) to iframe src in order to not get a cached result.

## ThemeV5
Rhodium24 uses the @mui/material for UI components and theme support. To be able to customize the look and feel of the website, refer to [official documentation](https://mui.com/material-ui/customization/theming).

To use the new version, you should set the themeV5 property like this
```javascript
    themeV5: {
      logoSrc: <your logo url>,
      typography: {
        fontFamily: "'Poppins', sans-serif",
        button: {
          textTransform: 'lowercase'
        }
      },
      components: {
        MuiCssBaseline: {
          styleOverrides: {
            '@global': {
              body: {
                backgroundImage: 'none',
              },
            },
          },
        },
        MuiAppBar: {
          styleOverrides: {
            colorPrimary: {
              backgroundColor: '#24344d',
              boxShadow: '0px 0 2px 0 #a8a7a6',
            },
          },
        },
      }
    }
```

### Changing the background

To override <body> styling properties progress with the following:

```javascript
  themeV5: {
      overrides: {
        '@global': {
          backgroundImage: 'none',
          backgroundColor: '#FAFAFA"
        }
      }
  }

```

### Palette

You can define many aspect of the color palette for the web site

```javascript
themeV5: {
 palette: {
    mode: 'dark',
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
    error: {
      main: '#f44337',
    },
    warning: {
      main: '#ffa727',
    },
    info: {
      main: '#29b6f7',
    },
    success: {
      main: '#66bb6b',
    },
    divider: 'rgba(255,255,255,0.13)',
  },
}
```

### Typography

If the host page already import the necessary fonts, you can set the the fontFamily like this

```javascript
   themeV5: {
     typography: {
       fontFamily: "'Poppins', sans-serif",
     }
   }
```

But, if the host page don't import the necessary fonts, you should also inform the fontFamilies that need to be imported from Google Fonts

```javascript
  themeV5: {
    googleFonts: 'Poppins, Lato',
    typography: {
      fontFamily: 'Poppins' //default fontFamily
      h1: {
        fontFamily: 'Lato' //override the fontFamily h1 tag
      }
    }
  }
```

### AppBar

To change the top navigation bar (where you have the search and the menu)

```javascript
  themeV5: {
    overrides: {
      MuiAppBar: {
        colorPrimary: {
          backgroundColor: '#FAFAFA',
          color: 'black'
        }
      }
    }
  }
```

### Project Page vertical menu

This will change the styling of the left side menu within the project page

```javascript
  themeV5: {
    verticalMenu: {
      backgroundColor: '#FAFAFA',
    },
  }
```

### Theme creator helper

You can use this [@mui theme generator](https://zenoo.github.io/mui-theme-creator) to create your theme.


## Theme (material-ui v4 - deprecated)

* the property theme was deprecated in favor of themeV5 * 

Rhodium24 uses the React-MaterialUI library, allowing the use of `ThemeOptions` to customize many aspects of the user interface. Please refer to a sample implmentation of this mechanism in the examples folder. Some common customization could be the following.

if you'd like to see all the default material-ui properties that can be changed, please check [material-ui's default theme](https://material-ui.com/customization/default-theme/).

Needs inspiration? checkout the [material theme creator](https://bareynol.github.io/mui-theme-creator/)


## Advanced

### Routes

The `render` method receives two parameters: the container element id and the relative path to render Rhodium24. It's up to you define how you will handle the routes and send it to the correct page. Check the samples for usage within a React App and for vanilla HTML app.

### onLocationChange

You can define how to handle location changes by defining the `options.onLocationChange` method.

```javascript
// deep link integration using window.location.hash
// will generate urls like https://<your-company>.com/<page>/#/project/<project-id>

const rh24 = new rh24Sdk.Rh24WebApp({
            partyId: '<YOUR_PARTY_ID>',
            rh24BaseUrl: 'https://rhodium24.io',
            options: {
                // by default the sdk changes the URL using HTML5 history api
                replaceHistoryStateOnLocationChange: false
                onLocationChange: (path) => {
                    window.location.hash = path
                }
            }
            theme: {
                logoSrc: '<COMPANY LOGO>',
            }
        })

rh24.render('rh24-container', window.location.hash)
```

<!-- ROADMAP -->

## Roadmap

See the [open issues](https://github.com/Rhodium24/rh24-webapp-sdk/issues) for a list of proposed features (and known issues).

<!-- CONTACT -->

## Contact

- [Quotation Factory](https://quotationfactory.com)
- [info@quotationfactory.com](info@quotationfactory.com)

Project Link: [https://github.com/Rhodium24/rh24-webapp-sdk/](https://github.com/Rhodium24/rh24-webapp-sdk)

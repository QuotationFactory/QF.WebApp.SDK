<!-- PRODUCT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/Rhodium24/rh24-webapp-sdk">
    <img src="https://www.metal-heaven.com/wp-content/uploads/2019/09/logo_rhodium24_wit-2-1000x234.png" alt="Logo" height="80">
  </a>

  <h3 align="center">Rhodium24 - WebApp - SDK</h3>

  <p align="center">
    Smart metal calculations, direct quotation and CAM downloads in your company website.
    <br />
    <br />
    <a href="https://metal-heaven.com/integration">View Demo</a>
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
                <a href="#theme">Theme</a>
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

1. Get your partyId in [Rh24 integration settings page](https://rhodium24.io/settings/dev/webapp)

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

        rh24.render('rh24-container', '/projects');

```

## Options

The options object comes with some handy flags to control what the sdk will do for you

- `marginTop`: if you wish to keep your site navbar visible at top of page, define the size of the marginTop property so the height of rh24 app will be calculated approperly
- `onLocationChange`: `(relativePath: string) => void`: Callback to control the Rhodium24 onLocationChange event. If you don't define it and has `replaceHistoryStateOnLocationChange` the HTML5 History API (pushState) will be used to change the browser URL
- `replaceHistoryStateOnLocationChange`: If `true` will use the HTML History API to change the browser URL when you navigate in Rhodium24 pages.
- `replaceDocumentTitle`: If `true` will change the `document.title` to be in sync with Rhodium24 context
- `disableCache`: If `true` will add a dummy querystring (`?v=Math.random()`) to iframe src in order to not get a cached resut.

## Theme

Over the time we will allow you to customize more aspects of Rhodium24 to flawsy integrate it with your company design. For now we have the following capabilities

- `logoSrc`: Define the logo that will be show in Rhodium24.

## Advanced

### Routes

The `render` method receives two parameters: the container element id and the relative path to render Rhodium24. Is up to you define how you will handle the routes and send it to the correct page. Check the samples for usage within a React App and for vanilla HTML app.

### onLocationChange

You can define how to handle location changes by defining the `options.onLocationChage` method.

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
                logoSrc: '<COMPANY LOGO>,
            }
        })

rh24.render('rh24-container', window.location.hash)
```

<!-- ROADMAP -->

## Roadmap

See the [open issues](https://github.com/Rhodium24/rh24-webapp-sdk/issues) for a list of proposed features (and known issues).

<!-- CONTACT -->

## Contact

- [Metal Heaven](https://metal-heaven.com)
- [info@metal-heaven.com](info@metal-heaven.com)

Project Link: [https://github.com/Rhodium24/rh24-webapp-sdk/](https://github.com/Rhodium24/rh24-webapp-sdk)

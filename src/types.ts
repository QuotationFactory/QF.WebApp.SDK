import { ThemeOptions } from '@material-ui/core/styles'
import { CSSProperties } from '@material-ui/core/styles/withStyles'
import { Rh24WebApp } from './rh24-webapp-sdk'

declare global {
  interface Window {
    Rh24WebApp: Rh24WebApp
  }
}

declare module '@material-ui/core/styles/createMuiTheme' {
  /**
   *  options applied to the left side menu in the Project Page
   */
  interface VerticalMenu {
    backgroundColor?: string
    color?: string
  }

  /**
   *  enhanced Material-UI Theme object with customizations options
   */
  interface Theme {
    logoSrc: string
    verticalMenu?: VerticalMenu
    BoMThumbnail: {
      mixBlendMode: CSSProperties['mixBlendMode']
    }
    googleFonts?: string
  }

  /**
   * enhanced Material-UI ThemeOptions object
   * @see https://material-ui.com/customization/theming/
   */
  interface ThemeOptions {
    /**
     * your company logo uri.
     */
    logoSrc: string
    /**
     * Project page's vertical menu options
     */
    verticalMenu?: VerticalMenu
    /**
     * Apply mixBlendMode css prop to each part / assembly thumbnail in project page.
     * can be useful for light designs to hide the images background
     */
    BoMThumbnail?: {
      mixBlendMode: CSSProperties['mixBlendMode']
    }
    /**
     * Comma separated font family names that needs to be imported from googleFonts.
     *
     * @example: https://fonts.googleapis.com/css2?family=<fontFamily>&display=swap
     */
    googleFonts?: string
  }
}

export type Rh24ApplicationConfig = {
  /** organization id provided by QuotationFactory */
  partyId: string
  /** the Rhodium24 base URL (ie https://rhodium24.io) */
  rh24BaseUrl: string
  options?: {
    /** marginTop in pixels (used to calculate the height of Rhodium24 iFrame) */
    marginTop?: string
    /** hook location changes events, giving the oportunity to proper update the browser URL */
    onLocationChange?: (relativePath: string) => void
    /** if true, the parent window URL will be automatically updated */
    replaceHistoryStateOnLocationChange?: boolean
    /** if true, the document titile will be updated with Rhodium24 context */
    replaceDocumentTitle?: boolean
    /** if true, no random query string will be sent, potentially enabling caching of the applications (app updates may not be available to user unless clear caching, close browser, etc) */
    disableCache?: boolean
  }
  theme?: ThemeOptions
  /**
   * this page will act as your portal landing page. It should implement the following:
   * - a button to redirect to /login app page
   * - a button to redirect to /signup app page
   *
   * those buttons should call post a message to the iframe with the following payload:
   * {
   *  type: 'RH24_Change_Location',
   *  relativeUrl: '/login' | '/signup'
   * }
   * @example:
   *   <button onClick={"rh24RedirectMessage('/login')"}>Login</button>
   *   <button onClick={"rh24RedirectMessage('/signup')"}>Signup</button>
   *   <script>
   *     function rh24RedirectMessage(path) {
   *         window.parent?.postMessage({
   *             type: 'RH24_Change_Location',
   *             relativePath: path
   *         }, 'https://local.rhodium24.io:3000')
   *     }
   *   </script>
   *
   */
  landingPageUrl?: string
}

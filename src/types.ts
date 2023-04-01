// import { ThemeOptions } from '@material-ui/core/styles'
import { ThemeOptions } from '@mui/material'
import { Rh24WebApp } from './rh24-webapp-sdk'
import { DeprecatedThemeOptions } from '@mui/material/styles';

type MixBlendMode = 'normal' | 'multiply' | 'screen' | 'overlay' | 'darken' | 'lighten' | 'color-dodge' | 'color-burn' | 'hard-light' | 'soft-light' | 'difference' | 'exclusion' | 'hue' | 'saturation' | 'color' | 'luminosity';

declare global {
  interface Window {
    Rh24WebApp: Rh24WebApp
  }
}

declare module '@mui/material' {
  /*
   *  options applied to the left side menu in the Project Page
   */
  interface VerticalMenu {
    backgroundColor?: string
    color?: string
    boxShadow?: string
  }

  interface IconColors {
    outline?: string
    highlight?: string
    white?: string
  }

  /**
   *  enhanced Material-UI Theme object V5 with customizations options
   */
  interface Theme {
    logoSrc?: string
    verticalMenu?: VerticalMenu
    BoMThumbnail: {
      mixBlendMode: MixBlendMode
    }
    googleFonts?: string
    backgroundImageSrc?: string
    iconColors?: IconColors
  }

  /**
   * enhanced Material-UI ThemeOptions V4 object
   * @see https://material-ui.com/customization/theming/
   */
  interface DeprecatedThemeOptions {
    /**
    * your company logo uri.
    */
    logoSrc?: string
    /**
     * Project page's vertical menu options
     */
    verticalMenu?: VerticalMenu
    /**
     * Apply mixBlendMode css prop to each part / assembly thumbnail in project page.
     */
    BoMThumbnail?: {
      mixBlendMode: MixBlendMode
    }
    /**
     * Comma separated font family names that needs to be imported from googleFonts.
     * @example: Roboto, Open Sans
     */
    googleFonts?: string
    backgroundImageSrc?: string
    iconColors?: IconColors
  }

  interface ThemeOptions {
    /**
     * your company logo uri.
     */
    logoSrc?: string
    /**
     * Project page's vertical menu options
     */
    verticalMenu?: VerticalMenu
    /**
     * Apply mixBlendMode css prop to each part / assembly thumbnail in project page.
     */
    BoMThumbnail?: {
      mixBlendMode: MixBlendMode
    }
    /**
     * Comma separated font family names that needs to be imported from googleFonts.
     * @example: Roboto, Open Sans
    */
    googleFonts?: string
    /**
     * Background image uri
     */
    backgroundImageSrc?: string
    /**
     * Icon colors 
     */
    iconColors?: IconColors
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
    /**
     * @deprecated
     * by default a random number is added to the iframe src to avoid caching issues.
     * use the option enableCache to disable this behavior
     * if true, a random query string will be sent, disabling the browser cache
     */
    disableCache?: boolean
    /**
     * if true, no random query string will be appended to the iframe src, enabling the browser cache by URL
     */
    enableCache?: boolean
  }
  /**
   * @deprecated use themeV5 instead.
   * @see https://mui.com/customization/theming/
   * @see https://mui.com/material-ui/migration/v5-style-changes/
   */
  theme?: DeprecatedThemeOptions

  /**
   * Theme options for Material-UI V5
   * @see https://mui.com/customization/theming/
   */
  themeV5?: ThemeOptions
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

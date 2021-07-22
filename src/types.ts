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
  partyId: string
  rh24BaseUrl: string
  options?: {
    marginTop?: string
    onLocationChange?: (relativePath: string) => void
    replaceHistoryStateOnLocationChange?: boolean
    replaceDocumentTitle?: boolean
    disableCache?: boolean
  }
  theme?: ThemeOptions
}

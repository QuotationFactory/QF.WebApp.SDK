import { Rh24WebApp } from './rh24-webapp-sdk'
import { Theme } from '@material-ui/core/styles'

declare global {
  interface Window {
    Rh24WebApp: Rh24WebApp
  }
}

declare module '@material-ui/core/styles/createMuiTheme' {
  interface VerticalMenu {
    backgroundColor?: string
    color?: string
  }

  interface Theme {
    logoSrc: string
    verticalMenu?: VerticalMenu
  }

  interface ThemeOptions {
    logoSrc: string
    verticalMenu?: VerticalMenu
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
  theme?: Theme
}

import { Rh24ApplicationConfig } from './types'

type LocationChangeEvent = {
  type: 'RH24_EMBEDDED_LOCATION_CHANGE'
  payload: {
    pathname: string
  }
}

type DocumentTitleChange = {
  type: 'RH24_EMBEDDED_DOCUMENT_TITLE'
  payload: string
}

type SendConfiguration = {
  type: 'RH24_EMBEDDED_SETUP'
  payload: Rh24ApplicationConfig & { parentHref: string; parentTitle: string }
}

type SendConfigurationRetry = {
  type: 'RH24_EMBEDDED_SETUP_RETRY'
}

type Rh24EmbeddedMessage = LocationChangeEvent | DocumentTitleChange | SendConfiguration | SendConfigurationRetry

export class Rh24WebApp {
  private _config: Rh24ApplicationConfig
  private _container?: HTMLIFrameElement = undefined

  constructor(config: Rh24ApplicationConfig) {
    this._config = config
    this.handleMessages = this.handleMessages.bind(this)
    this.sendConfigurationMessage = this.sendConfigurationMessage.bind(this)
  }

  public render(rootElementId?: string, relativePath = '/projects') {
    if (!this._config.partyId) {
      throw new Error('[rh24-embedded] partyId should not be null or empty')
    }

    if (!this._config.rh24BaseUrl) {
      throw new Error('[rh24-embedded] rh24BaseUrl should not be null or empty')
    }

    let element

    if (rootElementId) {
      element = document.getElementById(rootElementId)
      document.getElementsByTagName('body')[0].style.margin = '0'
    } else {
      element = document.getElementsByTagName('body')[0]
      element.style.margin = '0'
    }

    if (!element) {
      throw new Error('unable to find a root element to draw Rhodium24')
    }

    const iframe = document.createElement('iframe')

    let iframeSrc = `${this._config.rh24BaseUrl.replace(/'/g, '')}/app/${
      relativePath.startsWith('/') ? relativePath.slice(1) : relativePath
    }`
    if (!this._config.options?.enableCache) {
      iframeSrc += `${iframeSrc.indexOf('?') > -1 ? '&' : '?'}v=${Math.random()}`
      iframeSrc = iframeSrc.replace('/?', '?')
    }

    iframe.src = iframeSrc
    iframe.id = 'rh24-iframe'
    iframe.style.width = '100%'
    iframe.style.height = `calc(100vh - ${this._config.options?.marginTop || 0})`
    iframe.style.border = 'none'
    iframe.setAttribute('data-testid', 'rh24-iframe')

    const iframeSandbox = [
      'allow-top-navigation',
      'allow-scripts',
      'allow-same-origin',
      'allow-forms',
      'allow-modals',
      'allow-top-navigation-by-user-activation',
      'allow-downloads',
      'allow-popups',
      'allow-popups-to-escape-sandbox',
      'allow-storage-access-by-user-activation'
    ]

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    iframe.sandbox = iframeSandbox.join(' ')
    iframe.allow = `clipboard-write ${this._config.rh24BaseUrl}; clipboard-read ${this._config.rh24BaseUrl}`

    element.style.overflowY = 'hidden'

    element.appendChild(iframe)

    window.onmessage = this.handleMessages
    iframe.onload = this.sendConfigurationMessage

    this._container = iframe

    return iframe
  }

  private handleMessages(ev: MessageEvent<Rh24EmbeddedMessage>) {
    if (ev.origin !== this._config.rh24BaseUrl) {
      return
    }

    switch (ev.data.type) {
      case 'RH24_EMBEDDED_LOCATION_CHANGE': {
        const rh24EmbededRoute: string = (ev.data.payload?.pathname || '/').replace('/app', '') || '/'
        if (
          this._config.options?.replaceHistoryStateOnLocationChange &&
          rh24EmbededRoute.indexOf('myorganizations') === -1
        ) {
          window.history.replaceState(null, rh24EmbededRoute, rh24EmbededRoute)
        }
        if (this._config.options?.onLocationChange) {
          this._config.options?.onLocationChange(rh24EmbededRoute)
        }
        break
      }
      case 'RH24_EMBEDDED_DOCUMENT_TITLE': {
        if (this._config.options?.replaceDocumentTitle) {
          document.title = ev.data.payload
        }
        break
      }
      case 'RH24_EMBEDDED_SETUP_RETRY': {
        this.sendConfigurationMessage()
        break
      }
    }
  }

  private sendConfigurationMessage() {
    const message: Rh24EmbeddedMessage = {
      type: 'RH24_EMBEDDED_SETUP',
      payload: {
        partyId: this._config?.partyId,
        rh24BaseUrl: this._config?.rh24BaseUrl,
        parentHref: window.location.href,
        parentTitle: document.title,
        theme: { ...(this._config?.theme || {}) },
        themeV5: { ...(this._config?.themeV5 || {}) },
        landingPageUrl: this._config?.landingPageUrl
      }
    }

    this._container?.contentWindow?.postMessage(message, this._config.rh24BaseUrl)
  }
}

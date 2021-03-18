declare global {
  interface Window {
    Rh24WebApp: Rh24WebApp
  }
}

type Rh24ApplicationConfig = {
  partyId: string
  rh24BaseUrl: string
  options?: {
    marginTop?: string
    onLocationChange?: (relativePath: string) => void
    replaceHistoryStateOnLocationChange?: boolean
    replaceDocumentTitle?: boolean
    disableCache?: boolean
  }
  theme?: {
    backgroundColor?: string
    backgroundImage?: string
    logoSrc?: string
  }
}

export class Rh24WebApp {
  private _config: Rh24ApplicationConfig
  private _container?: HTMLIFrameElement = undefined

  constructor(config: Rh24ApplicationConfig) {
    this._config = config
    this.handleMessages = this.handleMessages.bind(this)
    this.handleOnLoad = this.handleOnLoad.bind(this)
  }

  public render(rootElementId?: string, relativePath: string = '/projects') {
    if (!this._config.partyId) {
      throw new Error('[rh24-embedded] partyId should not be null or empty')
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

    let iframeSrc = `${this._config.rh24BaseUrl.replace(/\'/g, '')}/app/${
      relativePath.startsWith('/') ? relativePath.slice(1) : relativePath
    }`

    if (this._config.options?.disableCache) {
      iframeSrc += `?v=${Math.random()}`
      iframeSrc = iframeSrc.replace('/?', '?')
    }

    iframe.src = iframeSrc
    iframe.id = 'rh24-iframe'
    iframe.style.width = '100%'
    iframe.style.height = `calc(100vh - ${this._config.options?.marginTop || 0})`
    iframe.style.border = 'none'
    iframe.setAttribute('data-testid', 'rh24-iframe')

    // @ts-ignore
    iframe.sandbox = 'allow-top-navigation allow-scripts allow-same-origin allow-forms'

    element.style.overflowY = 'hidden'

    element.appendChild(iframe)

    window.onmessage = this.handleMessages
    iframe.onload = this.handleOnLoad

    this._container = iframe
  }

  private handleMessages(ev: MessageEvent<any>) {
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
    }
  }

  private handleOnLoad() {
    setTimeout(() => {
      this._container?.contentWindow?.postMessage(
        {
          partyId: this._config?.partyId,
          theme: { ...(this._config?.theme || {}) },
          type: 'RH24_EMBEDDED_SETUP'
        },
        this._config.rh24BaseUrl
      )
    })
  }
}

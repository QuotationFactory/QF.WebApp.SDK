import { Rh24WebApp } from '../rh24-webapp-sdk'

let rh24: Rh24WebApp

beforeEach(() => {
  rh24 = new Rh24WebApp({
    partyId: 'test-party',
    rh24BaseUrl: 'https://unit-test.rhodium24.io',
    options: {
      marginTop: '0em',
      onLocationChange: (relativeLocation = '') => null,
      replaceHistoryStateOnLocationChange: true,
      replaceDocumentTitle: true,
      disableCache: false
    },
    theme: {
      backgroundColor: '',
      backgroundImage: '',
      logoSrc: ''
    }
  })
})

function renderRhodium(rootElementId?: string, relativePath?: string): HTMLIFrameElement {
  rh24.render()
  return document.getElementById('rh24-iframe') as HTMLIFrameElement
}

test('sdk should be initialized', () => {
  expect(rh24).toBeInstanceOf(Rh24WebApp)
  expect(rh24.render).not.toBeNull
})

test('after call render, the iframe should be visible with the right sandbox', () => {
  document.body.innerHTML = `
    <div id="app" />
  `
  const iframe = renderRhodium('app', '/projects')

  expect(iframe).not.toBeNull()
  expect(iframe.sandbox).toBe('allow-top-navigation allow-scripts allow-same-origin allow-forms')
})

test('should render at body tag if rootElementId is null', () => {
  const iframe = renderRhodium()

  expect(iframe).not.toBeNull()
  expect(iframe.sandbox).toBe('allow-top-navigation allow-scripts allow-same-origin allow-forms')
})

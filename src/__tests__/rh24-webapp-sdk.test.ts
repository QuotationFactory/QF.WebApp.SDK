/**
 * @jest-environment jsdom
 */

import { Rh24WebApp } from '../rh24-webapp-sdk'

let rh24: Rh24WebApp

beforeEach(() => {
  rh24 = new Rh24WebApp({
    partyId: 'test-party',
    rh24BaseUrl: 'https://unit-test.rhodium24.io',
    options: {
      marginTop: '0em',
      onLocationChange: () => null,
      replaceHistoryStateOnLocationChange: true,
      replaceDocumentTitle: true
    },
    theme: {
      logoSrc: '',
      palette: {
        primary: { main: '#00ff00' },
        secondary: { main: '#ff0000' }
      }
    },
    landingPageUrl: 'https://unit-test.rhodium24.io/landing-page'
  })
})

function renderRhodium(rootElementId?: string, relativePath?: string): HTMLIFrameElement {
  const iframeEl = rh24.render(rootElementId, relativePath)
  return iframeEl
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
  expect(iframe.sandbox).toBe(
    'allow-top-navigation allow-scripts allow-same-origin allow-forms allow-modals allow-top-navigation-by-user-activation allow-downloads allow-popups allow-popups-to-escape-sandbox'
  )
})

test('should render at body tag if rootElementId is null', () => {
  const iframe = renderRhodium()

  expect(iframe).not.toBeNull()
  expect(iframe.sandbox).toBe(
    'allow-top-navigation allow-scripts allow-same-origin allow-forms allow-modals allow-top-navigation-by-user-activation allow-downloads allow-popups allow-popups-to-escape-sandbox'
  )
})

test('should append random v parameter with & if other query strings are present', () => {
  const iframe = renderRhodium('app', '/path?query=123&another=456')

  expect(iframe).not.toBeNull()
  expect(iframe.src).toMatch(/[&?]v=[d]*/)
})

test('should append random v parameter with ? if no query strings are present in the url', () => {
  const iframe = renderRhodium('app', '/path')

  expect(iframe).not.toBeNull()
  expect(iframe.src).toMatch(/\?v=[d]*/)
})

test('should add the parameter to allow clipboard read and write from app domain', () => {
  const iframe = renderRhodium('app', '/path')

  expect(iframe).not.toBeNull()
  expect(iframe.allow).toBe(
    'clipboard-write self https://unit-test.rhodium24.io; clipboard-read self https://unit-test.rhodium24.io'
  )
})

test('should not append random v parameter if enable cache is true', () => {
  rh24 = new Rh24WebApp({
    partyId: 'test-party',
    rh24BaseUrl: 'https://unit-test.rhodium24.io',
    options: {
      marginTop: '0em',
      onLocationChange: () => null,
      replaceHistoryStateOnLocationChange: true,
      replaceDocumentTitle: true,
      enableCache: true
    },
    theme: {
      logoSrc: '',
      palette: {
        primary: { main: '#00ff00' },
        secondary: { main: '#ff0000' }
      }
    },
    landingPageUrl: 'https://unit-test.rhodium24.io/landing-page'
  })

  const iframe = rh24.render('app', '/path')

  expect(iframe).not.toBeNull()
  expect(iframe.src).not.toMatch(/\?v=[d]*/)
})

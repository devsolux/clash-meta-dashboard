import {usePrefersDark} from '@solid-primitives/media'
import {Navigate, Route, Routes} from '@solidjs/router'
import {createEffect, lazy, Show} from 'solid-js'
import {Toaster} from 'solid-toast'
import {twMerge} from 'tailwind-merge'
import {Header} from '~/components'
import {ROUTES} from '~/constants'
import {I18nProvider, locale} from '~/i18n'
import {autoSwitchTheme, curTheme, endpoint, favDayTheme, favNightTheme, setCurTheme, setLatestConnectionMsg, useTwemoji, useWsRequest, WsMsg,} from '~/signals'

const Setup = lazy(() => import('~/pages/Setup'))
const Overview = lazy(() => import('~/pages/Overview'))
const Connections = lazy(() => import('~/pages/Connections'))
const Logs = lazy(() => import('~/pages/Logs'))
const Proxies = lazy(() => import('~/pages/Proxies'))
const Rules = lazy(() => import('~/pages/Rules'))
const Config = lazy(() => import('~/pages/Config'))

const ProtectedResources = () => {
  const latestConnectionMsg = useWsRequest<WsMsg>('connections')

  createEffect(() => setLatestConnectionMsg(latestConnectionMsg()))

  return null
}

export const App = () => {
  const prefersDark = usePrefersDark()

  createEffect(() => {
    if (autoSwitchTheme())
      setCurTheme(prefersDark() ? favNightTheme() : favDayTheme())
  })

  return (
    <I18nProvider locale={locale()}>
      <div
        class={twMerge(
          'relative flex h-screen flex-col overscroll-y-none subpixel-antialiased',
          useTwemoji() ? 'font-twemoji' : 'font-no-twemoji',
        )}
        data-theme={curTheme()}
      >
        <Header/>

        <div class="flex-1 overflow-y-auto p-2 sm:p-4">
          <div class="pb-8">
            <Routes>
              <Show when={endpoint()}>
                <Route path={ROUTES.Overview} component={Overview}/>
                <Route path={ROUTES.Proxies} component={Proxies}/>
                <Route path={ROUTES.Rules} component={Rules}/>
                <Route path={ROUTES.Conns} component={Connections}/>
                <Route path={ROUTES.Log} component={Logs}/>
                <Route path={ROUTES.Config} component={Config}/>
                <Route path="*" element={<Navigate href={ROUTES.Overview}/>}/>
              </Show>

              <Route path={endpoint() ? ROUTES.Setup : '*'} component={Setup}/>
            </Routes>

            <Show when={endpoint()}>
              <ProtectedResources/>
            </Show>
          </div>
        </div>

        <Toaster position="bottom-center"/>
      </div>
    </I18nProvider>
  )
}

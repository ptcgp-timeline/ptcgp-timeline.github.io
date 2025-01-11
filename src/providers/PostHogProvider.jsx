import { PostHogProvider } from 'posthog-js/react'
import posthog from 'posthog-js'
import PropTypes from 'prop-types'
import { useEffect } from 'react'

export function PHProvider({ children }) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      posthog.init(
        import.meta.env.VITE_PUBLIC_POSTHOG_KEY,
        {
          api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com',
          loaded: (posthog) => {
            if (import.meta.env.DEV) posthog.debug()
            posthog.capture('$pageview')
          },
          capture_pageview: false,
          capture_pageleave: true,
          autocapture: true,
          persistence: 'localStorage',
          bootstrap: {
            distinctID: posthog.get_distinct_id(),
            isIdentified: true
          }
        }
      )

      const handlePageLeave = () => {
        posthog.capture('$pageleave')
      }

      window.addEventListener('beforeunload', handlePageLeave)

      const handleRouteChange = () => {
        posthog.capture('$pageview')
      }

      window.addEventListener('popstate', handleRouteChange)

      return () => {
        window.removeEventListener('beforeunload', handlePageLeave)
        window.removeEventListener('popstate', handleRouteChange)
      }
    }
  }, [])

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>
}

PHProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
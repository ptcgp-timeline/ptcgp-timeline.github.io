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
          },
          capture_pageview: true,
          capture_pageleave: true,
          autocapture: true,
          persistence: 'localStorage',
          bootstrap: {
            distinctID: posthog.get_distinct_id(),
            isIdentified: true
          }
        }
      )

      // Manually capture initial pageview
      posthog.capture('$pageview')

      // Add page leave listener
      const handlePageLeave = () => {
        posthog.capture('$pageleave')
      }
      window.addEventListener('beforeunload', handlePageLeave)

      return () => {
        window.removeEventListener('beforeunload', handlePageLeave)
      }
    }
  }, [])

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>
}

PHProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
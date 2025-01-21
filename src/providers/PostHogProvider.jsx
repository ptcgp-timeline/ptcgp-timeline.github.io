import { PostHogProvider } from 'posthog-js/react'
import posthog from 'posthog-js'
import PropTypes from 'prop-types'
import { useEffect } from 'react'

export function PHProvider({ children }) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Get current language from URL
      const path = window.location.pathname;
      const langMatch = path.match(/^\/(zh|ja|ko|fr|de|es|it|pt|en)/);
      const currentLang = langMatch ? langMatch[1] : 'en';

      posthog.init(
        import.meta.env.VITE_PUBLIC_POSTHOG_KEY,
        {
          api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com',
          loaded: (posthog) => {
            if (import.meta.env.DEV) posthog.debug()
            // Capture pageview with language info
            posthog.capture('$pageview', {
              language: currentLang,
              path: window.location.pathname,
              url: window.location.href
            })
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
        posthog.capture('$pageleave', {
          language: currentLang
        })
      }

      const handleRouteChange = () => {
        const newPath = window.location.pathname;
        const newLangMatch = newPath.match(/^\/(zh|ja|ko|fr|de|es|it|pt|en)/);
        const newLang = newLangMatch ? newLangMatch[1] : 'en';
        
        posthog.capture('$pageview', {
          language: newLang,
          path: newPath,
          url: window.location.href
        })
      }

      window.addEventListener('beforeunload', handlePageLeave)
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
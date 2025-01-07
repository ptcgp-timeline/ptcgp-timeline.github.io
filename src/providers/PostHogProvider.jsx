import { PostHogProvider } from 'posthog-js/react'
import posthog from 'posthog-js'
import PropTypes from 'prop-types'

export function PHProvider({ children }) {
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
        autocapture: true
      }
    )
  }

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>
} 

PHProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { PHProvider } from './providers/PostHogProvider'
import './utils/i18n/i18n';

dayjs.extend(duration);
dayjs.extend(timezone);
dayjs.extend(utc);

// Get language from URL
const path = window.location.pathname;
const langMatch = path.match(/^\/(zh|ja|ko|fr|de|es|it|pt|en)/);
const currentLang = langMatch ? langMatch[1] : 'en';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Failed to find the root element');
}

const root = createRoot(rootElement);
root.render(
  <StrictMode>
    <PHProvider>
      <App initialLang={currentLang} />
    </PHProvider>
  </StrictMode>
);

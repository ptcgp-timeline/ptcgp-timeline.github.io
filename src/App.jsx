import Timeline from './components/Timeline';
import Header from './components/Header';
import Footer from './components/Footer';
import DevCMS from './routes/DevCMS';
import { eventsData } from './data/timeline';
import { LanguageProvider } from './context';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  // Only show CMS in development mode 
  if (window.location.pathname.startsWith('/dev/cms')) {
    return <DevCMS />;
  }

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background flex flex-col">
        <ErrorBoundary>
          <Header />
          <main className="flex-1">
            <Timeline events={eventsData} />
          </main>
          <Footer />
        </ErrorBoundary>
      </div>
    </LanguageProvider>
  );
}

export default App;

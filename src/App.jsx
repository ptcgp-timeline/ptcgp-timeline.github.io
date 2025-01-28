import Timeline from './components/Timeline';
import Footer from './components/Footer';
import { eventsData } from './data/timeline';
import { LanguageProvider } from './context';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background flex flex-col">
        <ErrorBoundary>
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

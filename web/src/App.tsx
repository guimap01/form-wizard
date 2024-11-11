import { Toaster } from './components/ui/toaster';
import { Register } from './pages/register/Register';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen w-full flex items-center justify-center">
        <Register />
        <Toaster />
      </div>
    </QueryClientProvider>
  );
}

export default App;

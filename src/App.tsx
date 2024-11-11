import { Toaster } from './components/ui/toaster';
import { Register } from './pages/Register';

function App() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <Register />
      <Toaster />
    </div>
  );
}

export default App;

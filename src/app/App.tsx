import { BootGate } from '@/components/boot/BootSequence';
import { Navbar } from '@/components/layout/Navbar';
import { AppRouter } from './router';

export function App() {
  return (
    <BootGate>
      <Navbar />
      <AppRouter />
    </BootGate>
  );
}

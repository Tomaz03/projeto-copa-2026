import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

const redirectRecoveryTokenToResetPage = () => {
  if (!window.location.hash || window.location.pathname === '/reset-password') return;

  const hashParams = new URLSearchParams(window.location.hash.replace(/^#/, ''));
  const hasRecoveryToken =
    hashParams.get('type') === 'recovery' ||
    hashParams.has('access_token') ||
    hashParams.has('refresh_token');

  if (hasRecoveryToken) {
    window.history.replaceState(
      null,
      document.title,
      `/reset-password${window.location.hash}`
    );
  }
};

redirectRecoveryTokenToResetPage();

createRoot(document.getElementById("root")!).render(<App />);

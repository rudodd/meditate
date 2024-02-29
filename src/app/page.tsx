"use client"
import { SessionProvider } from "next-auth/react"
import App from './components/App';
import CssBaseline from '@mui/material/CssBaseline';

// using any because the next auth Session type is throwing typescript errors during build on Vercel
export default function Home(session: any) {

  return (
    <SessionProvider session={session}>
      <CssBaseline enableColorScheme/>
      <App />
    </SessionProvider>
  );
}

"use client"
import { SessionProvider } from "next-auth/react"
import { Session } from 'next-auth';
import App from './components/App';
import CssBaseline from '@mui/material/CssBaseline';


export default function Home(session: Session) {

  return (
    <SessionProvider session={session}>
      <CssBaseline enableColorScheme/>
      <App />
    </SessionProvider>
  );
}

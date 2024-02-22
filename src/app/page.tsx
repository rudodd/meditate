"use client"
import { SessionProvider } from "next-auth/react"
import { Session } from 'next-auth';
import App from './components/App';

export default function Home(session: Session) {

  return (
    <SessionProvider session={session}>
      <App />
    </SessionProvider>
  );
}

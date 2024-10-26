'use client';

import { Session } from "inspector/promises";
import { SessionProvider } from 'next-auth/react';


type Props = {
  children?: React.ReactNode;
  session?: Session | undefined | any
};

export const metadata = {
  title: 'My App',
  description: 'My description',
}

export interface AuthContextProps {
  children: React.ReactNode
  session: Session
}

const Provider = ({children, session}: Props) => {
  return (
    
      <SessionProvider session={session} refetchOnWindowFocus={false}>
        {children}
      </SessionProvider>
    
  )
}

export default Provider
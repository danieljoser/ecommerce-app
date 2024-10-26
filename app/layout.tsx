import '@/styles/globals.css'
import '@mantine/core/styles.css';

import Nav from '@/components/Nav';
import Provider from '@/components/Provider';
import { MantineProvider } from '@mantine/core';
import { Session } from 'next-auth';

type Metadata = {
  title: string,
  description: string
};


async function getSession(cookie: string): Promise<Session> {
  const response = await fetch(`${process.env.NEXTAUTH_SECRET}/session`, {
    headers: {
      cookie,
    }
  })

  const session = await response.json()

  return Object.keys(session).length > 0 ? session : null
}

export const metadata: Metadata = {
  title: 'AtYourShop',
  description: 'The #1 Ecommerce Web Page',
}

const RootLayout = ({children}: { children: React.ReactNode}): React.JSX.Element =>
   {
    return (
      
      <html lang="en">
        <body>
          <MantineProvider>
          <Provider>
            <main className='app'>
              <Nav />
              {children}

            </main>



          </Provider>
          </MantineProvider>
        </body>
      </html>
      
  )
}

export default RootLayout;
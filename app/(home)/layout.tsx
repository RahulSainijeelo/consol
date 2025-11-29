import React from 'react'
import { getServerSession } from 'next-auth';
import { SessionProvider } from "@/components/auth/SessionProvider"

const layout = async ({children}: {children: React.ReactNode}
) => {
    const session = await getServerSession();

    return (
        <html lang='en'>
          <body>
            <SessionProvider session={session}>
                {children}
            </SessionProvider>
          </body>
        </html>
    )
}

export default layout
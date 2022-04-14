import Head from 'next/head';
import { useEffect } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import Spinner from '../components/spinner';

interface LayoutProps {
  children: React.ReactNode;
  title: string;
}

export default function Layout({ children, title }: LayoutProps) {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'unauthenticated') {
      void signIn();
    }
  }, [status]);

  if (status === 'loading') {
    return <Spinner />;
  }

  return (
    <>
      <Head>
        <title>GraphQL POC</title>
        <meta name="description" content="GraphQL POC App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container px-4 py-6 mx-auto">
        <div className="h-16">
          <h1 className="float-left text-2xl font-bold mb-6">{title}</h1>
          <div className="float-right">
            <span className="mr-4 text-gray-600 text-sm">{session?.user.email}</span>
            <button
              type="button"
              onClick={() => void signOut()}
              className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 rounded-md text-sm px-3 py-1"
            >
              Logout
            </button>
          </div>
        </div>
        <main>{children}</main>
      </div>
    </>
  );
}

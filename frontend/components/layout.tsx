import Head from 'next/head';
import { cloneElement, useEffect } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import Spinner from '../components/spinner';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface LayoutProps {
  children: React.ReactElement;
  title: string;
}

export default function Layout({ children, title }: LayoutProps) {
  const { data: session, status } = useSession();
  const router = useRouter();

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

          {router.asPath !== '/create' && (
            <Link href="/create">
              <a className="ml-10 inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                Create Payment
              </a>
            </Link>
          )}

          <div className="float-right">
            <span className="mr-4 text-gray-600 text-sm">{session?.user?.email}</span>
            <button
              type="button"
              onClick={() => void signOut()}
              className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 rounded-md text-sm px-3 py-1"
            >
              Logout
            </button>
          </div>
        </div>
        <main>{cloneElement(children, { session })}</main>
      </div>
    </>
  );
}

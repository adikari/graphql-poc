import { useEffect } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import Spinner from '../components/spinner';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'unauthenticated') {
      void signIn();
    }
  }, [status]);

  if (status === 'loading') {
    return <Spinner />;
  }

  console.log(session);

  return (
    <>
      <main>{children}</main>
    </>
  );
}

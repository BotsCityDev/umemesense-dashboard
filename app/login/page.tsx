// app/login/page.tsx
import LoginForm from '@/components/auth/LoginForm';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function LoginPage() {
  const session = await getServerSession(authOptions);
  
  // If user is already logged in, redirect to dashboard
  if (session) {
    redirect('/dashboard');
  }

  return <LoginForm />;
}
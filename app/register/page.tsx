// app/register/page.tsx
import RegisterForm from '@/components/auth/RegisterForm';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function RegisterPage() {
  const session = await getServerSession(authOptions);
  
  // If user is already logged in, redirect to dashboard
  if (session) {
    redirect('/dashboard');
  }

  return <RegisterForm />;
}
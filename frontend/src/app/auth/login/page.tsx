'use client';

import React from 'react';
import { signIn } from 'next-auth/react';

import { LoginForm } from '@/components/login-form';

function LoginPage() {
  function onSubmit(
    values: Parameters<React.ComponentProps<typeof LoginForm>['onSubmit']>[0]
  ) {
    signIn('credentials', {
      username: values.username,
      password: values.password,
    });
  }

  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <LoginForm onSubmit={onSubmit} />
    </div>
  );
}

export default LoginPage;

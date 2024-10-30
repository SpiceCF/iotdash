'use client';

import React from 'react';
import Link from 'next/link';
import { useRegisterMutation } from '@/services/auth';

import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { RegisterForm } from '@/components/register-form';

function RegisterPage() {
  const registerMutation = useRegisterMutation({
    onSuccess: () => {
      toast({
        title: 'Register success',
        description: 'You can now login to your account',
      });
    },
  });

  function onSubmit(
    values: Parameters<React.ComponentProps<typeof RegisterForm>['onSubmit']>[0]
  ) {
    registerMutation.mutate({
      body: {
        fullName: values.fullName,
        email: values.email,
        username: values.username,
        password: values.password,
      },
    });
  }

  const isRegisterSuccess = registerMutation.isSuccess;

  if (isRegisterSuccess) {
    return <RegisterSuccess />;
  }

  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <RegisterForm onSubmit={onSubmit} />;
    </div>
  );
}

function RegisterSuccess() {
  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <Card>
        <CardHeader>
          <CardTitle>Register success</CardTitle>
          <CardDescription>
            You can now login to your account by clicking the button below
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link href="/auth/login">
            <Button>Login</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}

export default RegisterPage;

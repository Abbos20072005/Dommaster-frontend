'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { PasswordInput } from '@/components/ui/password-input';
import { Spinner } from '@/components/ui/spinner';

import { useSecurityForm } from './hooks';

export const SecurityForm = () => {
  const { form, state, functions } = useSecurityForm();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(functions.onSubmit)}>
        <FormField
          render={({ field }) => (
            <FormItem className='space-y-1'>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder='********' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          name='password'
          control={form.control}
        />
        <FormField
          render={({ field }) => (
            <FormItem className='space-y-1'>
              <FormLabel>Confirm password</FormLabel>
              <FormControl>
                <PasswordInput placeholder='********' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          name='passwordConfirm'
          control={form.control}
        />
        <Button disabled={state.isPending} type='submit'>
          {state.isPending && <Spinner />}
          Save
        </Button>
      </form>
    </Form>
  );
};

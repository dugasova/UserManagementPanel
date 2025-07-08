import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import './styles.scss';
import Input from '../Input/Input';

const scheme = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters long' })
})

export default function Form() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid, errors }
  } = useForm({
    defaultValues: {
      email: 'test@gmail.com',
      password: ''
    },
    mode: 'onBlur',
    resolver: zodResolver(scheme)
  })
  const onSubmit = () => {
    console.log('Form submitted')
    reset({
      email: '',
      password: ''
    });
    alert('Form submitted successfully!');
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-container">
      <Controller
        name="email"
        control={control}
        render={({ field }) => <Input {...field} type="email" placeholder="Email" />}
      />
      {errors.email && <span className="error">{errors.email.message}</span>}
      <Controller
        name="password"
        control={control}
        render={({ field }) => <Input {...field} type="password" placeholder="Password" />}
      />
      {errors.password && <span className="error">{errors.password.message}</span>}
      <button disabled={!isValid} type="submit">Submit</button>
    </form>
  )
}

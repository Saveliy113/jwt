import { FC, useEffect } from 'react'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { SignInSchema } from './dto/formSchema'
import { z } from "zod"

import { useSignIn} from '@/hooks/useAuth'

import { Button } from '../ui/button'
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "sonner"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { Loader2 } from 'lucide-react'

import { Input } from '../ui/input'

const SignInForm: FC = () => {
    const form = useForm<z.infer<typeof SignInSchema>>({
        resolver: zodResolver(SignInSchema),
        defaultValues: {
          email: '',
          password: '',
        },
    });

    useEffect(() => {
      form.reset({
        email: '',
        password: '',
      })
    }, [])

    const { mutate: signIn, isPending, isSuccess, isError} = useSignIn({
      onSuccess: () => {
        toast.success('Successfully authenticated')
      }
    });


    function onSubmitSignIn(data: z.infer<typeof SignInSchema>) {
        console.log('Sign In', data);
    }

    return (
        <div className="controls__sign-in">
            <Form {...form}>
                <form 
                    onSubmit={form.handleSubmit(onSubmitSignIn)}
                    className="w-full space-y-4"
                >
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className='text-xs font-light'>Email</FormLabel>
                          <FormControl>
                            <Input
                              className='w-full !border-cyan-300 py-7 px-5 !ring-cyan-100'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className='text-xs font-light'>Password</FormLabel>
                          <FormControl>
                            <Input
                              type='password'
                              className='w-full !border-cyan-300 py-7 px-5 !ring-cyan-100'
                              {...field} 
                             />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex items-center space-x-2">
                        <Checkbox id="remember" className='cursor-pointer' />
                        <label
                          htmlFor="remember"
                          className="cursor-pointer text-xs font-light leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Remember me
                        </label>
                    </div>
                    <Button
                      className='w-full mt-5 cursor-pointer flex-1 py-6'
                      variant="default"
                      type="submit"
                      disabled={isPending}
                    >
                     {isPending ? <Loader2 className='animate-spin w-5 h-5' /> : 'Let\'s Start'}
                    </Button>
                </form>
            </Form>
        </div>
    )
}

export default SignInForm;
"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useLogin } from "./core";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";

const LoginPage = () => {
  const { loginForm, submitLoginDetails } = useLogin();
  return (
    <div className="mt-20">
      <Form {...loginForm}>
        <form
          onSubmit={loginForm.handleSubmit(submitLoginDetails)}
          className="py-10 max-w-md mx-auto font-satoshi"
        >
          <Logo className="mx-auto mb-10"/>
          <FormField
            control={loginForm.control}
            name="email"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>Email</FormLabel>
                <FormControl className="">
                  <Input placeholder="ade@gmail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={loginForm.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="ade@gmail.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full mt-10" type="submit">
            Login
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default LoginPage;

"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRegister } from "../core/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";

const RegisterPage = () => {
  const { registerForm, submitRegistrationDetails } = useRegister();
  const { toast } = useToast();
  return (
    <div className="mt-8">
      <button onClick={() => {
        toast({
          title: "Yo!"
        })
      }}>A</button>
      <Form {...registerForm}>
        <form
          onSubmit={registerForm.handleSubmit(submitRegistrationDetails)}
          className="py-10 max-w-2xl mx-auto font-satoshi"
        >
          <Logo className="mx-auto mb-10" />
          <div className="flex gap-8">
            <FormField
              control={registerForm.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="mb-4 w-full">
                  <FormLabel>First Name *</FormLabel>
                  <FormControl className="">
                    <Input placeholder="John" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={registerForm.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="mb-4 w-full">
                  <FormLabel>Last Name *</FormLabel>
                  <FormControl className="">
                    <Input placeholder="Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex gap-8">
            <FormField
              control={registerForm.control}
              name="email"
              render={({ field }) => (
                <FormItem className="mb-4 w-full">
                  <FormLabel>Email*</FormLabel>
                  <FormControl className="">
                    <Input placeholder="johndoe@gmail.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={registerForm.control}
              name="phoneNo"
              render={({ field }) => (
                <FormItem className="mb-4 w-full">
                  <FormLabel>Phone Number *</FormLabel>
                  <FormControl className="">
                    <Input placeholder="+234810011002" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex gap-8">
            <FormField
              control={registerForm.control}
              name="password"
              render={({ field }) => (
                <FormItem className="mb-4 w-full">
                  <FormLabel>Password*</FormLabel>
                  <FormControl className="">
                    <Input placeholder="*****" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={registerForm.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="mb-4 w-full">
                  <FormLabel>Confirm Password *</FormLabel>
                  <FormControl className="">
                    <Input placeholder="****" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex gap-8">
            <FormField
              control={registerForm.control}
              name="address"
              render={({ field }) => (
                <FormItem className="mb-4 w-full">
                  <FormLabel>Address*</FormLabel>
                  <FormControl className="">
                    <Input placeholder="No 1, John Doe Street" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={registerForm.control}
              name="zip"
              render={({ field }) => (
                <FormItem className="mb-4 w-full">
                  <FormLabel>Zip Code *</FormLabel>
                  <FormControl className="">
                    <Input placeholder="011011" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button className="w-full mt-10" type="submit">
            Register
          </Button>
          <p className="text-center mt-5">
            Already have an account?{" "}
            <Link
              className="text-accent_one underline underline-offset-4"
              href={"/auth/login"}
            >
              Login.
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
};

export default RegisterPage;

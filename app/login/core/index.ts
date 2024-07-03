import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
const loginSchema = z.object({
  email: z.coerce.string().email({ message: "Invalid email provided" }),
  password: z
    .string()
    .min(6, { message: "Password should not be less than 6 characters" }),
});

export const useLogin = () => {
  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const submitLoginDetails = (values: z.infer<typeof loginSchema>) => {
    console.log(values);
  };

  return { loginForm, submitLoginDetails };
};

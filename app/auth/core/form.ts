import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { loginAccount, registerAccount, sendOTP, verifyOTP } from "./actions";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { SendOTPRequest } from "@/types/otp.types";
import { useState } from "react";
import { decodeUserToken } from "@/lib/utils";
import { useAuthStore } from "@/store/auth-store";

const loginSchema = z.object({
  email: z.coerce.string().email({ message: "Invalid email provided" }),
  password: z
    .string()
    .min(6, { message: "Password should not be less than 6 characters" }),
});

export const useLogin = () => {
  const { toast } = useToast();
  const router = useRouter();
  const { setToken, setUser } = useAuthStore();
  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const submitLoginDetails = async (values: z.infer<typeof loginSchema>) => {
    const { error, response } = await loginAccount(values);
    if (error) {
      toast({
        title: error?.error,
        variant: "destructive",

      });
    }
    if (response?.isSuccess) {
      toast({
        title: "Login successful",
        variant: "default",
      });
      const user = decodeUserToken(response.token);
      setToken(response.token);
      if (user){
        setUser({user});
      }
      router.push("/");
    }
  };

  return { loginForm, submitLoginDetails };
};

const setPasswordSchema = z
  .object({
    password: z.string().min(6, {
      message: "The password should be a minimum of six characters",
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const useSetPassword = () => {
  const setPasswordForm = useForm<z.infer<typeof setPasswordSchema>>({
    resolver: zodResolver(setPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const setPasswordForAccount = (values: z.infer<typeof setPasswordSchema>) => {
    console.log({ values });
  };

  return { setPasswordForm, setPasswordForAccount };
};

export const registerSchema = z
  .object({
    firstName: z
      .string({
        required_error: "First name is required",
      })
      .max(30, { message: "First name should be a maximum of 30 characters." }),
    lastName: z
      .string({
        required_error: "Last name is required",
      })
      .max(30, { message: "Last name should be a maximum of 30 characters." }),
    email: z.string({ required_error: "Email is required" }).email({
      message: "Email input is not a valid email. Please correct and try again",
    }),
    phoneNo: z.string({ required_error: "Phone number is required" }).max(50),
    password: z.string().min(6, {
      message: "The password should be a minimum of six characters",
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const useRegister = () => {
  const { toast } = useToast();
  const router = useRouter();
  
  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      confirmPassword: "",
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      phoneNo: "",
    },
  });
  const submitRegistrationDetails = async (
    values: z.infer<typeof registerSchema>
  ) => {
    const { confirmPassword, ...formData } = values;
    const { error, response } = await registerAccount(formData);
    if (error) {
      toast({
        title: error?.error,
        variant: "destructive",
      });
    }
    if (response?.isSuccess) {
      sessionStorage.setItem("email-for-otp", values.email);
      router.push("/auth/verify-otp");
    }
  };

  return { registerForm, submitRegistrationDetails };
};

export const useSendAndVerifyOTP = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [verifyOTPIsLoading, setVerifyOTPIsLoading] = useState(false);
  let otp: number;
  let otpError: any;
  const getOTPRequest = async (values: SendOTPRequest) => {
    const { error, response } = await sendOTP(values);
    if (error) {
      toast({
        title: error?.error,
        variant: "destructive",
      });
    }
    if (response?.isSuccess) {
      otp = response.otpDetails.otp;
      toast({
        title: "OTP sent to your email",
        variant: "default",
      });
    }
  };

  const verifyOTPRequest = async (otp: number) => {
    setVerifyOTPIsLoading(true);
    const { error, response } = await verifyOTP({
      otp,
      email: sessionStorage.getItem("email-for-otp") as string,
    });
    if (error) {
      otpError = error;
      toast({
        title: error?.error,
        variant: "destructive",
      });
    }
    if (response?.isSuccess) {
      toast({
        title: "OTP verified successfully",
        variant: "default",
      });
      router.push("/auth/login");
    }
    setVerifyOTPIsLoading(false);
  };

  return { getOTPRequest, verifyOTPRequest, otpError, verifyOTPIsLoading };
};

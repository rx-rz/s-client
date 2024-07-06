export type SendOTPRequest = {
  email: string;
  role: "customer" | "admin";
  isForSettingPassword: boolean;
};

export type SendOTPResponse = {
  otpDetails: {
    otp: number;
    email: string;
    role: "admin" | "customer" | null;
    expiresAt: number;
  };
  isSuccess: boolean;
};

export type VerifyOTPRequest = {
  otp: number;
  email: string;
};

export type VerifyOTPResponse = {
  message: string;
  isSuccess: boolean;
};

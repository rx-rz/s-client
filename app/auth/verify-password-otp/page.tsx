"use client";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPSlot } from "@/components/ui/input-otp";
import { useState } from "react";

const VerifyPasswordOTPPage = () => {
  const [otpVal, setOtpVal] = useState("");
  const [otpError, setOtpError] = useState("");
  
  return (
    <div className="w-full mt-16 flex flex-col items-center  justify-center">
      <p className="mb-8">Please enter the OTP provided to you</p>
      <div className=" flex flex-col gap-8 w-[95%] max-w-[450px]">
        <InputOTP
          maxLength={6}
          className=""
          value={otpVal}
          onChange={(val) => setOtpVal(val)}
        >
          <InputOTPSlot
            index={0}
            className={`flex-1 h-16 mr-3  bg-grey rounded-md text-black font-bold text-xl ${
              otpError ? "border-red-500" : "border"
            }`}
          />
          <InputOTPSlot
            index={1}
            className={`flex-1 h-16 mr-3  bg-grey rounded-md text-black font-bold text-xl ${
              otpError ? "border-red-500" : "border"
            }`}
          />
          <InputOTPSlot
            index={2}
            className={`flex-1 h-16 mr-3  bg-grey rounded-md text-black font-bold text-xl ${
              otpError ? "border-red-500" : "border"
            }`}
          />
          <InputOTPSlot
            index={3}
            className={`flex-1 h-16 mr-3  bg-grey rounded-md text-black font-bold text-xl ${
              otpError ? "border-red-500" : "border"
            }`}
          />
          <InputOTPSlot
            index={4}
            className={`flex-1 h-16 mr-3  bg-grey rounded-md text-black font-bold text-xl ${
              otpError ? "border-red-500" : "border"
            }`}
          />
          <InputOTPSlot
            index={5}
            className={`flex-1 h-16 mr-3  bg-grey rounded-md text-black font-bold text-xl ${
              otpError ? "border-red-500" : "border"
            }`}
          />
        </InputOTP>

        <Button>Continue</Button>
      </div>
    </div>
  );
};

export default VerifyPasswordOTPPage;

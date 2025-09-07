"use client";

import Image from "next/image";
import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";

import { icons } from "@/constants";
import Link from "next/link";

const SignInPage = () => {
  return (
    <div className="h-screen flex items-center justify-between p-8">
      <div className="hidden lg:flex w-1/2 items-center justify-center">
        <div className="relative w-[350px] h-[350px]">
          <Image
            src="/general/flowly.png"
            alt="flowly"
            fill
            priority
            className="object-contain"
          />
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-baseline gap-4">
        <div className="flex w-72 justify-start mb-5 lg:hidden">
          <div className="relative w-[100px] h-[100px]">
            <Image
              src="/general/flowly.png"
              alt="flowly"
              fill
              priority
              className="object-contain"
            />
          </div>
        </div>

        <h1 className="text-4xl md:text-4xl lg:text-6xl font-bold w-xs lg:w-lg bg-blue-500 rounded-br-full rounded-tl-full px-4 py-0.5 mb-6 lg:text-center">
          Voices Flow Here
        </h1>
        <div className="flex w-72 justify-start">
          <h1 className="text-2xl mb-2">Join the vibe today.</h1>
        </div>

        <SignIn.Root>
          <Clerk.Connection
            name="google"
            className="bg-white rounded-full p-2 text-black w-72 flex items-center justify-center gap-2 font-bold cursor-pointer"
          >
            <icons.Google className="w-6 h-6" />
            Sign in with Google
          </Clerk.Connection>

          <Clerk.Connection
            name="apple"
            className="bg-white rounded-full p-2 text-black w-72 flex items-center justify-center gap-2 font-bold cursor-pointer mb-4"
          >
            <icons.Apple className="w-6 h-6" />
            Sign in with Apple
          </Clerk.Connection>

          {/* CREDENTIALS LOGIN */}
          <SignIn.Step name="start">
            <Clerk.Field name="identifier" className="flex flex-col gap-2">
              <Clerk.Input
                placeholder="Enter your email"
                className="py-2 px-6 rounded-full text-black w-72 bg-white placeholder:text-sm"
              />
              <Clerk.FieldError className="text-red-300 text-sm" />
            </Clerk.Field>
            <SignIn.Action
              submit
              className="mt-4 text-sm underline w-72 text-center text-iconBlue cursor-pointer"
            >
              Continue
            </SignIn.Action>
          </SignIn.Step>

          <SignIn.Step name="verifications">
            <SignIn.Strategy name="password">
              <Clerk.Field name="password" className="flex flex-col gap-2">
                <Clerk.Input
                  placeholder="Enter your password"
                  className="py-2 px-6 rounded-full text-black w-72 bg-white placeholder:text-sm"
                />
                <Clerk.FieldError className="text-red-300 text-sm" />
              </Clerk.Field>
              <div className="flex flex-col gap-2">
                <SignIn.Action
                  submit
                  className="mt-4 text-sm underline w-72 text-center text-iconBlue cursor-pointer"
                >
                  Continue
                </SignIn.Action>

                <SignIn.Action
                  navigate="forgot-password"
                  className="text-sm underline w-72 text-center cursor-pointer"
                >
                  Forgot password?
                </SignIn.Action>
              </div>
            </SignIn.Strategy>

            <SignIn.Strategy name="reset_password_email_code">
              <p className="text-sm mb-2">
                We sent a code to{" "}
                <span className="text-iconBlue">
                  <SignIn.SafeIdentifier />
                </span>
              </p>

              <Clerk.Field name="code" className="flex flex-col gap-2">
                <Clerk.Input
                  placeholder="Enter verification code"
                  className="py-2 px-6 rounded-full text-black w-72 bg-white placeholder:text-sm"
                />
                <Clerk.FieldError className="text-red-300 text-sm" />
              </Clerk.Field>

              <SignIn.Action
                submit
                className="mt-4 text-sm underline w-72 text-center text-iconBlue cursor-pointer"
              >
                Continue
              </SignIn.Action>
            </SignIn.Strategy>
          </SignIn.Step>

          <SignIn.Step
            name="forgot-password"
            className="flex justify-center w-72 text-sm gap-4"
          >
            <SignIn.SupportedStrategy name="reset_password_email_code">
              <span className="underline text-iconBlue cursor-pointer">
                Reset password
              </span>
            </SignIn.SupportedStrategy>

            <SignIn.Action
              navigate="previous"
              className="underline cursor-pointer"
            >
              Go back
            </SignIn.Action>
          </SignIn.Step>

          <SignIn.Step
            name="reset-password"
            className="flex flex-col justify-center w-72 gap-2"
          >
            <Clerk.Field name="password">
              <Clerk.Input
                placeholder="Enter new password"
                className="py-2 px-6 rounded-full text-black w-72 bg-white placeholder:text-sm"
              />
              <Clerk.FieldError />
            </Clerk.Field>

            <Clerk.Field name="confirmPassword">
              <Clerk.Input
                placeholder="Confirm password"
                className="py-2 px-6 rounded-full text-black w-72 bg-white placeholder:text-sm"
              />
              <Clerk.FieldError />
            </Clerk.Field>

            <SignIn.Action submit className="underline cursor-pointer">
              Reset password
            </SignIn.Action>
          </SignIn.Step>

          {/* OR SIGN UP */}
          <div className="w-72 flex items-center gap-4">
            <div className="h-px bg-borderGray flex-grow"></div>
            <span className="text-textGrayLight">or</span>
            <div className="h-px bg-borderGray flex-grow"></div>
          </div>
          <Link
            href="/sign-up"
            className="bg-iconBlue rounded-full p-2 text-white font-bold w-72 text-center"
          >
            Create account
          </Link>
          <p className="w-72 text-xs">
            By signing up, you agree to the{" "}
            <span className="text-iconBlue cursor-pointer hover:underline">
              Terms of Service
            </span>{" "}
            and{" "}
            <span className="text-iconBlue cursor-pointer hover:underline">
              Privacy Policy
            </span>
            , including{" "}
            <span className="text-iconBlue cursor-pointer hover:underline">
              Cookie Use
            </span>
            .
          </p>
        </SignIn.Root>
      </div>
    </div>
  );
};

export default SignInPage;

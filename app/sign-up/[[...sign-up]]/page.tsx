"use client";

import Image from "next/image";
import * as Clerk from "@clerk/elements/common";
import * as SignUp from "@clerk/elements/sign-up";

import { icons } from "@/constants";
import Link from "next/link";

const SignUpPage = () => {
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
        <div className="flex w-72 justify-start my-2 lg:hidden">
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

        <h1 className="text-4xl md:text-4xl lg:text-6xl font-bold w-xs lg:w-lg bg-blue-500 rounded-br-full rounded-tl-full px-4 py-0.5 mb-2 lg:text-center">
          Voices Flow Here
        </h1>
        <div className="flex w-72 justify-start">
          <h1 className="text-2xl mb-2">Join the vibe today.</h1>
        </div>

        <SignUp.Root>
          <SignUp.Step name="start" className="flex flex-col gap-4">
            <Clerk.Connection
              name="google"
              className="bg-white rounded-full p-2 text-black w-72 flex items-center justify-center gap-2 font-bold cursor-pointer"
            >
              <icons.Google className="w-6 h-6" />
              Sign up with Google
            </Clerk.Connection>

            <Clerk.Connection
              name="apple"
              className="bg-white rounded-full p-2 text-black w-72 flex items-center justify-center gap-2 font-bold cursor-pointer mb-4"
            >
              <icons.Apple className="w-6 h-6" />
              Sign up with Apple
            </Clerk.Connection>

            <div className="flex flex-col gap-4">
              Sign up with Credentials
              <Clerk.Field name="username" className="flex flex-col gap-2">
                <Clerk.Input
                  placeholder="Enter username"
                  className="py-2 px-6 rounded-full text-black w-72 bg-white placeholder:text-sm"
                />
                <Clerk.FieldError className="text-red-300 text-sm" />
              </Clerk.Field>
              <Clerk.Field name="emailAddress" className="flex flex-col gap-2">
                <Clerk.Input
                  placeholder="Enter email address"
                  className="py-2 px-6 rounded-full text-black w-72 bg-white placeholder:text-sm"
                />
                <Clerk.FieldError className="text-red-300 text-sm" />
              </Clerk.Field>
              <Clerk.Field name="password" className="flex flex-col gap-2">
                <Clerk.Input
                  placeholder="Enter password"
                  className="py-2 px-6 rounded-full text-black w-72 bg-white placeholder:text-sm"
                />
                <Clerk.FieldError className="text-red-300 text-sm" />
              </Clerk.Field>
              <SignUp.Captcha />
              <SignUp.Action
                submit
                className="bg-iconBlue rounded-full p-2 text-white font-bold w-72 text-center"
              >
                Sign up
              </SignUp.Action>
            </div>
          </SignUp.Step>

          <SignUp.Step name="continue" className="flex flex-col gap-4 mt-4">
            <Clerk.Field name="username">
              <Clerk.Input
                placeholder="Enter username"
                className="py-2 px-6 rounded-full text-black w-72 bg-white placeholder:text-sm"
              />
              <Clerk.FieldError className="text-red-300 text-sm" />
            </Clerk.Field>

            <SignUp.Action
              submit
              className="my-2 underline w-72 text-center text-iconBlue text-sm cursor-pointer"
            >
              Continue
            </SignUp.Action>
          </SignUp.Step>

          <SignUp.Step name="verifications">
            <SignUp.Strategy name="email_code">
              <h1 className="text-sm mb-4">
                Verification code was sent to your email
              </h1>

              <Clerk.Field name="code" className="flex flex-col gap-4">
                <Clerk.Input
                  placeholder="Enter verification code"
                  className="py-2 px-6 rounded-full text-black w-72 bg-white placeholder:text-sm"
                />
                <Clerk.FieldError className="text-red-300 text-sm" />
              </Clerk.Field>

              <div className="flex justify-center w-72 mt-2">
                <SignUp.Action
                  submit
                  className="mt-2 underline text-iconBlue text-sm"
                >
                  Verify account
                </SignUp.Action>
              </div>
            </SignUp.Strategy>
          </SignUp.Step>

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

          <div className="flex w-72 flex-col gap-4 -mt-4">
            <span className="text-textGrayLight font-bold mt-4">
              Already have an account?
            </span>

            <Link
              href="/sign-in"
              className="bg-iconBlue rounded-full p-2 text-white font-bold w-72 text-center"
            >
              Sign in
            </Link>
          </div>
        </SignUp.Root>
      </div>
    </div>
  );
};

export default SignUpPage;

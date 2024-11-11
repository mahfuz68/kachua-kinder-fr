"use client";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import Link from "next/link";

export default function ShadowInputs() {
  return (
    <div className="min-h-screen bg-slate-200">
      <div className="flex justify-center items-center pt-6">
        <form className="flex lg:w-1/4 min-w-lg flex-col gap-4">
          <div className="text-4xl font-bold mt-4 text-center text-indigo-600">
            একাউন্ট <span className="text-black">রেজিস্টার</span>
          </div>
          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="name2"
                className="text-[15px]"
                value="আপনার নাম"
              />
            </div>
            <TextInput
              id="name2"
              placeholder="name@flowbite.com"
              required
              value={"fdsfd"}
              shadow
              type="text"
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="email2"
                className="text-[15px]"
                value="আপনার ইমেইল"
              />
            </div>
            <TextInput
              id="email2"
              placeholder="name@flowbite.com"
              required
              value={"fdsfd"}
              shadow
              type="email"
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label
                className="text-[15px]"
                htmlFor="password2"
                value="আপনার পাসওয়ার্ড"
              />
            </div>
            <TextInput id="password2" required shadow type="password" />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="repeat-password" value="পুনরায় পাসওয়ার্ড লিখুন" />
            </div>
            <TextInput id="repeat-password" required shadow type="password" />
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="agree" />
            <Label className="flex gap-4" htmlFor="agree">
              <p>আমি শর্তে রাজী</p>
              <Link
                className="text-indigo-600 hover:underline dark:text-indigo-500 "
                href="/forms"
              >
                <p>শর্তাবলী</p>
              </Link>
              <Link
                className="text-indigo-600 hover:underline dark:text-indigo-500 "
                href="/login"
              >
                <p>অলরেডি একাউন্ট আছে</p>
              </Link>
            </Label>
          </div>
          <Button
            className="bg-indigo-600 enabled:hover:bg-indigo-700 focus:ring-indigo-300"
            type="submit"
          >
            নতুন একাউন্ট রেজিস্টার করুন
          </Button>
        </form>
      </div>
    </div>
  );
}

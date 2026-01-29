import Link from "next/link";

import { APP_NAME, COMPANY_NAME } from "@calcom/lib/constants";
import { Button } from "@calcom/ui/components/button";

export default function LandingPage() {
  return (
    <div className="bg-default flex min-h-screen flex-col">
      <main className="flex grow flex-col items-center justify-center px-4 text-center sm:px-6 lg:px-8">
        <h1 className="text-emphasis text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
          {APP_NAME}
        </h1>
        <p className="text-default mx-auto mt-6 max-w-md text-xl sm:text-2xl md:mt-10 md:max-w-3xl">
          The open source scheduling infrastructure for everyone.
        </p>
        <div className="mt-10 max-w-sm sm:mx-auto sm:flex sm:max-w-none sm:justify-center">
          <Link href="/auth/login" passHref>
            <Button size="lg" className="w-full sm:w-auto">
              Login to {APP_NAME}
            </Button>
          </Link>
        </div>
      </main>

      <footer className="border-subtle border-t py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-default text-center text-sm">
            &copy; {new Date().getFullYear()} {COMPANY_NAME}. All rights
            reserved.
          </p>
          <div className="mt-4 flex justify-center space-x-6">
            <Link
              href="/privacy"
              className="text-subtle hover:text-default text-sm"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-subtle hover:text-default text-sm"
            >
              Terms & Conditions
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

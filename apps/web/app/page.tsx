import { Metadata } from "next";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

import { checkOnboardingRedirect } from "@calcom/features/auth/lib/onboardingUtils";
import { getServerSession } from "@calcom/features/auth/lib/getServerSession";
import { APP_NAME } from "@calcom/lib/constants";

import { buildLegacyRequest } from "@lib/buildLegacyCtx";

import LandingPage from "../components/LandingPage";

export const metadata: Metadata = {
  title: APP_NAME,
  description: `Welcome to ${APP_NAME}`,
};

const RedirectPage = async () => {
  const session = await getServerSession({
    req: buildLegacyRequest(await headers(), await cookies()),
  });

  if (!session?.user?.id) {
    return <LandingPage />;
  }

  // Check if user needs onboarding and redirect before going to event-types
  const organizationId = session.user.profile?.organizationId ?? null;
  const onboardingPath = await checkOnboardingRedirect(session.user.id, {
    checkEmailVerification: true,
    organizationId,
  });
  if (onboardingPath) {
    redirect(onboardingPath);
  }

  redirect("/event-types");
};

export default RedirectPage;

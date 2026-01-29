import { z } from "zod";

import { validJson } from "@calcom/lib/jsonUtils";

import getParsedAppKeysFromSlug from "../../_utils/getParsedAppKeysFromSlug";

const googleAppKeysSchema = z.object({
  client_id: z.string(),
  client_secret: z.string(),
  redirect_uris: z.array(z.string()),
});

export const getGoogleAppKeys = async () => {
  try {
    return await getParsedAppKeysFromSlug("google-calendar", googleAppKeysSchema);
  } catch (error) {
    const rawGoogleCredentials = process.env.GOOGLE_API_CREDENTIALS;
    if (rawGoogleCredentials) {
      const credentials = validJson(rawGoogleCredentials);
      if (credentials && credentials.web) {
        return googleAppKeysSchema.parse(credentials.web);
      }
    }
    throw error;
  }
};

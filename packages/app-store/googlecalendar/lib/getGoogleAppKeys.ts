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
      let credentialsString = rawGoogleCredentials;
      try {
        // Try decoding base64 if it looks like it
        // A simple check is difficult, so we check if standard JSON parse fails?
        // But validJson handles parse.
        // Let's assume if it is not starting with '{', it's base64
        if (!rawGoogleCredentials.trim().startsWith("{")) {
          credentialsString = Buffer.from(rawGoogleCredentials.trim(), "base64").toString("utf-8");
        }
      } catch (e) {
        // ignore decoding errors
      }

      const credentials = validJson(credentialsString);
      if (credentials && credentials.web) {
        return googleAppKeysSchema.parse(credentials.web);
      }
    }
    throw error;
  }
};

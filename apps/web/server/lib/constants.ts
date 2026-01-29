const rawGoogleCredentials = process.env.GOOGLE_API_CREDENTIALS || "{}";

export const GOOGLE_API_CREDENTIALS =
  (() => {
    try {
      const maybeDecoded = Buffer.from(
        rawGoogleCredentials.trim(),
        "base64"
      ).toString("utf-8");
      // Validate it's JSON but return the string for the next step to parse if needed,
      // OR better: Just return the string if it looks like JSON.
      // The original code was: return JSON.parse(maybeDecoded), maybeDecoded;
      // This returned maybeDecoded (string).
      // But line 18 does JSON.parse(GOOGLE_API_CREDENTIALS).
      // So returning the string is CORRECT for the logic at line 18.
      // wait. JSON.parse(maybeDecoded) throws if invalid.
      // So this serves as a validation step.
      JSON.parse(maybeDecoded);
      return maybeDecoded;
    } catch {
      return rawGoogleCredentials;
    }
  })() || "{}";
export const {
  client_id: GOOGLE_CLIENT_ID,
  client_secret: GOOGLE_CLIENT_SECRET,
} = JSON.parse(GOOGLE_API_CREDENTIALS)?.web || {};
export const GOOGLE_LOGIN_ENABLED = process.env.GOOGLE_LOGIN_ENABLED === "true";
export const IS_GOOGLE_LOGIN_ENABLED = !!(
  GOOGLE_CLIENT_ID &&
  GOOGLE_CLIENT_SECRET &&
  GOOGLE_LOGIN_ENABLED
);
export const IS_SAML_LOGIN_ENABLED = !!(
  process.env.SAML_DATABASE_URL && process.env.SAML_ADMINS
);

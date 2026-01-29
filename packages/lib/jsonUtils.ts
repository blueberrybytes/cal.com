export const validJson = (jsonString: string) => {
  try {
    const o = JSON.parse(jsonString);
    if (o && typeof o === "object") {
      return o;
    }
  } catch (e) {
    console.log(`Invalid JSON: ${jsonString}`, e);
  }
  return false;
};

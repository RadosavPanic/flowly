export const authenticateUser = async () => {
  try {
    const response = await fetch("/api/upload-auth");

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`imageKit authError: ${errorText}`);
    }

    const data = await response.json();
    const { signature, expire, token, publicKey } = data;

    return { signature, expire, token, publicKey };
  } catch (error) {
    console.error("Authentication error:", error);
    throw new Error("Authentication request failed");
  }
};

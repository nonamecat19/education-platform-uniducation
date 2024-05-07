"use client"
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
export default function LoginPage() {
  const login = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      console.log("codeResponse", codeResponse);

      const tokenResponse = await axios.get(
        `http://localhost:3006/auth/google/callback?code=${codeResponse.code}`
      );

      console.log("tokenResponse", tokenResponse);
    },
    flow: "auth-code",
  });

  return (
    <>
      <button onClick={login}>Login with google</button>
      <button onClick={googleLogout}>Logout</button>
    </>
  );
}

import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import {
  SessionContextProvider,
  Session,
  useSession,
  useUser,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FeedBack } from "../components/FeedBack";
// import { SetOnline } from "../scripts/userdata";
import "../styles/globals.css";
import "../styles/twemoji.css";
const { DateTime } = require("luxon");
function MyApp({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session;
}>) {
  const allowurl = ["/", "/common/auth"];
  const router = useRouter();
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());
  useEffect(() => {
    const intervalId = setInterval(async () => {
      const { error } = await supabaseClient.functions.invoke("setonline", {});
      if (error) console.error(error);
    }, 20000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  if (typeof location !== "undefined") {
    console.log(`[_app.tsx] href: ${location.pathname}`);
    const user = supabaseClient.auth.getUser();
    console.log(`[_app.tsx] user: ${user}`)
    if (!allowurl.includes(location.pathname) && !user)
      router.replace(`/common/auth?next=${location.pathname}`);
  }
  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <Component {...pageProps} />
      <FeedBack />
    </SessionContextProvider>
  );
}
export default MyApp;

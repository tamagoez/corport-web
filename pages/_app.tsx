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
import { setOnline } from "../scripts/edge";
// import { SetOnline } from "../scripts/userdata";
import "../styles/globals.css";
import "../styles/twemoji.css";
function MyApp({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session;
}>) {
  const allowurl = ["/", "/c/auth", "/c/passwordrecovery"];
  const router = useRouter();
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());

  useEffect(() => {
    checkvalid();
    const intervalId = setInterval(async () => {
      setOnline();
    }, 20000);
    return () => {
      clearInterval(intervalId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    supabaseClient.auth.onAuthStateChange(async (event, session) => {
      console.log(`[onAuthStateChange] event: ${event}`);
      if (event == "PASSWORD_RECOVERY") {
        const newPassword = prompt("新しいパスワードを入力してください");
        const { data, error } = await supabaseClient.auth.updateUser({
          password: newPassword!,
        });

        if (data) alert("パスワードがアップデートされました");
        if (error) alert("アップデート中にエラーが発生しました");
      }
    });
  }, []);

  async function checkvalid() {
    const {
      data: { user },
    } = await supabaseClient.auth.getUser();
    console.log(`[_app.tsx] href: ${location.pathname}`);
    console.log(`[_app.tsx] user: ${user}`);
    if (!allowurl.includes(location.pathname) && !user)
      router.replace(`/c/auth?next=${location.pathname}`);
  }

  if (typeof document !== "undefined")
    document.body.addEventListener(
      "click",
      () => {
        prepareSound();
      },
      { once: true }
    );
  function prepareSound() {
    const notifysound = document.getElementById(
      "notifysound"
    ) as HTMLAudioElement;
    notifysound.play();
    notifysound.pause();
  }
  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <Component {...pageProps} />
      <audio id="notifysound" preload="auto">
        <source src="/sound/xylophone.mp3" type="audio/mp3" />
      </audio>
      <FeedBack />
    </SessionContextProvider>
  );
}
export default MyApp;

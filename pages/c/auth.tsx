import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { getProfileSet } from "../../scripts/c/auth";
import { BarLoader } from "react-spinners";
import { getSettings } from "../../scripts/user";

export default function AuthPage() {
  const session = useSession();
  const supabase = useSupabaseClient();
  const router = useRouter();
  const query = router.query;

  useEffect(() => {
    if (session) {
      setsettings();
      checksettings();
    }
  }, [session]);

  async function setsettings() {
    getSettings();
  }

  async function checksettings() {
    const alset = await getProfileSet();
    console.log(`[checksettings] alset: ${alset}`);
    if (alset === true) {
      if (query.next) router.replace(`${query.next}`);
      else router.replace("/c/dashboard");
    } else {
      window.localStorage.setItem("noprofile", "true");
      if (query.next) router.replace(`/c/profile?next=${query.next}`);
      else router.replace(`/c/profile`);
    }
  }

  async function loginproc() {
    try {
      const email = (document.getElementById('emailinput') as HTMLInputElement).value
      const password = (document.getElementById('passwordinput') as HTMLInputElement).value
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      })
      if (error) throw error;
      console.log("[Auth] Success!")
      console.dir(data)
    } catch (error: any) {
      console.error(error)
      alert(error.message)
    }
  }

  async function signInWithTwitter() {
    try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'twitter',
    })
    if (error) throw error;
      console.log("[Auth] Success!")
      console.dir(data)
    } catch (error: any) {
      console.error(error)
      alert(error.message)
    }
  }

  return (
    <>
      {!session ? (
        <div><label htmlFor="emailinput">メールアドレス</label><input type="email" id="emailinput" autoComplete="email" /><label htmlFor="passwordinput">パスワード</label><input type="password" id="passwordinput" autoComplete="current-password" /><button onClick={() => loginproc()}>ログイン</button><button onClick={() => signInWithTwitter()}>Twitterで認証</button></div>
      ) : (
        <>
          <BarLoader
            color="#36d7b7"
            height={5}
            speedMultiplier={1}
            width={window.innerWidth}
          />
        </>
      )}
    </>
  );
}

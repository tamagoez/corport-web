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

  return (
    <>
      {!session ? (
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          theme="default"
          localization={{
            variables: {
              sign_up: {
                email_label: "メールアドレス",
                password_label: "パスワードを作成",
                email_input_placeholder: "XXXXXXX@YYYYYY.ZZZ",
                password_input_placeholder: "XXXXXXXXXXXXX",
                button_label: "新規登録",
                social_provider_text: "に登録する",
                link_text: "アカウントをお持ちではありませんか？ 新規登録する",
              },
              sign_in: {
                email_label: "メールアドレス",
                password_label: "あなたのパスワード",
                email_input_placeholder: "XXXXXXX@YYYYYY.ZZZ",
                password_input_placeholder: "XXXXXXXXXXXXX",
                button_label: "サインイン",
                social_provider_text: "に登録する",
                link_text: "アカウントをお持ちですか? ログインする",
              },
              magic_link: {
                email_input_label: "Email address",
                email_input_placeholder: "Your email address",
                button_label: "Send Magic Link",
                link_text: "Send a magic link email",
              },
              forgotten_password: {
                email_label: "Email address",
                password_label: "Your Password",
                email_input_placeholder: "Your email address",
                button_label: "Send reset password instructions",
                link_text: "パスワードをお忘れの方",
              },
              update_password: {
                password_label: "New password",
                password_input_placeholder: "Your new password",
                button_label: "Update password",
              },
            },
          }}
        />
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

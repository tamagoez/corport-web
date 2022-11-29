import { useEffect } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
const supabase = createBrowserSupabaseClient();

export default function PRecovery() {
  const supabase = useSupabaseClient();
  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (event == "PASSWORD_RECOVERY") {
        const newPassword = prompt("新しいパスワードを入力してください");
        const { data, error } = await supabase.auth.updateUser({
          password: newPassword!,
        });

        if (data) alert("パスワードがアップデートされました");
        if (error) alert("アップデート中にエラーが発生しました");
      }
    });
  }, []);
  return (
    <>
      <h1>Password Recovery</h1>
      <p>
        パスワードリカバリーをする際は、まず下のボタンを押し、メールを確認してください。
        <br />
        届いたメールのURLを開き、&quot;パスワードを再設定&quot;を押してパスワードを再設定して下さい
      </p>
      <button onClick={() => sendrecovery()}>パスワードリカバリーする</button>
      <div>
        <label htmlFor="newpassword">新規パスワード</label>
        <input id="newpassword" type="password"></input>
      </div>
      <div>
        <label htmlFor="checkpassword">パスワードの確認</label>
        <input id="checkpassword" type="password"></input>
      </div>
      <div>
        <button onClick={() => updatePassword()}>パスワードを更新</button>
      </div>
    </>
  );
}

async function sendrecovery() {
  const email = prompt("メールアドレスを入力してください");
  const redirecturl = `${location.hostname}/c/password`;
  console.log(`[passwordrecovery] ${email}: ${redirecturl}`);
  try {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email!, {
      redirectTo: redirecturl,
    });
    if (error) throw error;
    console.log(data);
  } catch (error: any) {
    console.error(error);
    alert(error.message);
  }
}

async function updatePassword() {
  const newpassword = (
    document.getElementById("newpassword") as HTMLInputElement
  ).value;
  const checkpassword = (
    document.getElementById("checkpassword") as HTMLInputElement
  ).value;
  if (newpassword !== checkpassword) {
    alert("確認欄のパスワードが正しくありません");
    return;
  }
  try {
    const { data, error } = await supabase.auth.updateUser({
      password: newpassword,
    });
    if (error) throw error;
    console.log(data);
    alert("パスワードがアップデートされました");
  } catch (error: any) {
    console.error(error);
    alert(error.message);
  }
}

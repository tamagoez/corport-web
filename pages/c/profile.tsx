import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { getProfile, setProfile } from "../../scripts/user";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Profile() {
  const supabase = useSupabaseClient();
  const router = useRouter();
  const user = useUser();
  const userid = user?.id;
  let noprofile = "false";
  if (typeof window !== "undefined")
    noprofile = window.localStorage.getItem("noprofile")!;
  const [canmove, setCanmove] = useState(noprofile !== "true");
  const [username, setUsername] = useState("");
  const [handleid, setHandleid] = useState("");
  const [birthday, setBirthday] = useState("");
  const [editedeb, setEditedb] = useState(false);

  useEffect(() => {
    if (userid)
      getProfile(userid, "username, displayhandleid, birthday").then((res) => {
        console.log(res);
        renderprofile(res);
      });
  }, [userid]);
  function renderprofile(data: any) {
    setUsername(data.username);
    setHandleid(data.displayhandleid);
    setBirthday(data.birthday);
    if (username && handleid) setCanmove(true);
    setEditedb(true);
  }

  function checkmove() {
    if (username && handleid) setCanmove(true);
    else setCanmove(false);
  }

  function saveprofile() {
    if (!handleid) return;
    const styledhandleid = handleid.toString().toLowerCase();
    if (userid)
      setProfile(userid, {
        userid: userid,
        username: username,
        displayhandleid: handleid,
        handleid: styledhandleid,
        birthday: birthday,
      }).then((res) => {
        if (res) {
          window.localStorage.removeItem("noprofile");
          router.replace("/c/dashboard");
        }
      });
  }

  return (
    <>
      <h1>Profile</h1>
      {noprofile === "true" ? (
        <p>
          使用する前に初期設定をお願いします。
          <br />
          <b>ユーザー名</b>、<b>ハンドルID</b>の設定は必須です。
        </p>
      ) : (
        <p></p>
      )}
      <a
        onClick={() => {
          const obj = document.getElementById("desprofile")!.style;
          obj.display = obj.display == "none" ? "block" : "none";
        }}
        style={{ cursor: "pointer" }}
      >
        ▼ ユーザー名・ハンドルIDなどの説明
      </a>
      <div id="desprofile" style={{ display: "none" }}>
        <p>
          <b>ユーザーID</b>
          とは、ほかのユーザーが表示することができる、いわゆる
          <b>ニックネーム</b>です。
          <br />
          <b>ハンドルID</b>
          とは、ほかのユーザーがあなたを識別することができる<b>ID</b>です。
          <br />
          UUIDとは違い、好きなタイミングで変更することができます。
        </p>
      </div>
      <div>
        <label htmlFor="inputusername">ユーザー名: </label>
        <input
          id="inputusername"
          type="text"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            checkmove();
          }}
        />
      </div>
      <div>
        <label htmlFor="inputhandleid">ハンドルID: </label>
        <input
          id="inputhandleid"
          type="text"
          value={handleid}
          pattern="^[0-9a-zA-Z]+$"
          onChange={(e) => {
            setHandleid(e.target.value);
            checkmove();
          }}
        />
      </div>
      <div>
        <label htmlFor="inputbirthday">誕生日: </label>
        <input
          id="inputbirthday"
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
        />
      </div>
      <div>
        <button disabled={!canmove} onClick={() => saveprofile()}>
          保存してDashboardへ行く
        </button>
        <button
          disabled={!editedeb}
          onClick={() => router.push("/c/dashboard")}
        >
          保存せずにDashboardへ行く
        </button>
      </div>
    </>
  );
}

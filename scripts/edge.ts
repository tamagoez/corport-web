// なんでEdge Functionじゃないんだと思う？
// なんかバグるからだよ(怒)

import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
const supabase = createBrowserSupabaseClient();
const { DateTime } = require("luxon");

export async function setOnline() {
  try {
    const nowtime = DateTime.now().setZone("utc").toString();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;
    console.log(`[setOnline] Setting ${user.id}: ${nowtime}`);
    const { error } = await supabase
      .from("userdata")
      .upsert({ userid: user.id, online_at: nowtime });
    if (error) throw error;
  } catch (error) {
    console.error(error);
  }
}

export async function getRoomList() {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;
    const { data, error } = await supabase
      .from("ch_members")
      .select()
      .eq("userid", user.id);
    if (error) throw error;
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function getOnline(userid: string) {
  try {
    const { data, error } = await supabase
      .from("userdata")
      .select("online_at")
      .eq("userid", userid)
      .limit(1)
      .single();
    if (error) throw error;
    const now = DateTime.fromISO(DateTime.utc());
    const gottime = DateTime.fromISO(data.online_at);
    const difftime = now.diff(gottime);
    console.log("[onlinecheck]: " + difftime);
    return difftime < 25000;
  } catch (error) {
    console.error(error);
  }
}

export async function sendrequest(userid: string, request_text: string) {
  async function insertsupabase(
    info: string,
    insertdata: any,
    to: string,
    select: string
  ) {
    console.log(info);
    try {
      const { data, error } = await supabase
        .from(to)
        .insert(insertdata)
        .select();
      if (error) throw error;
      console.dir(data);
      return data[0];
    } catch (error) {
      console.error(error);
    }
  }

  // get uuid from handle id
  console.log(`[1/5] Getting UUID from handle_id`);
  let newuseruuid;
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("id")
      .eq("handleid", userid)
      .limit(1)
      .single();
    if (error) throw error;
    console.log("UUID looks: " + data.id);
    newuseruuid = data.id;
  } catch (error: any) {
    console.error(error);
    if (error.code === "PGRST116") {
      alert("ユーザーIDが正しくありません");
    } else alert(error.message);
    return error;
  }

  const newroom = await insertsupabase(
    "[2/5] Creating personal room",
    { users: [userid, newuseruuid], permit: false },
    "personalroom",
    "id"
  );
  const newroomid = newroom.id;
  console.log(newroomid);
  insertsupabase(
    `[3/5] Add user ${userid} to ${newroomid}`,
    { userid: userid, invitetype: "send", roomid: newroomid },
    "personalmember",
    ""
  );

  insertsupabase(
    `[4/5] Add user ${newuseruuid} to ${newroomid}`,
    { userid: newuseruuid, invitetype: "recieve", roomid: newroomid },
    "personalmember",
    ""
  );
  insertsupabase(
    `[5/5] Send a request on room ${newroomid}`,
    { userid: userid, roomid: newroomid, text: request_text },
    "personalchat",
    ""
  );
  alert(
    "個人チャットの準備ができました!\n相手から承諾されるとチャットをすることができるようになります!"
  );
}

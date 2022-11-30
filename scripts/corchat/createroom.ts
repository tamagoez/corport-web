import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { getUuid } from "../user";
import generator from "generate-password";
const supabase = createBrowserSupabaseClient();

function generatePassword() {
  // https://dev.classmethod.jp/articles/generate-a-password-string-with-nodejs-that-satisfies-the-auth0-password-policy/
  const params = {
    length: 20, //文字長指定
    numbers: true, //数字含む
    symbols: true, //記号含む
    lowercase: true, //英小文字含む
    uppercase: true, //英大文字含む
    exclude: '()+_-=}{[]|:;"/?.><,`~', //記号は !@#$%^&* のみ使用
    strict: true, //各文字種類から最低1文字ずつ使用
  };
  const genpass = generator.generate(params);
  console.log(`[createroom] generated password: ${genpass}`);
  return genpass;
}

export async function createPersonalRoom(targetid: string) {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;
    const targetuuid = await getUuid(targetid);
    const { data, error } = await supabase
      .from("ch_rooms")
      .insert({
        permit: false,
        name: "ユーザー名",
        usersid: [user.id, targetuuid],
        type: "personal",
      })
      .select("id")
      .single();
    if (error) throw error;
    addMember(user.id, data.id);
    addMember(targetuuid, data.id);
  } catch (error) {
    console.error(error);
  }
}

export async function createGroupRoom(targetids: string, groupname: string) {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const parsetids = targetids.replace(/\s+/g, "");
    let addids: any = [user.id];
    parsetids.split(",").forEach((e) => addids.push(e));
    const { data, error } = await supabase
      .from("ch_rooms")
      .insert({
        permit: false,
        name: groupname,
        usersid: addids,
        type: "group",
      })
      .select("id")
      .single();
    if (error) throw error;
    addids.forEach((e: string) => addMember(e, data.id));
  } catch (error) {
    console.error(error);
  }
}

async function addMember(userid: string, roomid: string) {
  try {
    const { error } = await supabase.from("ch_members").insert({
      roomid: roomid,
      userid: userid,
      password: generatePassword(),
    });
    if (error) throw error;
  } catch (error) {
    console.error(error);
  }
}

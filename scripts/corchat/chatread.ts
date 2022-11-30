import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { fetchPassword } from "./fetchMember";
const supabase = createBrowserSupabaseClient();

function decryptText(text: string, password: string) {
  const crypto = require("crypto");
  const decipher = crypto.createDecipher("aes-256-cbc", password);
  const decrypted = decipher.update(text, "hex", "utf-8");
  const decrypted_text = decrypted + decipher.final("utf-8");
  return decrypted_text;
}

export async function getReadId(roomid: string) {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;
    const { data, error } = await supabase
      .from("ch_members")
      .select("readid")
      .eq("userid", user.id)
      .eq("roomid", roomid)
      .limit(1)
      .single();
    if (error) throw error;
    return data.readid;
  } catch (error) {
    console.error(error);
  }
}

export async function getChatIds(roomid: string) {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;
    const { data, error } = await supabase
      .from("ch_chats")
      .select("id")
      .eq("roomid", roomid)
      .limit(100)
      .order("id", { ascending: true });
    if (error) throw error;
    console.dir(data);
    return data;
  } catch (error: any) {
    console.error(error);
    alert(error.message);
  }
}

export async function getSomeChat(roomid: string) {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;
    const getoriginal = await getChatIds(roomid);
    let chats: (
      | {
          id: string;
          userid: string;
          text: string;
          type: string;
          created_at: string;
        }
      | undefined
    )[] = [];
    getoriginal?.forEach(async (e) => {
      const chatdata = await getChatData(e.id);
      chats.push(chatdata);
      console.dir(chatdata);
    });
    if (chats) return chats;
  } catch (error: any) {
    console.error(error);
    alert(error.message);
  }
}

export async function getChatData(id: string) {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;
    const { data, error } = await supabase
      .from("ch_chats")
      .select("userid, text, type, created_at, roomid")
      .eq("id", id)
      .single();
    if (error) throw error;
    const parsedchat = decryptText(
      data.text,
      await fetchPassword(data.roomid, data.userid)
    );
    const formatedvalue = {
      id: id,
      userid: data.userid,
      text: parsedchat,
      type: data.type,
      created_at: data.created_at,
    };
    return formatedvalue;
  } catch (error) {
    console.error(error);
  }
}

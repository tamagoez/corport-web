import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { fetchPassword } from "./fetchMember";
const supabase = createBrowserSupabaseClient();

function cryptText(text: string, password: string) {
  const crypto = require("crypto");
  const cipher = crypto.createCipher("aes-256-cbc", password);
  const crypted = cipher.update(text, "utf-8", "hex");
  const crypted_text = crypted + cipher.final("hex");
  console.log(`[chatsend.ts] crypted_text: ${crypted_text}`);
  return crypted_text;
}

export async function sendMessage(roomid: string, text: string) {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;
    const password = await fetchPassword(roomid, user.id);
    const inserttext = cryptText(text, password);
    const { error } = await supabase.from("ch_chats").insert({
      userid: user.id,
      roomid: roomid,
      text: inserttext,
      type: "text",
    });
    if (error) throw error;
  } catch (error: any) {
    console.error(error);
    alert(error.message);
  }
}

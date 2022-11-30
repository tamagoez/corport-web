import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
const supabase = createBrowserSupabaseClient();

export async function fetchPassword(roomid: string, userid: string) {
  try {
    const { data, error } = await supabase
      .from("ch_members")
      .select("password")
      .eq("userid", userid)
      .eq("roomid", roomid)
      .limit(1)
      .single();
    if (error) throw error;
    return data.password;
  } catch (error) {
    console.error(error);
  }
}

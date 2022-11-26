import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
const supabase = createBrowserSupabaseClient();

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

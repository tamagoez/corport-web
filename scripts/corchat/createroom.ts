import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
const supabase = createBrowserSupabaseClient();

export async function createPersonalRoom(targetid: string) {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;
    const { error } = await supabase.from("ch_rooms").insert({
      permit: false,
      name: "ユーザー名",
      usersid: [user.id, targetid],
      type: "personal",
    });
    if (error) throw error;
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
    const { error } = await supabase.from("ch_rooms").insert({
      permit: false,
      name: groupname,
      usersid: [user.id, ...targetids],
      type: "group",
    });
    if (error) throw error;
  } catch (error) {
    console.error(error);
  }
}

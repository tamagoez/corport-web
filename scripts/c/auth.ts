import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
const supabase = createBrowserSupabaseClient();

export async function getProfileSet() {
  try {
    let handleid;
    let username;
    type datatype = {
      handleid?: string;
      username?: string;
    };
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;
    const { data, error } = await supabase
      .from("profile")
      .select("handleid, username")
      .eq("userid", user.id);
    if (error) throw error;
    return true;
  } catch (error) {
    console.error(error);
  }
}

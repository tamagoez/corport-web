import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
const supabase = createBrowserSupabaseClient();

export async function getProfileSet() {
  try {
    interface datatype {
      data: { handleid?: string; username?: string };
      error: any;
    }
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;
    const { data, error } = (await supabase
      .from("profile")
      .select("handleid, username")
      .eq("userid", user.id)
      .limit(1)
      .single()) as datatype;
    if (error) throw error;
    if (data.handleid && data.username) return true;
    else return false;
  } catch (error) {
    console.error(error);
  }
}

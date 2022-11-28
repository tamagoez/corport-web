import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
const supabase = createBrowserSupabaseClient();

export async function getProfile(userid: string, select: string) {
  try {
    const { data, error } = await supabase
      .from("profile")
      .select()
      .eq("userid", userid)
      .single();
    if (error) throw error;
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function setProfile(userid: string, data: any) {
  try {
    const { error } = await supabase.from("profile").upsert(data).select();
    if (error) throw error;
    return true;
  } catch (error) {
    console.error(error);
  }
}

export async function getUsername(userid: string) {
  try {
    const { data, error } = await supabase
      .from("profile")
      .select("username")
      .eq("userid", userid)
      .single();
    if (error) throw error;
    return data.username;
  } catch (error) {
    console.error(error);
  }
}

export async function getUuid(handleid: string) {
  try {
    const { data, error } = await supabase
      .from("profile")
      .select("userid")
      .eq("handleid", handleid)
      .single();
    if (error) throw error;
    return data.userid;
  } catch (error) {
    console.error(error);
  }
}

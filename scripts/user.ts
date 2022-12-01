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

export async function getSettings() {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;
    const { data, error } = await supabase
      .from("settings")
      .select()
      .eq("userid", user.id)
      .single();
    if (error) throw error;
    const jsonString = JSON.stringify(data);
    if (typeof window !== "undefined") window.localStorage.setItem("settings", jsonString)
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function setSettings(setdata: any) {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;
    const { data, error } = await supabase.from("settings").upsert({ userid: user.id, ...setdata}).select();
    if (error) throw error;
    const jsonString = JSON.stringify(data);
    if (typeof window !== "undefined") window.localStorage.setItem("settings", jsonString)
    return data;
  } catch (error) {
    console.error(error);
  }
}

export function getSettingByKey(key: string) {
  if (typeof window === "undefined") return undefined;
  const getdata = JSON.parse(window.localStorage.getItem("settings")!);
  return getdata[key]
}
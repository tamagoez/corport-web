import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
const supabase = createBrowserSupabaseClient();

export async function getLastChat(roomid: string) {
  try {
    const { data, error } = await supabase
      .from("ch_chat")
      .select("text")
      .eq("roomid", roomid)
      .order("id", { ascending: true })
      .limit(1)
      .single();
    if (error) throw error;
    return data.text;
  } catch (error) {
    console.error(error);
  }
}

export async function getRoomName(roomid: string) {
  try {
    const { data, error } = await supabase
      .from("ch_rooms")
      .select("name")
      .eq("roomid", roomid)
      .single();
    if (error) throw error;
    return data.name;
  } catch (error) {
    console.error(error);
  }
}

export async function getLastChat(roomid: string) {
  try {
    const { data, error } = await supabase
      .from("ch_chat")
      .select('*', { count: 'exact', head: true })
      .eq("roomid", roomid)
      .gte('id', 2)
    if (error) throw error;
    return data.text;
  } catch (error) {
    console.error(error);
  }
}
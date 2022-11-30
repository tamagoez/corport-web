import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { getReadId } from "./chatread";
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
    return "なんもない";
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

export async function getUnreadCount(roomid: string) {
  try {
    const readid = await getReadId(roomid);
    const { data, error } = await supabase
      .from("ch_chat")
      .select("*", { count: "exact", head: true })
      .eq("roomid", roomid)
      .gte("id", readid);
    if (error) throw error;
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function getAllRoomsId() {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;
    const { data, error } = await supabase
      .from("ch_members")
      .select("roomid")
      .eq("userid", user.id);
    if (error) throw error;
    console.dir(data);
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function getRoomData(roomid: string) {
  try {
    const { data, error } = await supabase
      .from("ch_rooms")
      .select("id, name, type, permit")
      .eq("id", roomid)
      .single();
    if (error) throw error;
    const lastchat = await getLastChat(roomid);
    return {
      id: data.id,
      roomname: data.name,
      permit: data.permit,
      type: data.type,
      lastchat: lastchat,
    };
  } catch (error) {
    console.error(error);
  }
}

export async function getAllRoomsData() {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;
    const ids = await getAllRoomsId();
    let lists: (
      | {
          id: string;
          roomname: string;
          permit: boolean;
          type: string;
          lastchat: string;
        }
      | undefined
    )[] = [];
    ids?.forEach(async (e) => {
      const roomdata = await getRoomData(e.roomid);
      lists.push(roomdata);
      console.log(`[getAllRoomsData] roomdata:`);
      console.dir(roomdata);
    });
    console.log(`[getAllRoomsData] lists: ${lists}`);
    console.dir(lists);
    if (lists) return lists;
  } catch (error) {
    console.error(error);
  }
}

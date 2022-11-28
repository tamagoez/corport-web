import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { getUuid } from "../user";
const supabase = createBrowserSupabaseClient();

export async function createPersonalRoom(targetid: string) {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;
    const targetuuid = await getUuid(targetid);
    const { data, error } = await supabase
      .from("ch_rooms")
      .insert({
        permit: false,
        name: "ユーザー名",
        usersid: [user.id, targetuuid],
        type: "personal",
      })
      .select("id")
      .single();
    if (error) throw error;
    addMember(user.id, data.id);
    addMember(targetuuid, data.id);
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

    const parsetids = targetids.replace(/\s+/g, "");
    let addids: any = [user.id];
    parsetids.split(",").forEach((e) => addids.push(e));
    const { data, error } = await supabase
      .from("ch_rooms")
      .insert({
        permit: false,
        name: groupname,
        usersid: addids,
        type: "group",
      })
      .select("id")
      .single();
    if (error) throw error;
    addids.forEach((e: string) => addMember(e, data.id));
  } catch (error) {
    console.error(error);
  }
}

async function addMember(userid: string, roomid: string) {
  try {
    const { error } = await supabase.from("ch_members").insert({
      roomid: roomid,
      userid: userid,
    });
    if (error) throw error;
  } catch (error) {
    console.error(error);
  }
}

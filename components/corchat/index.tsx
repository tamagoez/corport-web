import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
export default async function RoomList() {
  const supabase = useSupabaseClient();
  const user = useUser();
  try {
    const { data, error } = await supabase.functions.invoke(
      "getcorchatrooms",
      {}
    );
    console.dir(data);
    if (error) throw error;
  } catch (error: any) {
    console.error(error.message);
  }
}

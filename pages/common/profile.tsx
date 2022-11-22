import { useUser } from "@supabase/auth-helpers-react";

export default function Profile() {
    const user = useUser();
    return <><h1>Profile</h1><p>{user?.id || "未定義です"}</p></>
}
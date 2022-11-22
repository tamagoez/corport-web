import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Logout() {
    const supabase = useSupabaseClient()
    const session = useSession();
    const router = useRouter()
    supabase.auth.signOut()
    useEffect((() => {if (!session) router.replace("/")}), [session])
    return (<><h1>Logouting...</h1><h2>Thanks for using!</h2></>)
}
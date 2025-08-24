import { useEffect } from "react"
import { supabase } from "../lib/supabaseClient"

export default function TestPage() {
  useEffect(() => {
    async function getUsers() {
      const { data, error } = await supabase.from("users").select("*")
      console.log("Users:", data)
      console.log("Error:", error)
    }
    getUsers()
  }, [])

  return <h1>Check console for users data</h1>
}

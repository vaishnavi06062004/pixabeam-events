import { supabase } from '../../lib/supabaseClient'

export default async function handler(req, res) {
  // Get logged-in user
  const { data: user, error: userError } = await supabase.auth.getUser()

  if (userError) {
    return res.status(401).json({ error: 'User not authenticated' })
  }

  // Now you can use `user` object
  console.log(user)
  res.status(200).json({ user })
}

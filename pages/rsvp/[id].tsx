import { supabase } from "../../lib/supabaseClient";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type Event = {
  id: string;
  title: string;
  description: string;
  date: string;
  city: string;
};

export default function RSVP() {
  const router = useRouter();
  const { id } = router.query;
  const [event, setEvent] = useState<Event | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("Yes");
  const [message, setMessage] = useState("");

  // 1️⃣ Fetch event
  useEffect(() => {
    if (!id || typeof id !== "string") return;

    async function fetchEvent() {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("id", id)
        .single();
      if (error) console.error(error);
      else setEvent(data as Event);
    }

    fetchEvent();
  }, [id]);

  // 2️⃣ Handle RSVP
  async function handleRSVP(e: React.FormEvent) {
    e.preventDefault();

    if (!name || !email) {
      setMessage("Please enter your name and email.");
      return;
    }

    if (!id || typeof id !== "string") {
      setMessage("Invalid event ID.");
      return;
    }

    try {
      // ✅ Check if user exists
      let { data: user, error: userError } = await supabase
        .from("users")
        .select("*")
        .eq("email", email)
        .single();

      if (userError && userError.code !== "PGRST116") throw userError;

      let userId = user?.id;

      // ✅ Insert user if not exists
      if (!userId) {
        const { data: newUser, error: insertUserError } = await supabase
          .from("users")
          .insert([{ name, email }])
          .select()
          .single();
        if (insertUserError) throw insertUserError;
        userId = newUser.id;
      }

      // ✅ Insert RSVP
      const { error: rsvpError } = await supabase.from("rsvps").insert([
        {
          user_id: userId,
          event_id: id,
          status,
        },
      ]);

      if (rsvpError) throw rsvpError;

      setMessage("RSVP confirmed! 🎉");
      setName("");
      setEmail("");
      setStatus("Yes");
    } catch (err: any) {
      console.error(err);
      setMessage("Something went wrong: " + err.message);
    }
  }

  if (!event) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>{event.title}</h1>
      <p>{event.description}</p>
      <p>{event.city} — {new Date(event.date).toDateString()}</p>

      <h2>RSVP</h2>
      <form onSubmit={handleRSVP}>
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ display: "block", marginBottom: "10px" }}
        />
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ display: "block", marginBottom: "10px" }}
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          style={{ display: "block", marginBottom: "10px" }}
        >
          <option value="Yes">Yes</option>
          <option value="No">No</option>
          <option value="Maybe">Maybe</option>
        </select>
        <button type="submit">Submit RSVP</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

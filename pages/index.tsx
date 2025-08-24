import { supabase } from "../lib/supabaseClient"
import Link from "next/link"
import { useEffect, useState } from "react"

type Event = {
  id: string   // 👈 UUID type in Supabase
  title: string
  description: string
  date: string
  city: string
}

export default function Home() {
  const [events, setEvents] = useState<Event[]>([])

  useEffect(() => {
    async function fetchEvents() {
      const { data, error } = await supabase.from("events").select("*")
      if (error) console.error("Fetch error:", error)
      else setEvents(data as Event[])
    }
    fetchEvents()
  }, [])

  return (
    <div style={{ padding: "20px" }}>
      <h1>Upcoming Events</h1>
      {events.length === 0 && <p>No events found.</p>}

      {events.map((event) => (
        <div
          key={event.id}
          style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "15px",
            marginBottom: "15px",
          }}
        >
          <h2>{event.title}</h2>
          <p>{event.description}</p>
          <p>
            {event.city} — {new Date(event.date).toDateString()}
          </p>
          {/* 👇 Now links dynamically using the event.id (UUID) */}
          <Link href={`/rsvp/${event.id}`}>
            <button style={{ marginTop: "10px" }}>RSVP</button>
          </Link>
        </div>
      ))}
    </div>
  )
}

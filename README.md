**Supabase Events Platform**

A simple event management platform built with Next.js and Supabase. Users can view upcoming events and RSVP with Yes, No, or Maybe.

**Short Description of Database Design**

The database is designed to manage users, events, and RSVPs efficiently.

Users table stores registered users with unique emails.

Events table stores event details and links to the creator via a foreign key.

RSVPs table tracks each user’s response to events, ensuring a user can RSVP only once per event.

Referential integrity is maintained using ON DELETE CASCADE, and data validity is enforced using constraints like CHECK and UNIQUE.

**Database Design**

*Tables:*

Users

id (UUID, PK)

name (Text, Not Null)

email (Text, Unique, Not Null)

created_at (Timestamp, default now)

Events

id (UUID, PK)

title (Text, Not Null)

description (Text)

date (Date, Not Null)

city (Text)

created_by (UUID, FK → Users, on delete cascade)

RSVPs

id (UUID, PK)

user_id (UUID, FK → Users, on delete cascade)

event_id (UUID, FK → Events, on delete cascade)

status (Text, Yes/No/Maybe)

Unique combination of user_id and event_id

**Design Choices:**

Used UUID for unique identifiers across tables.

on delete cascade ensures database integrity.

CHECK constraint on RSVP status prevents invalid values.

unique(user_id, event_id) prevents duplicate RSVPs.

**Features**

View Events: List all upcoming events with title, description, date, and city.

RSVP: Users can RSVP to events with one of three statuses: Yes, No, Maybe.

Database: Managed with Supabase using three tables: users, events, rsvps.

Referential Integrity: Deleting a user or event automatically removes associated RSVPs.

***Setup Instructions***

**Clone the repo:**

git clone <your-github-repo-url>
cd supabase-events


**Install dependencies:**

npm install


**Set up environment variables (.env.local):**

NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key


**Run locally:**

npm run dev

**Live Deployment**

Access the live app on Vercel:
🔗 https://pixabeam-events-2p0mpubqr-vaishnavibolgam25-7586s-projects.vercel.app/

Screenshots / ER Diagram
<img width="1500" height="764" alt="supabase-schema-ntbzsjgexdpcgmlrxsyt" src="https://github.com/user-attachments/assets/d5b50d2a-5d4c-4a9f-a3eb-970508b7cf55" />
<img width="1901" height="902" alt="Screenshot 2025-08-24 132922" src="https://github.com/user-attachments/assets/40073e1e-1135-43df-be3e-13c7ff1500d8" />
<img width="1919" height="914" alt="Screenshot 2025-08-24 132851" src="https://github.com/user-attachments/assets/837509b9-b105-43f7-9dbc-ef5e7309b51b" />
<img width="1916" height="913" alt="Screenshot 2025-08-24 132831" src="https://github.com/user-attachments/assets/f5ff8c1e-55fe-4030-9adb-e27602057a0e" />


Technologies Used

Next.js
 – React framework

Supabase
 – Backend & database

JavaScript / HTML / CSS

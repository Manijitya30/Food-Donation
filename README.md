🍱 Food Donation Management System

A full-stack web application designed to connect food donors, delivery riders, and recipient organisations to reduce food wastage and enable efficient food redistribution. The platform includes role-based dashboards, automated assignment logic, and an admin analytics panel.

🚀 Features
🔐 Authentication & Roles

JWT-based authentication

Role-based access control:

Donor

Rider

Organisation

Admin

👤 Donor

Create food donation requests

Add multiple food items per donation

Track donation status in real time

View donation history

🚴 Rider

Automatically assigned donations

Accept or reject assigned donations

Update delivery status (Picked Up → In Transit → Delivered)

View active and completed assignments

🏢 Organisation

Automatically assigned donations

View incoming and received donations

Manage organisational capacity (optional future enhancement)

🛠 Admin

Dashboard analytics:

Total donations

Total donors, riders, organisations

Category-wise food distribution

View recent donations and donors

System-wide monitoring

🧱 Tech Stack
Frontend

React.js

TypeScript

Tailwind CSS

Recharts (data visualization)

Axios (API calls)

Backend

Node.js

Express.js

Prisma ORM

PostgreSQL

JWT Authentication

🗂 Database Schema (Core Entities)

User (Donor / Rider / Organisation / Admin)

Donation

FoodItem

Rider

Organisation

Relationships are managed using Prisma ORM with proper foreign keys and relations.

🔄 Donation Workflow

Donor creates a donation with food details

System auto-assigns:

An available rider

An active organisation

Rider accepts or rejects the donation

Rider updates delivery status

Organisation receives the donation

Admin dashboard updates analytics

🧪 API Highlights
Method	Endpoint	Description
POST	/api/auth/signup	Register user
POST	/api/auth/login	Login
POST	/api/donations	Create donation
GET	/api/donations/my	Donor donations
GET	/api/donations/rider	Rider assignments
PATCH	/api/donations/:id/rider-action	Accept / Reject
PATCH	/api/donations/:id/status	Update status
GET	/api/admin/stats	Admin analytics
⚙️ Setup Instructions
1️⃣ Clone the Repository
git clone https://github.com/your-username/food-donation-system.git
cd food-donation-system

2️⃣ Backend Setup
cd backend
npm install


Create .env file:

DATABASE_URL=postgresql://username:password@localhost:5432/food_donation
JWT_SECRET=your_secret_key


Run Prisma:

npx prisma migrate dev
npx prisma generate


Start backend:

npm run dev

3️⃣ Frontend Setup
cd frontend
npm install
npm run dev

🧑‍💻 Admin Setup

Create an admin user directly in the database or using Prisma seed with:

role: "ADMIN"

🛣 Future Enhancements

Organisation capacity-based assignment

Real-time notifications

Google Maps integration for routing

Ratings and feedback system

Admin role management panel

🙌 Author
Manijitya Kumar Parimi
Full-Stack Developer

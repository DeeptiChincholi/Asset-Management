🗃️ Asset Management System
A full-stack Asset Management System that allows users to register, log in, add assets, and manage them via a responsive UI. Built using React.js, Node.js, Express.js, and MongoDB.

📌 Features
🔐 User Registration & Secure Login (with hashed passwords using bcrypt)

🧾 Add, View & Manage Assets

🧑‍💼 User Profile with Password Change functionality

📦 REST API using Express & MongoDB

🎨 Styled using Material-UI (MUI) for modern, responsive design

🛠️ Tech Stack
Frontend:

React.js

Material UI (MUI)

Backend:

Node.js

Express.js

MongoDB with Mongoose

Bcrypt for password hashing

CORS enabled for frontend-backend communication

🧑‍💻 Installation Steps
📁 Clone the Repository
git clone https://github.com/your-username/asset-management-system.git
cd asset-management-system

🔧 Backend Setup
Navigate to the backend folder:
cd backend

Install dependencies:
npm install

Start MongoDB locally or set up MongoDB Atlas. Then run:
node index.js

🌐 Frontend Setup
Navigate to the frontend folder:
cd frontend

Install dependencies:
npm install

Start the React app:
npm start

📂 Folder Structure

asset-management-system/
├── backend/
│   ├── models/
│   ├── index.js
│   └── ...
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── App.js
│   │   ├── Context.js
│   │   └── ...
│   └── package.json

🧪 API Endpoints
Method	Route	Description
POST	/register	Register new user
POST	/	Login
POST	/assets	Create new asset
GET	/assetDetails	Fetch all assets
GET	/profile?email=	Get user profile
POST	/profile	Update password

🔐 Security Features
Passwords are hashed using bcrypt before storing.

Sensitive data is validated and handled securely.

CORS configured to accept requests only from allowed origins.

🖼️ Screenshots
View screenshot folder.

📌 Future Improvements
Add role-based access control (admin/user)

Export asset data to Excel/PDF

Search and filter functionality


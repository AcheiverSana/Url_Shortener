# Shortly — URL Shortener

A full-stack URL shortener where you can paste any long link and get a clean, shareable short URL. Built with Node.js, Express, MongoDB, and EJS with JWT authentication and role-based access control.

---

## Preview

> **Normal User** — can shorten URLs and view only their own links
> **Admin** — can view all links created by every user

---

## Tech Stack

| Layer     | Technology         |
|-----------|-----------         |
| Runtime   | Node.js            |
| Framework | Express.js         |
| Database  | MongoDB + Mongoose |
| Templating|EJS                 |
| Auth      |JWT + cookie-parser |
|ID Generation| shortid          |

---

## Project Structure

```
Url_Shortener/
│
├── Controllers/
│   ├── controllers.js     → shorten URL, analytics
│   └── user.js            → signup, login
│
├── Middlewares/
│   └── auth.js            → restrictToLoggedInUsers, checkauth, restrictToAdmin
│
├── Models/
│   ├── url.js             → shortID, redirecturl, visitHistory, createdBy
│   └── user.js            → name, email, password, role
│
├── Routes/
│   ├── router.js          → URL routes
│   ├── staticrouter.js    → page routes (home, login, signup)
│   └── user.js            → auth routes
│
├── service/
│   └── auth.js            → createToken, verifyToken (JWT)
│
├── views/
│   ├── home.ejs
│   ├── login.ejs
│   └── signup.ejs
│
├── connect.js             → MongoDB connection
├── index.js               → entry point
└── .gitignore
```

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/AcheiverSana/Url_Shortener.git
cd Url_Shortener
```

### 2. Install dependencies

```bash
npm install
```

### 3. Make sure MongoDB is running locally

```bash
mongod
```

### 4. Start the server

```bash
npm run start
```

### 5. Open in browser

```
http://localhost:8000
```

---

## How It Works

### Shortening a URL
1. User logs in
2. Pastes a long URL and clicks Shorten
3. A unique short code is generated using `shortid`
4. Short URL is saved to MongoDB with `createdBy` set to the logged-in user
5. User is redirected to home with their short link displayed

### Visiting a Short URL
1. User visits `localhost:8000/:shortID`
2. Server finds the URL in MongoDB
3. Adds a timestamp to `visitHistory` (click tracking)
4. Redirects to the original URL

### Authentication Flow
```
Signup / Login
    → JWT token created with { id, role }
    → Stored in httpOnly cookie

Every request
    → Middleware reads cookie
    → Verifies JWT
    → Attaches decoded user to req.user

Protected routes
    → Check req.user exists
    → Check req.user.role if needed
```

---

## Role-Based Access

| Role | What they see |
|------|--------------|
| `normal` | Only their own shortened URLs |
| `admin` | All URLs from every user |

### Making a user Admin

Open `mongosh` and run:

```js
use urlshortener
db.users.updateOne({ name: "Sana" }, { $set: { role: "admin" } })
```

---

## API Routes

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/` | Home page |
| GET | `/signup` | Signup page |
| GET | `/login` | Login page |
| POST | `/user` | Create account |
| POST | `/user/login` | Log in |
| POST | `/url` | Shorten a URL |
| GET | `/:shortID` | Redirect to original URL |
| GET | `/url/analytics/:shortID` | Get click analytics |

---

## Environment Variables

Move hardcoded secrets to a `.env` file:

```
MONGO_URI=mongodb://localhost:27017/urlshortener
JWT_SECRET=your_secret_key_here
```

Then access them in code with `process.env.MONGO_URI` and `process.env.JWT_SECRET`.

---

## Author

Built by **Sana** — [@AcheiverSana](https://github.com/AcheiverSana)

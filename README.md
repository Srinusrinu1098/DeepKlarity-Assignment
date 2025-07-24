# 🧠 Resume Analyzer - AI-Powered Resume Review App

The **Resume Analyzer** is a full-stack web application that uses AI (Gemini API) to analyze uploaded resumes and provide constructive feedback, including suggestions for improvement, skill insights, and more.

---

## 🚀 Features

- Upload resumes in PDF format.
- Backend stores resumes and their AI-analyzed feedback in a PostgreSQL database.
- View all previously analyzed resumes.
- Detailed resume view with personalized suggestions.
- Beautiful and responsive UI using Tailwind CSS.
- Stored screenshots and sample resumes for demo/testing.

---

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** (App Router)
- **React**
- **Tailwind CSS**
- **Axios** (for API requests)
- **Lucide-React** & **Tabler Icons** (for UI icons)

### Backend
- **Node.js + Express**
- **PostgreSQL**
- **Multer** (for file uploads)
- **Gemini API** (for AI-powered analysis)
- **dotenv**, **pg**, **cors**

---

## 📁 Project Structure

```
resume-analyzer/
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── db/
│   ├── sample_data/
│   ├── server.js
│   └── .env
├── sample_data/
│   ├── Resume 1/
│   ├── Resume 2/
│   ├── Resume 3/
│   ├── Resume 4/
├── screenshots/
│   ├── screenshot 1/
│   ├── screenshot 2/
│   ├── screenshot 3/
│   ├── screenshot 4/
│   ├── screenshot 5/
├── README.md
```

---

## 🧩 Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Setup your `.env` file:

   ```env
    DB_USER=*************
    DB_HOST=*************
    DB_NAME=*************
    DB_PASS=*************
    DB_PORT=*************
    GEMINI_API_KEY = *************
   ```

4. Run the backend server:

   ```bash
   npm start
   ```

   Server will run at: `http://localhost:5000`

5. Sample resumes for testing are stored in `sample_data/` folder.

---

## 💻 Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Setup your `.env.local` file:

   ```env
   NEXT_PUBLIC_BACKEND_URL=http://localhost:5000/api
   ```

4. Run the frontend:

   ```bash
   npm run dev
   ```

   App will run at: `http://localhost:3000`

---

## 📷 Screenshots

All UI screenshots are stored inside the `screenshots/` folder. You can use them in the README or for presentation/demo purposes.

---

## 🔌 API Endpoints

### POST `/api/resume/upload`

- Upload a resume (PDF)
- Uses Multer + Gemini to analyze content
- Stores data in PostgreSQL

### GET `/api/resumes`

- Fetch all uploaded resumes

### GET `/api/resumes/:id`

- Fetch detailed resume information by ID

---

## 🧪 Sample Data

- Add your test resumes to `backend/sample_data/`
- You can manually upload them through the UI to test analysis

---

## 📦 Deployment 

If you plan to deploy:
- Used **Railway**, **Vercel** for backend and frontend separately
- Added environment variables in respective dashboards
- Ensured CORS is configured properly

---

## 📌  Improvements

- Enable PDF preview UI
- Improve Gemini prompts
- Clear feedback with Gemini

---

## 🧑‍💻 Author

Made with ❤️ by [T Srinivasulu]

---

## 📜 License

This project is licensed under the MIT License.

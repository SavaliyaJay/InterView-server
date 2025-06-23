<h1 align="center">🤖 Interview AI - Smart Interview Practice Platform</h1>

https://github.com/user-attachments/assets/78e085e1-6e1c-412f-9bc1-41fbed7446c2

<h2>🚀 What It Does</h2>

Interview AI is a smart platform designed to revolutionize interview preparation by leveraging advanced AI technology to provide:

- 📄 **Smart Document Processing**: Upload resumes, PDFs, DOCX, Excel files, or website links
- 🤖 **AI-Generated Questions**: Automatically create personalized interview questions from your content using Google Gemini AI
- 🎤 **Voice & Text Input**: Answer questions using microphone or keyboard with advanced speech-to-text capabilities
- 📊 **Real-time AI Feedback**: Receive professional AI-powered feedback instantly to improve your responses
- 📈 **Performance Tracking**: Monitor your progress and improvement over time with AI-driven analytics

The platform uses cutting-edge AI to analyze your documents, generate relevant questions, and provide intelligent feedback to enhance your interview performance.

<h2>🔧 3 Main Features</h2>

### 1️⃣ **Upload & Practice**
- 📂 Upload multiple file formats (PDF, DOCX, Excel, URLs)
- 🧠 AI analyzes your content and generates relevant questions
- 🎤 Practice with voice recording or text input
- 💡 Get instant, actionable AI-powered feedback to improve your responses

### 2️⃣ **Ready-Made Questions**
- 📚 Access library of commonly asked interview questions
- 🏷️ Questions organized by job roles, industries, and difficulty levels
- ⌨️ Flexible response options (voice or text)
- 🎯 Targeted AI feedback to make you interview-ready

### 3️⃣ **Admin Control Panel**
- 👨‍💼 Comprehensive admin dashboard
- 📝 Create and manage question categories and subcategories
- ➕ Add, edit, and organize interview questions
- 🔒 Role-based access control for admins and users

<h2>🛠️ Tech Stack</h2>

<table>
<tr>
<td><strong>Frontend</strong></td>
<td>
<img src="https://img.shields.io/badge/Next.js-000000?style=flat&logo=next.js&logoColor=white" alt="Next.js">
<img src="https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB" alt="React">
<img src="https://img.shields.io/badge/TailwindCSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white" alt="TailwindCSS">
<img src="https://img.shields.io/badge/Redux-593D88?style=flat&logo=redux&logoColor=white" alt="Redux">
</td>
</tr>
<tr>
<td><strong>Backend</strong></td>
<td>
<img src="https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white" alt="Node.js">
<img src="https://img.shields.io/badge/Express.js-000000?style=flat&logo=express&logoColor=white" alt="Express.js">
<img src="https://img.shields.io/badge/Sequelize-52B0E7?style=flat&logo=sequelize&logoColor=white" alt="Sequelize">
</td>
</tr>
<tr>
<td><strong>Database</strong></td>
<td>
<img src="https://img.shields.io/badge/PostgreSQL-316192?style=flat&logo=postgresql&logoColor=white" alt="PostgreSQL">
<img src="https://img.shields.io/badge/AWS_RDS-232F3E?style=flat&logo=amazon-aws&logoColor=white" alt="AWS RDS">
</td>
</tr>
<tr>
<td><strong>AI & APIs</strong></td>
<td>
<img src="https://img.shields.io/badge/Google_AI-4285F4?style=flat&logo=google&logoColor=white" alt="Google AI">
<img src="https://img.shields.io/badge/Gemini_AI-FF6B6B?style=flat&logo=google&logoColor=white" alt="Gemini AI">
</td>
</tr>
<tr>
<td><strong>Tools & Utils</strong></td>
<td>
<img src="https://img.shields.io/badge/JWT-000000?style=flat&logo=json-web-tokens&logoColor=white" alt="JWT">
<img src="https://img.shields.io/badge/ESLint-4B32C3?style=flat&logo=eslint&logoColor=white" alt="ESLint">
<img src="https://img.shields.io/badge/Prettier-F7B93E?style=flat&logo=prettier&logoColor=black" alt="Prettier">
</td>
</tr>
</table>

<h2>⚙️ Installation & Setup</h2>

### 📋 Prerequisites
- Node.js (v18+ recommended)
- PostgreSQL database
- Google AI API key

### 🔧 Backend Setup

```bash
# Clone the repository
git clone https://github.com/SavaliyaJay/InterView-server.git
cd InterView-server

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

**Configure your `.env` file:**
```env
PORT=5000
DB_HOST=your-database-host
DB_USER=your-database-username
DB_PASS=your-database-password
DB_NAME=your-database-name
JWT_SECRET=your-jwt-secret-key
GOOGLE_AI_API_KEY=your-google-ai-api-key
```

```bash
# Start the server
npm start
```

### 🌐 Frontend Setup

```bash
# Clone the repository
git clone https://github.com/SavaliyaJay/InterView-client.git
cd InterView-client

# Install dependencies
npm install

# Create environment file
cp .env.local.example .env.local
```

**Configure your `.env.local` file:**
```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
NEXT_PUBLIC_GOOGLE_AI_API_KEY=your-google-ai-api-key
```

```bash
# Start the development server
npm run dev
```

🌐 **Frontend:** `http://localhost:4000`  
🔧 **Backend:** `http://localhost:5000`

## 👨‍💻 Author

**Jay Savaliya**
- 💼 [LinkedIn](https://linkedin.com/in/jay-savaliya)
- 🐙 [GitHub](https://github.com/SavaliyaJay)
- 📧 [Email](mailto:work.jaysavaliya@gmail.Com)

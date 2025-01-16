# Resume Match Application

## 📖 Project Description

**Resume Match Application** is a React-based web app that allows users to upload multiple PDF resumes and compare them with a job description. The app leverages the OpenAI API to analyze and score how well each resume matches the job description. Results are displayed in an intuitive interface, highlighting the most suitable candidates.

## 🚀 Features

- Upload multiple **PDF** resumes.
- Enter a **job description** for comparison.
- Analyze resumes using the **OpenAI API**.
- Display results with **match percentages** and **recommendations**.
- Responsive UI with **Dark/Light mode**.

## 🛠️ Tech Stack

- **React** + **TypeScript**
- **Ant Design** for UI components
- **Styled-components** for styling
- **Axios** for API requests
- **OpenAI API** for resume analysis

## 🔑 API Integrations

### 1. **PDF to Text Extraction**
- **API:** [PDF.co API](https://pdf.co/)
- **Usage:** Extracts text from uploaded PDF resumes.
- **Request:**

```typescript
const extractTextFromPDF = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);
  const response = await axios.post("https://api.pdf.co/v1/pdf/convert/to/text", formData, {
    headers: {
      "x-api-key": YOUR_PDFCO_API_KEY,
      "Content-Type": "multipart/form-data"
    }
  });
  return response.data.body;
};
```

### 2. **Resume Analysis with OpenAI**
- **API:** [OpenAI API](https://platform.openai.com/)
- **Usage:** Compares resume text with the job description.
- **Request:**

```typescript
const analyzeResumeWithJobDescription = async (jobDescription: string, resumeText: string) => {
  const response = await axios.post("https://api.openai.com/v1/chat/completions", {
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: "You are an HR assistant evaluating resumes." },
      { role: "user", content: `Job Description: ${jobDescription}\nResume: ${resumeText}` }
    ]
  }, {
    headers: {
      Authorization: `Bearer YOUR_OPENAI_API_KEY`,
      "Content-Type": "application/json"
    }
  });
  return response.data.choices[0].message.content;
};
```

## ⚙️ Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/resume-match-app.git
   cd resume-match-app
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Run the app:**
   ```bash
   npm start
   ```

## 💼 Folder Structure

```
src/
├── components/
│   ├── JobInput.tsx
│   ├── ResumeInput.tsx
│   └── ResultDisplay.tsx
├── mock/
│   └── mockData.ts
├── utils/
│   └── api.ts
├── types/
│   └── index.d.ts
└── App.tsx
```

## 🌙 Dark/Light Mode

- The app supports **Dark** and **Light** modes.
- In **Dark Mode**, backgrounds are dark, and text is white.
- In **Light Mode**, all text is white for better readability.

## 📝 License

MIT License © 2024 Resume Match App

---

🔔 **Note:** Replace `YOUR_OPENAI_API_KEY` and `YOUR_PDFCO_API_KEY` with valid keys.

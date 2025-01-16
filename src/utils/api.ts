import axios from "axios";

const PDFCO_API_KEY = "PDFCO_API_KEY";
const OPENAI_API_KEY = "OPENAI_API_KEY"
const PDFCO_URL = "https://api.pdf.co/v1/file/upload"; 

const uploadPDFToPDFco = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);

    try {
        const response = await axios.post(PDFCO_URL, formData, {
            headers: {
                "x-api-key": PDFCO_API_KEY,
                "Content-Type": "multipart/form-data"
            }
        });

        if (response.data && response.data.url) {
            return response.data.url;
        } else {
            throw new Error("Could not upload PDF.");
        }
    } catch (error) {
        console.error("Error uploading PDF:", error);
        throw new Error("Error uploading PDF");
    }
};

export const extractTextFromPDF = async (file: File): Promise<string> => {
    try {
        const uploadedFileUrl = await uploadPDFToPDFco(file);

        const response = await axios.post(
            "https://api.pdf.co/v1/pdf/convert/to/text",
            {
                url: uploadedFileUrl,
                inline: true 
            },
            {
                headers: {
                    "x-api-key": PDFCO_API_KEY,
                    "Content-Type": "application/json"
                }
            }
        );
        if (response.data && response.data.body) {
            return response.data.body;
        } else {
            throw new Error("Failed to extract text from PDF.");
        }
    } catch (error) {
        console.error("Error extracting text from PDF:", error);
        throw new Error("Error extracting text from PDF");
    }
};

export const analyzeResumeWithJobDescription = async (jobDescription: string, resumeText: string) => {
    try {
        const response = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
                model: "gpt-4",
                messages: [
                    { role: "system", content: "You are an HR assistant who evaluates the compliance of a resume with the job description." },
                    { role: "user", content: `Job Description: ${jobDescription}\nCandidate's resume: ${resumeText}` }
                ],
                max_tokens: 1000
            },
            {
                headers: {
                    Authorization: `Bearer ${OPENAI_API_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );
        return response.data.choices[0].message.content;
    } catch (error) {
        console.error("Error during analyzing resume:", error);
        throw new Error("Could not analyze resume");
    }
};
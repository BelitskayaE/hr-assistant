import React, { useState } from "react";
import { Button, Layout, Spin, Switch, message } from "antd";
import JobInput from "../components/JobInput.tsx";
import ResumeInput from "../components/ResumeInput.tsx";
import { analyzeResumeWithJobDescription, extractTextFromPDF } from "../utils/api.ts";
import { Resume } from "../types/index.ts";
import styled from "styled-components";
import ResultDisplay from "../components/ResultDisplay.tsx";


const { Content, Header } = Layout;


const StyledLayout = styled(Layout) <{ darkMode: boolean }>`
  min-height: 100vh;
  background-color: ${({ darkMode }) => (darkMode ? '#1E1E1E' : '#FFFFFF')};
`;

const StyledHeader = styled(Header) <{}>`
  background-color: #00576F;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledContent = styled(Content) <{ darkMode: boolean }>`
  padding: 40px;
  color: ${({ darkMode }) => (darkMode ? '#FFFFFF' : '#000000')};
`;

const FlexContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
`;

const StyledButton = styled(Button)`
  background-color: #424A66;
  border-color: #424A66;
  margin-bottom: 20px;
  color: white;
`;

const HomePage: React.FC = () => {
    const [jobDescription, setJobDescription] = useState("");
    const [resumes, setResumes] = useState<Resume[]>([]);
    const [loading, setLoading] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [analysisDone, setAnalysisDone] = useState(false);

    const handleFileUpload = async (files: File[]) => {
        setLoading(true);
        try {
            const parsedResumes = await Promise.all(
                files.map(async (file) => {
                    if (file.type !== "application/pdf") {
                        message.error(`${file.name} is not a PDF file`);
                        return null;
                    }
                    const textContent = await extractTextFromPDF(file);
                    return { fileName: file.name, textContent, matchPercentage: 0, recommendations: [] };
                })
            );
            setResumes(parsedResumes.filter(Boolean) as Resume[]);
        } catch (error) {
            message.error("Error uploading PDF");
        }

        //TEST WITH MOCKED DATA
        // try {
        //     setResumes(mockResumes);
        //     setAnalysisDone(true); // Сразу показать результат
        // } catch (error) {
        //     message.error("Error loading mock resumes");
        // }
        setLoading(false);
    };

    const handleAnalyze = async () => {
        setLoading(true);
        try {
            const analyzedResumes = await Promise.all(
                resumes.map(async (resume) => {
                    const analysis = await analyzeResumeWithJobDescription(jobDescription, resume.textContent);
                    const result = JSON.parse(analysis);
                    return { ...resume, matchPercentage: result.matchPercentage, recommendations: result.recommendations };
                })
            );
            setResumes(analyzedResumes);
            setAnalysisDone(true);
        } catch {
            message.error("Error analyzing resume");
        }
        setLoading(false);
    };

    return (
        <StyledLayout darkMode={darkMode}>
            <StyledHeader>
                Resume Evaluation
                <Switch checked={darkMode} onChange={setDarkMode} checkedChildren="Dark" unCheckedChildren="Light" />
            </StyledHeader>
            <StyledContent darkMode={darkMode}>
                <FlexContainer>
                    <JobInput jobDescription={jobDescription} darkMode={darkMode} onJobDescriptionChange={setJobDescription} />
                    <ResumeInput darkMode={darkMode} onFileUpload={handleFileUpload} />
                </FlexContainer>

                <StyledButton onClick={handleAnalyze} disabled={!jobDescription || !resumes.length}>
                    Evaluate All Resumes
                </StyledButton>

                {analysisDone && (
                    <ResultDisplay resumes={resumes} />
                )}
                {loading && <Spin />}
            </StyledContent>
        </StyledLayout>
    );
};

export default HomePage;

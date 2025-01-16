import React from "react";
import { Input } from "antd";
import styled from "styled-components";

interface JobInputProps {
    jobDescription: string;
    onJobDescriptionChange: (description: string) => void;
}

const StyledTextArea = styled(Input.TextArea) <{ darkMode: boolean }>`
  width: 100%;
  min-height: 200px;
  background-color: ${({ darkMode }) => (darkMode ? "#333" : "#fff")};
  color: ${({ darkMode }) => (darkMode ? "#fff" : "#000")};
  border: 1px solid ${({ darkMode }) => (darkMode ? "#555" : "#ccc")};
  font-family: 'Montserrat', sans-serif;

  &:hover, &:focus {
    background-color: ${({ darkMode }) => (darkMode ? "#333" : "#fff")};
  }
`;

const JobInput: React.FC<JobInputProps & { darkMode: boolean }> = ({ jobDescription, onJobDescriptionChange, darkMode }) => {
    return (
        <StyledTextArea
            darkMode={darkMode}
            value={jobDescription}
            onChange={(e) => onJobDescriptionChange(e.target.value)}
            placeholder="Enter job description here..."
        />
    );
};

export default JobInput;
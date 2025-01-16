import React from "react";
import { Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import styled from "styled-components";

interface ResumeInputProps {
    onFileUpload: (files: File[]) => void;
}

const { Dragger } = Upload;

const StyledDragger = styled(Dragger) <{ darkMode: boolean }>`
  background-color: ${({ darkMode }) => (darkMode ? "#333" : "#fff")};
  border: 2px dashed ${({ darkMode }) => (darkMode ? "#555" : "#d9d9d9")};
  color: ${({ darkMode }) => (darkMode ? "#fff" : "#000")};
  font-family: 'Montserrat', sans-serif;
`;

const ResumeInput: React.FC<ResumeInputProps & { darkMode: boolean }> = ({ onFileUpload, darkMode }) => {
    const props = {
        beforeUpload: (file: File) => {
            if (file.type !== "application/pdf") {
                message.error(`${file.name} is not a PDF file`);
                return Upload.LIST_IGNORE;
            }
            onFileUpload([file]);
            return false;
        },
        multiple: true
    };

    return (
        <StyledDragger {...props} darkMode={darkMode}>
            <p className="ant-upload-drag-icon">
                <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag PDF files to upload</p>
            <p className="ant-upload-hint">Only PDF files are supported.</p>
        </StyledDragger>
    );
};

export default ResumeInput;

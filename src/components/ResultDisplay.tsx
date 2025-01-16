import React from "react";
import { Card } from "antd";
import styled from "styled-components";
import { Resume } from "../types";

interface ResultDisplayProps {
    resumes: Resume[];

}

const StyledCard = styled(Card) <{}>`
  background-color: #5B8962;
  color: #fff;
  margin-bottom: 20px;
`;

const ResultDisplay: React.FC<ResultDisplayProps> = ({ resumes }) => {
    return (
        <div>
            {resumes
                .filter((resume) => resume.matchPercentage > 80)
                .map((resume) => (
                    <StyledCard key={resume.fileName} title={`Top Candidate: ${resume.fileName}`} bordered={false}>
                        <p><strong>Match Percentage:</strong> {resume.matchPercentage}%</p>
                        <p><strong>Recommendations:</strong> {resume.recommendations.join(", ")}</p>
                    </StyledCard>
                ))}
        </div>
    );
};

export default ResultDisplay;

export interface Resume {
    fileName: string;
    textContent: string;
    matchPercentage: number;
    recommendations: string[];
}

export interface ApiResponse {
    data: string;
    matchPercentage: number;
    recommendations: string[];
}
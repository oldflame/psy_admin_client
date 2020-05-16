export interface QuestionCategory {
    _id: string;
    name: string;
    description: string;
    isDeleted: boolean;
    responseType: string;
    startLabel: string;
    endLabel: string;
}
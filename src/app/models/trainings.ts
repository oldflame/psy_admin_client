export interface Training {
  _id: string;
  name: string;
  isDeleted: boolean;
  description: string;
  keywords: string[];
  scheduleFor: any;
  questionData: { question: string; order: number }[];
  imageData: { image: string; order: number }[];
}

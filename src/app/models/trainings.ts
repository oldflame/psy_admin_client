export interface Training {
  _id: string;
  trainingName: string;
  description: string;
  keywords: string[];
  scheduleFor: any;
  questionData: { question: string; order: number }[];
  imageData: { image: string; order: number }[];
}

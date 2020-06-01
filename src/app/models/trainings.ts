import { QuestionCategory } from './question-category';
import { Category } from './category';
export interface Training {
  _id: string;
  name: string;
  isDeleted: boolean;
  description: string;
  keywords: string[];
  scheduleFor: any;
  questionData: { category: QuestionCategory; order: number };
  createdAt: string;
  imageData: { category: Category; order: number; duration: number; imageType: number, imageTypeName?:string, quantity: number};
}

import { QuestionCategory } from "./question-category";
import { Category } from "./category";
import { TRAINING_ACTION_TYPE } from "../constants";
export interface Training {
  _id: string;
  name: string;
  isDeleted: boolean;
  description: string;
  keywords: string[];
  scheduleFor: any;
  questionData: {
    category: QuestionCategory;
    order: number;
    actionType?: TRAINING_ACTION_TYPE;
  }[];
  createdAt: string;
  imageData: {
    category: Category;
    order: number;
    duration: number;
    imageType: number;
    imageTypeName?: string;
    quantity: number;
    actionType?: TRAINING_ACTION_TYPE;
  }[];
}

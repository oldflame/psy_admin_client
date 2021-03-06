import { GENDER } from "../constants";
export interface RegisterAdminParams {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  mobile: string;
  gender: GENDER;
}

export interface AddLocationParams {
  name: string;
  code: string;
  description?: string;
  tags?: string[];
  address: string;
  city: string;
  state: string;
  pincode: string;
  mobile: string;
  email: string;
}

export interface AddImageCategoryParams {
  name: string;
  description?: string;
}

export interface AddCategoryParams {
  name: string;
  description: string;
  responseType: string;
  startLabel: string;
  endLabel: string;
}

export interface AddQuestionParams {
  name: string;
  description: string;
  questionCategory: string;
}

export interface AddTrainingParams {
  name: string;
  description: string;
  keywords: string[];
  scheduleFor: any;
  questionData: { question: string; order: number }[];
  imageData: { image: string; order: number }[];
}

export interface AddImageParams {
  name: string;
  description: string;
  tags: string[];
  category: string;
  intensity: number;
  imageType: number;
  fileType: string;
  fileName: string;
  content: string;
}

export interface AddTargetGroupsParams {
  name: string;
  description?: string;
  keywords?: string[];
  location:  string ;
  training: string ;
}

export interface AssignQuestionsToTrainings {
  _id: string;
  questionData: { questionCategory: string; order: number };
}

export interface AssignImagesToTrainings {
  _id: string;
  imageData: { imageCategory: string; order: number; duration: number; imageType: number };
}

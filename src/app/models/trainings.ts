export interface Training {
  _id: string;
  name: string;
  isDeleted: boolean;
  description: string;
  keywords: string[];
  scheduleFor: any;
  questionData: { questionCategory: string; order: number };
  imageData: { imageCategory: string; order: number; duration: number; imageType: number};
}

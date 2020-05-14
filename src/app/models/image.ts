import { Category } from './category';
export interface Image {
  _id: string;
  name: string;
  description: string;
  tags: string[];
  category: Category;
  intensity: any;
  imageType: any;
  fileName: string;
  url: string;
  isDeleted: boolean;
  createdAt: any;
}

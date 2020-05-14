export interface Image {
  _id: string;
  name: string;
  description: string;
  tags: string[];
  category: string;
  intensity: number;
  imageType: number;
  fileName: string;
  url: string;
  isDeleted: boolean;
  createdAt: any;
}

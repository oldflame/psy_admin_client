import { Training } from './trainings';
import { User } from 'src/app/models/user';
export interface TrainingSession {
    _id: string;
    userId: User;
    trainingId: Training;
    createdAt: any;
    updatedAt: any;
}
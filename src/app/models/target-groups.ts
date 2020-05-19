import {Training} from "./trainings";
import {Location} from "./location";
export interface TargetGroups {
    _id: string;
    name: string;
    description: string;
    keywords: string[];
    locationData: Location;
    trainingData: Training;
    isDeleted: any;
}

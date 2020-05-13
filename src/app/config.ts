import { environment } from 'src/environments/environment';

export const APP_SERVER_OPTIONS = {
  host: environment.HOST,
  port: environment.PORT,
};

export const FIREBASE_CONFIG = environment.firebase;
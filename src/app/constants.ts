export enum GENDER {
  MALE = "M",
  FEMALE = "F",
  OTHERS = "O",
}

export const AUTH_API = {
  LOGIN: "/api/login",
  REGISTER: "/api/register",
};

export const ADMIN_API = {
  GET_ALL_ADMINS: "/api/account/admin",
  APPROVE_ADMIN: "/api/account/admin/approveAdmin/{newAdminID}",
};

export const LOCATIONS_API = {
  GET_ACTIVE_LOCATIONS: "/api/account/location",
  ADD_LOCATION: "/api/account/location",
  DELETE_LOCATION: "/api/account/location/{locationID}",
};

export const IMAGES_API = {
  ADD_CATEGORY: "/api/account/imgCategory",
  GET_ACTIVE_CATEGORIES: "/api/account/imgCategory",
  DELETE_CATEGORY: "/api/account/imgCategory/{imageCategoryID}",
};
export const QUESTIONS_CATEGORY_API = {
  GET_ALL_QUESTION_CATEGORIES: "/api/account/questionsCategory",
  ADD_QUESTION_CATEGORY: "/api/account/addQuestionsCategory",
  DELETE_QUESTION_CATEGORY: "/api/account/deleteQuestionCategory/{questionCategoryId}",
};

export const QUESTIONS_API = {
  GET_ALL_QUESTIONS: "/api/account/questions",
  GET_QUESTIONS_FOR_CATEGORY: "/api/account/questions/{questioncategory}",
  ADD_QUESTION: "/api/account/addQuestion",
  DELETE_QUESTION: "/app/account/deleteQuestion/{questionId}",
};

export const TRAININGS_API = {
  GET_ALL_TRAININGS: "/api/account/trainings",
  ADD_TRAINING: "/api/account/addTraining",
  DELETE_TRAINING: "/api/account/deleteTraining/{trainingId}"
};

export enum HTTP_RESPONSE_STATUS {
  OK = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  SERVER_ERROR = 500,
}

export enum GENDER {
  MALE = "M",
  FEMALE = "F",
  OTHERS = "O",
}


export const AUTH_API = {
  LOGIN: "/api/login",
  REGISTER: "/api/register",
};

export const OVERVIEW_API = {
  GET_COUNTS: "/api/account/overview/counts"
}

export const ADMIN_API = {
  GET_ALL_ADMINS: "/api/account/admin",
  APPROVE_ADMIN: "/api/account/admin/approveAdmin/{newAdminID}",
};

export const LOCATIONS_API = {
  GET_ACTIVE_LOCATIONS: "/api/account/location",
  ADD_LOCATION: "/api/account/location",
  DELETE_LOCATION: "/api/account/deleteLocation/{locationID}/{doRestore}",
  GET_ALL_LOCATIONS:"/api/account/location/all",
};

export const IMAGES_API = {
  ADD_CATEGORY: "/api/account/imgCategory",
  GET_ACTIVE_CATEGORIES: "/api/account/imgCategory",
  GET_ALL_CATEGORIES: "/api/account/imgCategory/all",
  DELETE_CATEGORY: "/api/account/imgCategory/{imageCategoryID}/{doRestore}",
  GET_ALL_IMAGES: "/api/account/images/all/{skip}/{limit}",
  ADD_IMAGE: "/api/account/images",
  DELETE_IMAGE: "/api/account/images/{imageID}/{doRestore}",
};
export const QUESTIONS_CATEGORY_API = {
  GET_ALL_QUESTION_CATEGORIES: "/api/account/questionsCategory",
  ADD_QUESTION_CATEGORY: "/api/account/addQuestionsCategory",
  DELETE_QUESTION_CATEGORY:
    "/api/account/deleteQuestionCategory/{questionCategoryId}/{doRestore}",
};

export const QUESTIONS_API = {
  GET_ALL_QUESTIONS: "/api/account/questions",
  GET_QUESTIONS_FOR_CATEGORY: "/api/account/questions/{questioncategory}",
  ADD_QUESTION: "/api/account/addQuestion",
  DELETE_QUESTION: "/app/account/deleteQuestion/{questionId}/{doRestore}",
};

export const TRAININGS_API = {
  GET_ALL_TRAININGS: "/api/account/getAllTrainings",
  ADD_TRAINING: "/api/account/addTraining",
  DELETE_TRAINING: "/api/account/deleteTraining/{trainingId}/{doRestore}"
};

export const TARGET_GROUPS_API = {
  GET_ALL_TARGET_GROUPS: "/api/account/targetGroups/all",
  GET_ACTIVE_TARGET_GROUPS: "/api/account/targetGroups",
  ADD_TARGET_GROUP: "/api/account/addTargetGroups",
  DELETE_TARGET_GROUP: "/api/account/deleteTargetGroups/{targetGroupID}/{doRestore}",
  ASSIGN_TRAINING: "/api/account/targetGroups/assignTraining/:targetGroupID/{trainingID}"
}

export enum HTTP_RESPONSE_STATUS {
  OK = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  SERVER_ERROR = 500,
}

export const IMAGE_INTENSITY_OPTIONS = [
  {
    viewValue: "5 - Very High",
    value: 5,
  },
  {
    viewValue: "4 - High",
    value: 4,
  },
  {
    viewValue: "3 - Normal",
    value: 3,
  },
  {
    viewValue: "2 - Low",
    value: 2,
  },
  {
    viewValue: "1 - Very Low",
    value: 1,
  },
];

export const IMAGE_TYPE_OPTIONS = [
  {
    viewValue: "Positive",
    value: 1,
  },
  {
    viewValue: "Neutral",
    value: 0,
  },
  {
    viewValue: "Negative",
    value: -1,
  }
];

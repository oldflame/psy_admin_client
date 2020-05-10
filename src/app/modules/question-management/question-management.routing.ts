import { Routes } from "@angular/router";
import { QuestionsComponent } from "./questions/questions.component";
import { CategoriesComponent } from "./categories/categories.component";

export const QuestionManagementRoutes: Routes = [
  {
    path: "",
    redirectTo: "questions",
  },
  {
    path: "questions",
    children: [
      {
        path: "",
        component: QuestionsComponent,
      },
    ],
  },
  {
    path: "categories",
    children: [
      {
        path: "",
        component: CategoriesComponent,
      },
    ],
  },
];

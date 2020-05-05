import { QuestionsComponent } from "./questions.component";
import { Routes } from "@angular/router";
import { AddQuestionsComponent } from "./add-questions/add-questions.component";

export const QuestionsRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: QuestionsComponent,
      },
    ],
  },
  {
    path: "add",
    children: [
      {
        path: "",
        component: AddQuestionsComponent,
      },
    ],
  },
];

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionsComponent } from './questions.component';
import { AddQuestionsComponent } from './add-questions/add-questions.component';
import { RouterModule } from '@angular/router';
import { QuestionsRoutes } from './questions.routing';



@NgModule({
  declarations: [QuestionsComponent, AddQuestionsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(QuestionsRoutes)
  ]
})
export class QuestionsModule { }

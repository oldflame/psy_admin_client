import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  constructor(private dataService: DataService) { }

  getQuestions() {
    this.dataService.sendGET('');
  }
}

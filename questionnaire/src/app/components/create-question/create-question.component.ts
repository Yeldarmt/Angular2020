import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import {IQuestion} from '../../types';

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.scss']
})
export class CreateQuestionComponent implements OnInit {
  constructor(private cookieService: CookieService) { }
  questionsList: IQuestion[] = [];
  answersList: string[] = [];

  questionCtrl = new FormControl('', [Validators.required]);
  selectCtrl = new FormControl(0, [Validators.required]);
  answerCtrl = new FormControl('', [Validators.required]);
  answerForm = new FormGroup({
    answer: this.answerCtrl,
  });
  questionForm = new FormGroup({
    question: this.questionCtrl,
    select: this.selectCtrl,
  });
  ngOnInit(): void {
    // get
  }

  addAnswer() {
    this.answersList.push(this.answerCtrl.value);
    this.answerCtrl.setValue('');
    // console.log('list: ', this.answersList);
  }
  removeAnswer(answer: string) {
    this.answersList = this.answersList.filter((n: string) => n !== answer);
  }
  addQuestion() {
    const q: IQuestion = {
      text: this.questionCtrl.value,
      type: this.selectCtrl.value,
      answers: this.answersList,
    };
    this.questionsList.push(q);
    this.questionCtrl.setValue('');
    this.selectCtrl.setValue(0);
    this.answersList = [];
    // set
    console.log('QQQ: ', this.questionsList);
  }

}

import { Component, OnInit } from '@angular/core';
import {MainService} from '../main.service';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {
  constructor(private mainService: MainService) { }
  public firstNum = '';
  public secondNum = '';
  public currentNum = '';
  public clickedOperation = '';
  public text = '';
  public isOperationClicked = false;
  public isEqualClicked = false;

  ngOnInit(): void {
  }
  calcBasicOperation = () => {
    if (this.clickedOperation === '+') {
      return this.mainService.plusOperation(this.firstNum, this.secondNum);
    }
    if (this.clickedOperation === '-') {
      return this.mainService.minusOperation(this.firstNum, this.secondNum);
    }
    if (this.clickedOperation === '÷') {
      return this.mainService.divideOperation(this.firstNum, this.secondNum);
    }
    if (this.clickedOperation === 'x') {
      return this.mainService.multiplyOperation(this.firstNum, this.secondNum);
    }
  }
  calcAdditionalOperation = (op: string) => {
    let res = 0;
    if (op === '%') {
      res = this.mainService.percentOperation(this.firstNum);
    }
    if (op === '√') {
      res = this.mainService.sqrtOperation(this.firstNum);
    }
    if (op === 'x^2') {
      res = this.mainService.sqrOperation(this.firstNum);
    }
    if (op === '1/x') {
      res = this.mainService.oneDivToNumOperation(this.firstNum);
    }
    console.log(op, res);
    this.text = res.toString();
    this.firstNum = res.toString();
    this.currentNum = res.toString();
  }
  clickReverseNum() {
    console.log('clickReverseNum', this.currentNum);
    if (this.secondNum === this.currentNum) {
      this.secondNum = (parseFloat(this.secondNum) * -1).toString();
      this.currentNum = this.secondNum;
      this.text = this.mainService.putBrackets(this.firstNum) + this.clickedOperation + this.mainService.putBrackets(this.secondNum);
    }
    else if (this.firstNum === this.currentNum) {
      if (this.clickedOperation === '') {
        this.firstNum = (parseFloat(this.firstNum) * -1).toString();
        this.currentNum = this.firstNum;
        this.text = this.mainService.putBrackets(this.firstNum);
      }
    }
  }
  onClickNumber = (num: number) => {
    if (this.clickedOperation === '') {
      if (this.firstNum.length === 1 && this.firstNum === '0') {
        this.firstNum = num.toString();
      } else {
        this.firstNum += num.toString();
      }
      this.text = this.firstNum;
      this.currentNum = this.firstNum;
    } else {
      if (this.secondNum.length === 1 && this.secondNum === '0') {
        this.secondNum = num.toString();
        this.text = this.text.substring(0, this.text.length - 1) + num.toString();
      } else {
        this.secondNum += num.toString();
        this.text += num.toString();
      }
      this.currentNum = this.secondNum;
    }
  }
  onClickOperation = (operation: string) => {
    console.log('eq', this.isEqualClicked);
    if (this.isEqualClicked) {
      this.text = this.mainService.putBrackets(this.firstNum);
      this.isEqualClicked = false;
    }
    if (this.clickedOperation === '') {
      this.clickedOperation = operation;
      this.text += operation;
    } else {
      if (this.secondNum === '') {
        this.clickedOperation = operation;
        this.text = this.text.substring(0, this.text.length - 1) + operation;
      } else {
        this.firstNum = (this.calcBasicOperation()).toString();
        this.text = this.firstNum + operation;
        console.log('fN', this.firstNum);
        this.secondNum = '';
        this.clickedOperation = operation;
      }
    }
    this.secondNum = '';
  }
  onClickEqual = () => {
    console.log('firstNum: ', this.firstNum);
    console.log('operation: ', this.clickedOperation);
    console.log('secondNum: ', this.secondNum);
    const res = this.calcBasicOperation();
    this.text += '=';
    this.firstNum = res.toString();
    this.currentNum = res.toString();
    this.isEqualClicked = true;
    this.clickedOperation = '';
  }
  isExistDot = (numText: string) => {
    return numText.includes('.');
  }
  onClickDot = () => {
    let existBool: boolean;
    if (this.currentNum.length > 0) {
      existBool = this.isExistDot(this.currentNum);
    }
    if (existBool === false) {
      if (this.clickedOperation === '') {
        this.firstNum += '.';
        this.text = this.firstNum;
        this.currentNum = this.firstNum;
      } else {
        this.secondNum += '.';
        this.text += '.';
        this.currentNum = this.secondNum;
      }
    }
  }
  checkMinusLastDigit(str: string) {
    return str.length === 2 && str.includes('-');
  }
  onBackSpaceClick() {
    if (this.clickedOperation) {
      if (this.secondNum) {
        console.log('secondNumBefore: ', this.secondNum);
        const boolCheck = this.checkMinusLastDigit(this.secondNum);
        console.log('boolCheck', boolCheck);
        if (boolCheck === true) {
          this.secondNum = '';
          this.currentNum = '';
          this.text = this.mainService.putBrackets(this.firstNum) + this.clickedOperation;
        } else {
          this.secondNum = this.secondNum.slice(0, -1);
          this.currentNum = this.secondNum;
          this.text = this.mainService.putBrackets(this.firstNum) + this.clickedOperation + this.mainService.putBrackets(this.secondNum);
        }
        console.log('secondNumAfter: ', this.secondNum);
      } else {
        this.text = this.text.substring(0, this.text.length - this.clickedOperation.length);
        this.clickedOperation = '';
      }
    } else {
      console.log('firstNumBefore: ', this.firstNum);
      const boolCheck = this.checkMinusLastDigit(this.firstNum);
      console.log('boolCheck', boolCheck);
      if (boolCheck === true) {
        this.onClearClick();
      } else {
        this.firstNum = this.firstNum.slice(0, -1);
        this.currentNum = this.firstNum;
        this.text = this.mainService.putBrackets(this.firstNum);
      }
      console.log('firstNumAfter: ', this.firstNum);
    }
  }
  onClearEntryClick() {
    if (this.clickedOperation) {
      if (this.secondNum) {
        if (parseFloat(this.secondNum) < 0) {
          this.text = this.text.substring(0, this.text.length - this.secondNum.length - 2);
        } else {
          this.text = this.text.substring(0, this.text.length - this.secondNum.length);
        }
        this.secondNum = '';
        this.currentNum = '';
      } else {
        this.text = this.text.substring(0, this.text.length - this.clickedOperation.length);
        this.clickedOperation = '';
      }
    } else {
      this.onClearClick();
    }
  }
  onClearClick = () => {
    this.firstNum = '';
    this.secondNum = '';
    this.clickedOperation = '';
    this.text = '';
    this.isOperationClicked = false;
    this.currentNum = '';
  }


}

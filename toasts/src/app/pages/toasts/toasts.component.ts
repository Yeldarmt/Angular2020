import { Component, OnInit } from '@angular/core';
import {ToastService} from '../../services/toast.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ProgressBarMode} from '@angular/material/progress-bar';

@Component({
  selector: 'app-toasts',
  templateUrl: './toasts.component.html',
  styleUrls: ['./toasts.component.scss']
})
export class ToastsComponent implements OnInit {
  constructor(private toastService: ToastService) { }
  value = 5;
  titleCtrl = new FormControl('');
  contentCtrl = new FormControl('', [Validators.required]);
  createForm = new FormGroup({
    title: this.titleCtrl,
    content: this.contentCtrl,
  });
  selectCtrl = new FormControl(0, [Validators.required]);
  verticalCtrl = new FormControl('0px', [Validators.required]);
  horizontalCtrl = new FormControl('0px', [Validators.required]);
  showTitleCtrl = new FormControl(true, [Validators.required]);
  hasCloseBtnCtrl = new FormControl(true, [Validators.required]);
  showDurationCtrl = new FormControl(true, [Validators.required]);

  ngOnInit(): void {
  }

  createToast() {
    console.log('createToastValues', this.titleCtrl.value, this.contentCtrl.value);
    this.toastService.alert(
      {
        title: this.titleCtrl.value,
        content: this.contentCtrl.value,
        isSuccess: this.selectCtrl.value,
        marginY: this.verticalCtrl.value,
        marginX: this.horizontalCtrl.value,
        showTitle: this.showTitleCtrl.value,
        hasCloseBtn: this.hasCloseBtnCtrl.value,
        showDuration: this.showDurationCtrl.value,
        duration: this.value,
      });
  }

}

import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

import { OverlayService } from '../../neo-akinator-overlay.service';
import { AkinatorService } from '../../akinator-root/akinator-root.service';
import * as AkinatorUtil from '../../neo-akinator-util';


@Component({
  selector: 'app-add-character-question',
  templateUrl: './add-character-question.component.html',
  styleUrls: ['./add-character-question.component.scss']
})
export class AddCharacterQuestionComponent implements OnInit {

  /** コントロール. */
  myControl: FormGroup;

  /** 処理中フラグ. */
  isProcessiong: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogInput,
    public dialogRef: MatDialogRef<AddCharacterQuestionComponent>,
    private fb: FormBuilder,
    private overlayService: OverlayService,
    private service: AkinatorService,
  ) {
    this.myControl = this.fb.group({
      text: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
  }

  buttoonClick(): void {
    this.isProcessiong = true;
    this.overlayService.attach();
    const callBack = () => {
      this.isProcessiong = false;
      this.overlayService.detach();
      this.dialogRef.close();
    }
    const value = this.myControl.controls.text.value;

    if (
      !AkinatorUtil.isValid(this.data)
      || AkinatorUtil.isEmpty(value)
    ) {
      callBack();
    }

    switch(this.data.dialogType) {
      case '0':
        this.service.createCharacter({
          character_name: value,
          img_url: null
        }).subscribe(
          data => {
            callBack();
          }, () => {
            callBack();
          }
        )
        break;
      case '1':
        this.service.createQuestion({
          question_detail: value
        }).subscribe(
          data => {
            callBack();
          }, () => {
            callBack();
          }
        )
        break;
      default:
        callBack();
    }
  }

}

/** ダイアログインプットインターフェース. */
export interface DialogInput {
  /** タイプ. */
  dialogType: string;
}




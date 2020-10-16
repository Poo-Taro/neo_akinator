import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { MatDialog } from '@angular/material/dialog';

import * as AkinatorUtil from '../neo-akinator-util';

import {
  GetQuestionResult,
  Character,
  Question
} from '../akinator-root/akinator-root.model';
import { AkinatorService } from '../akinator-root/akinator-root.service';
import { OverlayService } from '../neo-akinator-overlay.service';
import { AddCharacterQuestionComponent } from './add-character-question/add-character-question.component';


import {
  AkinatorButtonSizeType,
  AkinatorButtonType
} from '../akinator-button/akinator-button.model';

@Component({
  selector: 'app-akinator-answer',
  templateUrl: './akinator-answer.component.html',
  styleUrls: ['./akinator-answer.component.scss']
})
export class AkinatorAnswerComponent implements OnInit {

  /** ボタンサイズタイプ. */
  readonly buttonSizeType: AkinatorButtonSizeType = AkinatorButtonSizeType.CUSTOM;

  /** ボタンクリックイベントエミッタ. */
  @Output() akinatorButtonClick: EventEmitter<number>;

  /** 質問情報. */
  @Input() questionInfo: GetQuestionResult;

  /** コントロール. */
  myControl: FormGroup;

  /** キャラクタリスト. */
  characterList: Character[];

  /** 画面コード. */
  screenCd: string;

  /** キャラクタアイコンクラス. */
  characterClass: string;

  /** 処理中フラグ. */
  isProcessing: boolean;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private router: Router,
    private service: AkinatorService,
    private overlayService: OverlayService
  ) {
    this.myControl = this.fb.group({
      characterName: new FormControl('', [Validators.required])
    });
    this.akinatorButtonClick = new EventEmitter<number>();
    this.characterList = [];
  }

  ngOnInit(): void {
    this.characterClass = 'character-1';
    this.screenCd = '0'
  }

  /**
   * 回答ボタンクリック.
   *
   * @param buttonType ボタンタイプ
   */
  answerButtonClick(buttonType: AkinatorButtonType): void {
    this.isProcessing = true;
    this.overlayService.attach();
    const callBack = () => {
      this.isProcessing = false;
      this.overlayService.detach();
    }

    if (buttonType === AkinatorButtonType.YES) {
      if (AkinatorUtil.inValid(this.questionInfo)) {
        callBack();
        return;
      }
      this.updateAnswer(
        this.questionInfo.mstcharacter_id,
        this.questionInfo.questions,
        () => {
          callBack();
          this.screenCd = '1';
        }
      );
    } else if (buttonType === AkinatorButtonType.NO) {
      this.screenCd = '2';
      callBack();
    }
  }

  /**
   * 新質問追加.
   *
   * @param buttonType ボタンタイプ
   */
  newQuestionButtonClick(buttonType: AkinatorButtonType): void {
    switch(buttonType) {
      case AkinatorButtonType.YES:
        this.showAddQuestionDialog();
        break;
      case AkinatorButtonType.NO:
        this.router.navigate(['/akinator/akinator-navigate']);
        break;
      default:
        this.router.navigate(['/akinator/akinator-navigate']);
    }
  }

  /** キャラクタ検索. */
  searchCharacter(): void {
    const value = this.myControl.controls.characterName.value;
    if (AkinatorUtil.isNotEmpty(value)) {
      this.service.searchCharacter({
        character_name: value
      }).subscribe(data => {
        if (AkinatorUtil.isValid(data && data['character_list'])) {
          this.characterList = data['character_list'];
        }
      })
    }
  }

  /** 質問追加ダイアログ表示. */
  showAddQuestionDialog(): void {
    const dialogRef = this.dialog.open(
      AddCharacterQuestionComponent,
      {
        height: '200px',
        width: '500px',
        data: {
          dialogType: '1'
        }
      }
    );
    dialogRef.afterClosed().subscribe(
      result => {
        this.router.navigate(['/akinator/akinator-navigate']);
      }
    );
  }

  /** キャラクタ追加ダイアログ表示. */
  showAddCharacterDialog(): void {
    const dialogRef = this.dialog.open(
      AddCharacterQuestionComponent,
      {
        height: '200px',
        width: '500px',
        data: {
          dialogType: '0'
        }
      }
    );
    dialogRef.afterClosed().subscribe(
      result => {
        this.router.navigate(['/akinator/akinator-navigate']);
      }
    );
  }

  /**
   * キャラクタボタンクリック.
   *
   * @param mstCharacterId キャラクタマスタID
   */
  characterButtonClick(mstCharacterId: number): void {
    this.isProcessing = true;
    this.overlayService.attach();
    const callBack = () => {
      this.isProcessing = false;
      this.overlayService.detach();
      this.router.navigate(['/akinator/akinator-navigate']);
    }

    if (AkinatorUtil.isValid(this.questionInfo)) {
      this.updateAnswer(
        mstCharacterId,
        this.questionInfo.questions,
        callBack
      );
    } else {
      callBack();
    }
  }

  /**
   * 回答更新.
   *
   * @param mstCharacterId キャラクタマスタID
   * @param questions 質問リスト
   * @param callBack コールバック
   */
  private updateAnswer(
    mstCharacterId: number,
    $questions: Question[],
    callBack: () => void
  ): void {
    this.service.updateAnswers({
      mstcharacter_id: mstCharacterId,
      questions: $questions
    }).subscribe(
      data => {
        callBack();
      }, () => {
        callBack();
      }
    );
  }

}

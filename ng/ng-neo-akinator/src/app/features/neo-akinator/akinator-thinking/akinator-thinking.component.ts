import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import {
  AkinatorButtonSizeType,
  AkinatorButtonType
} from '../akinator-button/akinator-button.model';

import * as AkinatorUtil from '../neo-akinator-util';


@Component({
  selector: 'app-akinator-thinking',
  templateUrl: './akinator-thinking.component.html',
  styleUrls: ['./akinator-thinking.component.scss']
})
export class AkinatorThinkingComponent implements OnInit {

  /** ボタンクリックイベントエミッタ. */
  @Output() akinatorButtonClick: EventEmitter<number>;

  /** ボタンサイズタイプ. */
  readonly buttonSizeType: AkinatorButtonSizeType = AkinatorButtonSizeType.CUSTOM;

  /** キャラクタアイコンクラス. */
  characterClass: string;

  /** 質問内容. */
  @Input() question: string;

  constructor() {
    this.akinatorButtonClick = new EventEmitter<number>();
  }

  ngOnInit(): void {
    this.characterClass = AkinatorUtil.getCharacterStyleClass();
  }

  /**
   * ボタンクリック.
   *
   * @param buttonType ボタンタイプ
   */
  buttonClick(buttonType: AkinatorButtonType): void {
    let buttonScore = 0.0;
    switch(buttonType) {
      case AkinatorButtonType.YES:
        buttonScore = 1.0;
        break;
      case AkinatorButtonType.NO:
        buttonScore = 0.5;
        break;
      case AkinatorButtonType.DO_NOT_UNDERSTAND:
        // do nothing
        break;
      case AkinatorButtonType.MAYBE_YES:
        buttonScore = -0.5;
        break;
      case AkinatorButtonType.MAYBE_DIFFERENT:
        buttonScore = -1.0;
        break;
      default:
        // do nothing
    }
    this.akinatorButtonClick.emit(buttonScore);
    this.characterClass = AkinatorUtil.getCharacterStyleClass();
  }

}

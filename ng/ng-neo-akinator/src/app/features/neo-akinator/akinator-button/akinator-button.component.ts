import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import {
  AkinatorButtonType,
  AkinatorButtonSizeType
} from './akinator-button.model';

@Component({
  selector: 'app-akinator-button',
  templateUrl: './akinator-button.component.html',
  styleUrls: ['./akinator-button.component.scss']
})
export class AkinatorButtonComponent implements OnInit {

  /** ボタンクリックイベントエミッタ. */
  @Output() akinatorButtonClick: EventEmitter<AkinatorButtonType>;

  /** ボタンタイプ. */
  @Input() akinatorButtonType: AkinatorButtonType;

  /** ボタンサイズタイプ. */
  @Input() akinatorButtonSizeType: AkinatorButtonSizeType;

  /** 処理中フラグ. */
  isProcessing: boolean;

  constructor() {
    this.akinatorButtonClick = new EventEmitter<AkinatorButtonType>();
  }

  ngOnInit(): void {}

  buttonClick(): void {
    this.isProcessing = true;
    this.akinatorButtonClick.emit(this.akinatorButtonType);
    this.isProcessing = false;
  }
}

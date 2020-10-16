/**
 * アキネータートップコンポーネント.
 *
 * created on 2020/03/29
 * @author Taro Suzuki
 */
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-akinator-top',
  templateUrl: './akinator-top.component.html',
  styleUrls: ['./akinator-top.component.scss']
})
export class AkinatorTopComponent implements OnInit {

  private static readonly CHARACTOR_SRC = '../../../../assets/image/character/akinator.png';

  /**
   * プレイ開始イベントエミッタ.
   */
  @Output() playStart: EventEmitter<any>;

  constructor() {
    this.playStart = new EventEmitter<any>();
  }

  ngOnInit(): void {
  }

  /**
   * プレイボタンクリックイベント.
   */
  clickPlayButton(): void {
    this.playStart.emit();
  }

}

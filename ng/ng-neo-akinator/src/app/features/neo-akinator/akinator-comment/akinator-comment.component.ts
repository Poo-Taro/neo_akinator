/**
 * アキネーターコメントコンポーネント.
 *
 * created on 2020/03/29
 * @author Taro Suzuki
 */

import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-akinator-comment',
  templateUrl: './akinator-comment.component.html',
  styleUrls: ['./akinator-comment.component.scss']
})
export class AkinatorCommentComponent implements OnInit {

  /**
   * 横幅.
   */
  @Input() commentWidth: string;

  /**
   * 立幅.
   */
  @Input() commentHeight: string;

  /**
   * コメント.
   */
  @Input() comment: string;

  /**
   * コメントタイプ.
   */
  @Input() commentType: string;


  constructor() { }

  ngOnInit(): void {
  }

}

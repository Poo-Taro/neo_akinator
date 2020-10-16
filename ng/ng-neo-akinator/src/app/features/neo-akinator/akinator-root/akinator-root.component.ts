/**
 * アキネータールートコンポーネント.
 *
 * created on 2020/03/29
 * @author Taro Suzuki
 */
import { Component, OnInit } from '@angular/core';

import {
  ScreenType,
  GetQuestionRequest,
  GetQuestionResult,
  Question
} from './akinator-root.model';
import { AkinatorService } from './akinator-root.service';
import { OverlayService } from '../neo-akinator-overlay.service';


@Component({
  selector: 'app-akinator-root',
  templateUrl: './akinator-root.component.html',
  styleUrls: ['./akinator-root.component.scss']
})
export class AkinatorRootComponent implements OnInit {

  /** 画面タイプ. */
  screenType: string;

  /** 質問内容. */
  questionInfo: GetQuestionResult;

  constructor(
    private service: AkinatorService,
    private overlayService: OverlayService,
  ) { }

  ngOnInit(): void {
    this.screenType = ScreenType.TOP;
    this.questionInfo = {
      // 回答フラグ
      answer_flg: null,
      // キャラクタマスタID
      mstcharacter_id: null,
      // キャラクタ名称
      character_name: null,
      // 新質問id
      new_question_id: null,
      // 新質問スコア
      new_question_accuracy_score: null,
      // 質問内容
      question_content: null,
      // 質問リスト
      questions: []
    };
  }

  /**
   * プレイスタート.
   */
  playStart(): void {
    this.screenType = ScreenType.THINKING;
    this.getQuestion();
  }

  getQuestionAnswer(answer: number): void {
    this.questionInfo.questions.forEach((q: Question) => {
      if (q.key === `q_${this.questionInfo.new_question_id}`) {
        q.value = answer;
      }
    });
    this.getQuestion();
  }


  private getQuestion(): void {
    this.overlayService.attach();
    const inputData: GetQuestionRequest = {questions: this.questionInfo.questions};
    this.service.getQuestion(inputData).subscribe(
      (data: GetQuestionResult) =>{
        this.questionInfo = data;
        if (data.answer_flg === '1') this.screenType = ScreenType.ANSWER;
        this.overlayService.detach();
      }, () => {
        this.overlayService.detach();
      }
    );
  }

}

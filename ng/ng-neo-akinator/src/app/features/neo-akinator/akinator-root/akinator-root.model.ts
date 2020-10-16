/**
 * アキネータールートモデル.
 *
 * created on 2020/04/08
 * @author Taro Suzuki
 */

import { AkinatorDefine } from '../neo-akinator-define';


export class RequestUrls {
  /** 質問内容取得. */
  static readonly GET_QUESTION = `${AkinatorDefine.URL_TOP}get-question/`;
  /** 回答更新. */
  static readonly UPDATE_QUESTION = `${AkinatorDefine.URL_TOP}update-anwers/`;
  /** キャラクタ作成. */
  static readonly CREATE_CHARACTER = `${AkinatorDefine.URL_TOP}create-character/`;
  /** 質問作成. */
  static readonly CREATE_QUESTION = `${AkinatorDefine.URL_TOP}create-question/`;
  /** キャラクタ検索. */
  static readonly SEARCH_CHARACTER = `${AkinatorDefine.URL_TOP}search-character/`;
}


/** 質問取得リクエストインターフェース. */
export interface GetQuestionRequest {
  /** 質問リスト. */
  questions: Question[];
}

/** 回答更新リクエストインターフェース. */
export interface UpdateAnswers {
  /** 質問リスト. */
  questions: Question[];
  /** キャラクタマスタID. */
  mstcharacter_id: number;
}

/** キャラクタ作成リクエストインターフェース. */
export interface CreateCharacterRequest {
  /** キャラクタ名. */
  character_name: string;
  /** 画像url. */
  img_url: string;
}

/** 質問作成リクエストインターフェース. */
export interface CreateQuestionRequest {
  /** 質問内容. */
  question_detail: string;
}

/** キャラクタ検索リクエストインターフェース. */
export interface SearchCharacterRequest {
  /** キャラクタ名. */
  character_name: string;
}

/** 質問インターフェース. */
export interface Question {
  key: string;
  value: number;
}

/** 質問取得返却結果インターフェース. */
export interface GetQuestionResult {
  /** 回答フラグ. */
  answer_flg: string;
  /** キャラクタマスタID. */
  mstcharacter_id: number;
  /** キャラクタ名称. */
  character_name: string;
  /** 新質問id. */
  new_question_id: number;
  /** 新質問スコア. */
  new_question_accuracy_score: number;
  /** 質問内容. */
  question_content: string;
  /** 質問リスト. */
  questions: Question[];
}

/** キャラクタリストアイテムインターフェース. */
export interface Character {
  /** キャラクタマスタID. */
  mstcharacter_id: number;
  /** キャラクタ名称. */
  character_name: number;
  /** 画像url. */
  img_url: string;
}

/**
 * 画面タイプ定数クラス.
 */
export class ScreenType {
  /** 画面タイプ : トップ. */
  static readonly TOP = '0';
  /** 画面タイプ : シンキング. */
  static readonly THINKING = '1';
  /** 画面タイプ : 回答. */
  static readonly ANSWER = '2';
}


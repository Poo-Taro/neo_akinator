/**
 * アキネーターサービス.
 *
 * created on 2020/05/28
 * @author Taro Suzuki
 *
 */


import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  RequestUrls,
  GetQuestionRequest,
  UpdateAnswers,
  CreateCharacterRequest,
  CreateQuestionRequest,
  SearchCharacterRequest
} from './akinator-root.model';


@Injectable({
  providedIn: 'root'
})
export class AkinatorService {

  constructor(private http: HttpClient) {}

  /**
   * 質問内容取得
   *
   * @param inputData リクエストデータ
   * @return 検索結果
   */
  getQuestion(inputData: GetQuestionRequest): Observable<any> {
    return this.commonDoSearch(RequestUrls.GET_QUESTION, inputData);
  }

  /**
   * 質問更新.
   *
   * @param inputData リクエストデータ
   * @return 更新結果
   */
  updateAnswers(inputData: UpdateAnswers): Observable<any> {
    return this.commonDoUpdate(RequestUrls.UPDATE_QUESTION, inputData)
  }

  /**
   * キャラクタ登録.
   *
   * @param inputData リクエストデータ
   * @return 登録結果
   */
  createCharacter(inputData: CreateCharacterRequest): Observable<any> {
    return this.commonDoInsert(RequestUrls.CREATE_CHARACTER, inputData);
  }

  /**
   * 質問登録.
   *
   * @param inputData リクエストデータ
   * @return 登録結果
   */
  createQuestion(inputData: CreateQuestionRequest): Observable<any> {
    return this.commonDoInsert(RequestUrls.CREATE_QUESTION, inputData);
  }

  /**
   * キャラクタ検索.
   *
   * @param inputData インプットデータ
   * @return 検索結果
   */
  searchCharacter(inputData: SearchCharacterRequest): Observable<any> {
    return this.commonDoSearch(RequestUrls.SEARCH_CHARACTER, inputData);
  }

  /**
   * 検索共通ロジック.
   *
   * @param url リクエストurl
   * @param inputData インプットデータ
   * @return 検索結果
   */
  private commonDoSearch(url: string, inputData: any): Observable<any> {
    return this.http.post(url, inputData).pipe(map(response => response));
  }

  /**
   * 登録共通ロジック.
   *
   * @param url リクエストurl
   * @param inputData インプットデータ
   * @return 登録結果
   */
  private commonDoInsert(url: string, inputData: any): Observable<any> {
    return this.http.post(url, inputData).pipe(map(response => response));
  }

  /**
   * 更新共通ロジック.
   *
   * @param url リクエストurl
   * @param inputData インプットデータ
   * @return 更新結果
   */
  private commonDoUpdate(url: string, inputData: any): Observable<any> {
    return this.http.post(url, inputData).pipe(map(response => response));
  }

}





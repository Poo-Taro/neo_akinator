/**
 * 共通ロジック.
 *
 * created on 2020/05/02
 * @author Taro Suzuki
 */


/**
 * 有効値チェック.
 *
 * @param val チェック対象の値
 * @return チェック結果(有効値の場合true)
 */
export function isValid(val: any): boolean {
  return (val !== undefined && val !== null);
}

/**
 * 無効値チェック.
 *
 * @param val チェック対象の値
 * @return チェック結果(無効値の場合true)
 */
export function isNotValid(val: any): boolean {
  return (val === undefined || val === null);
}





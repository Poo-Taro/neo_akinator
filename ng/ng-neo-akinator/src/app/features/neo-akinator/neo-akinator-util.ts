/**
 * アキネーター共通ロジック.
 *
 * created on 2020/05/29
 * @author Taro Suzuki
 */



/**
 * 有効値チェック.
 *
 * @param val 検査値
 * @return チェック結果
 */
export function isValid(val: any): boolean {
  return (val !== null || val !== undefined);
}

/**
 * 無効値チェック.
 *
 * @param val 検査値
 * @return チェック結果
 */
export function inValid(val: any): boolean {
  return (val === null || val === undefined);
}


/**
 * 空値チェック.
 *
 * @param val 検査値
 * @return チェック結果
 */
export function isEmpty(val: string | Array<any>): boolean {
  return (
    inValid(val)
    || (((typeof val) === 'string') && (val === ''))
    || ((Array.isArray(val)) && (val.length === 0))
  );
}

/**
 * 有効値チェック.
 *
 * @param val 検査値
 * @return チェック結果
 */
export function isNotEmpty(val: string | Array<any>): boolean {
  return (
    isValid(val)
    && ((((typeof val) === 'string') && (val !== ''))
    || ((Array.isArray(val)) && (val.length > 0)))
  );
}


/**
 * キャラクタスタイルクラス取得.
 *
 * @return キャラクタスタイルクラス
 */
export function getCharacterStyleClass(): string {
  const min = 1;
  const max = 6;

  const a = Math.floor( Math.random() * (max + 1 - min) ) + min ;

  return `character-${a}`
}




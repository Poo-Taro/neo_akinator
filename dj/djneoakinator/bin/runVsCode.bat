@echo off

rem ローカルDB接続情報を環境変数に設定。settings.pyで使用する
rem set X_DB_URI=postgres://gnav03:gnav03P9ssw0rd@localhost:5432/gnav03dbt
rem （デバッグ用）リクエストとレスポンスで、それぞれわざと遅延させるMiddleWare。最大遅延秒数を設定する

set BK_DIR=%CD%
cd /d %~dp0
cd ..

call ".\venv\Scripts\activate.bat"
call code .

cd %BK_DIR%

exit

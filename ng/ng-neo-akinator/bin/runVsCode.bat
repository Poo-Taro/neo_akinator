@echo off

set BK_DIR=%CD%
cd /d %~dp0
cd ..

call code .

cd %BK_DIR%

exit

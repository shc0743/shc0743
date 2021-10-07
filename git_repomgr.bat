@echo off
if "%1"=="" goto help
if "%1"=="/?" goto help
if "%1"=="--help" goto help
if "%1"=="add" goto add
if "%1"=="commit" goto commit
if "%1"=="push" goto push
if "%1"=="acp" goto add_commit_push

:error
echo Invalid arguments: %*!
exit /b 1

:help
echo Usage:
echo     %0 [/?] 
exit /b 0

:add
git add .
git add -u .
git add -A .
exit /b %ERRORLEVEL%

:commit_retry
echo Push failed, retry...
:commit
if "%2"=="" (
git commit
exit /b %ERRORLEVEL%
)
git commit -m %2
set "el=%ERRORLEVEL%"
if "%el%"=="128" goto commit_retry
exit /b %el%

:push
git push
exit /b %ERRORLEVEL%

:add_commit_push
cmd /c %0 add
cmd /c %0 commit %2
cmd /c %0 push
exit /b %ERRORLEVEL%

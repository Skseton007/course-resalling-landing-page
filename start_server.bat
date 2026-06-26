@echo off
title Affordable Course Market Local Server
cd /d "E:\course reselling app"
echo Starting local web server at http://localhost:8000 ...
python -m http.server 8000

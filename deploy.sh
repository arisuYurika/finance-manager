#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e


git add -A
git commit -m '推送'

# 如果发布到 https://<USERNAME>.github.io
git push -f git@github.com:arisuYurika/finance-manager.git master
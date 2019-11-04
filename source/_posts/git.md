---
title: git
date: 2018-8-23 09:16:37
tags:
  - git
---

无奈，一直在清闲的公司任职，对于 git 的使用只需要最基本的操作即可。
记录日常经常用到的命令吧。

<!--more-->

#### 常规操作

1. `git init` :初始化 git 仓库
2. `git clone` :克隆代码
3. `git help`
4. `git add`
5. `git commit`
6. `git status` :查看本地状态
7. `git pull` :拉去最新代码
8. `git push` :提交代码
9. `git remote -v` :查看仓库地址
10. `git branch`
11. `git checkout`
12. `git log` :查看提交记录

#### 特殊情况

###### 直接克隆远程分支，本地无 master 分支

```
 git clone -b dev http://xxx/xxx/xxx.git
```

###### 克隆 master,再拉取远程分支到本地

```
 git clone http://xxx/xxx/xxx.git
 git checkout -b dev origin/dev
```

###### 本地已有文件添加仓库

```
cd existing_folder
git init
git remote add origin https://xxx/xxx/xxxx.git
git add .
git commit -m "Initial commit"
git push -u origin master

```

###### cherry-pick

[参考网址](https://blog.csdn.net/qq_32452623/article/details/79449534)

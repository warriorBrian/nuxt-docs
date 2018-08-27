# Nuxt Description docs

## 一个基于vuePress快速成型的笔记整理站点

## 线上地址: [Docs](http://docs.brianlee.cn)

## 目录结构

```
├── docs/                               文档根目录
│   ├── .vuepress/                      vuePress配置目录
│   │   ├── dist/                       vuePress打包后目录
│   │   ├── public/                     静态资源文件目录，图片等
│   │   ├── config.js                   vuePress配置文件，标题、路由等配置
│   │   └── ...
│   ├── es6/                            es6文档目录md文件
│   ├── nuxt/                           nuxt文档目录
│   │   ├── README.md                   nuxt文档根目录md文件
│   │   └── ...
│   └── README.md                       首页配置md文件
└── package.json                        项目的配置信息
```

## 构建与运行

```bash

# 安装vuePress全局环境依赖
$ npm install vuepress -g

# 运行项目
$ npm run docs:dev

# 构建打包
$ npm run docs:build

```

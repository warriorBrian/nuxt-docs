# Nuxt.js

![nuxt.js](./../.vuepress/public/images/nuxt.png)

## 什么是Nuxt.js？

Nuxt.js 是一个基于 Vue.js 的通用应用框架。

通过对客户端/服务端基础架构的抽象组织，Nuxt.js 主要关注的是应用的 **UI渲染**。

我们的目标是创建一个灵活的应用框架，你可以基于它初始化新项目的基础结构代码，或者在已有 Node.js 项目中使用 Nuxt.js。

Nuxt.js 预设了利用Vue.js开发**服务端渲染**的应用所需要的各种配置。

除此之外，我们还提供了一种命令叫：nuxt generate，为基于 Vue.js 的应用提供生成对应的静态站点的功能。

我们相信这个命令所提供的功能，是向开发集成各种微服务（microservices）的 Web 应用迈开的新一步。

作为框架，Nuxt.js 为 客户端/服务端 这种典型的应用架构模式提供了许多有用的特性，例如异步数据加载、中间件支持、布局支持等。

## 起步

### 安装nuxt(基础模板)

```shell
npm install vue-cli
```

通过vue-cli来安装nuxt的基础模板

```shell
vue init nuxt/starter template
```

也可以是这样的：

```shell
vue init nuxt-community/starter-template <project-name>
```
接着通过一下命令启动项目：

```shell
$ npm run dev
```

应用现在运行在`http://localhost:3000`

::: warning
注意：Nuxt.js会监听`pages`目录中的文件变更并启动，当添加新页面时没有必要手动重启。
**而我们在修改`nuxt.config.js`等其他配置文件则需要手动重启。**
:::

## express模板初始化

### 使用`express`初始化模板

```shell
vue init nuxt/express <project-name>
```
通过以上方式进行初始化，会发现比**基础模板**多了一个`server/`文件夹。

而这个文件夹也是至关重要的

```shell{7,8,9}
.
├─ server/
│  ├─ api/
│  │   ├─ index.js
│  │   └─ users.js
│  └─ index.js
└─ build/
    ├─ main.js
    └─ main.map
```

代码高亮的部分是`npm run build`打包以后生成的文件夹，而上面的`server/`文件夹是初始化官方配置好的，里面包含了服务器端渲染的配置，以下是`server/ index.js`文件：

```js
import express from 'express'
import { Nuxt, Builder } from 'nuxt'

import api from './api'

const app = express()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000

app.set('port', port)

// Import API Routes
app.use('/api', api)

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

// Init Nuxt.js
const nuxt = new Nuxt(config)

// Build only in dev mode
if (config.dev) {
  const builder = new Builder(nuxt)
  builder.build()
}

// Give nuxt middleware to express
app.use(nuxt.render)

// Listen the server
app.listen(port, host)
console.log('Server listening on ' + host + ':' + port) // eslint-disable-line no-console
```

## Koa2模板初始化

### 使用`Koa2`初始化模板

```shell
vue init nuxt/koa <project-name>
```

同样使用`koa2`初始化，会比**基础模板**多一个`server/`文件夹。

对比`express`模板的`index.js`文件，`koa2`模板更贴近ES Nuxt(ES6、ES7、ES8)：

```js
import Koa from 'koa'
import { Nuxt, Builder } from 'nuxt'

async function start () {
  const app = new Koa()
  const host = process.env.HOST || '127.0.0.1'
  const port = process.env.PORT || 3000

  // Import and Set Nuxt.js options
  let config = require('../nuxt.config.js')
  config.dev = !(app.env === 'production')

  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  app.use(async (ctx, next) => {
    await next()
    ctx.status = 200 // koa defaults to 404 when it sees that status is unset
    return new Promise((resolve, reject) => {
      ctx.res.on('close', resolve)
      ctx.res.on('finish', resolve)
      nuxt.render(ctx.req, ctx.res, promise => {
        // nuxt.render passes a rejected promise into callback on error.
        promise.then(resolve).catch(reject)
      })
    })
  })

  app.listen(port, host)
  console.log('Server listening on ' + host + ':' + port) // eslint-disable-line no-console
}

start()
```

::: warning
注意：`nuxt/koa`是koa2模板，而不是使用`nuxt/koa2`,特别注意。
:::

## 全部模板初始化列表

而其实，官方也提供了更多的模板以便于我们使用，而我在**中文文档**并未发现有说明：

| 模板初始化命令 | 说明                                    |
| -------------- | --------------------------------------- |
| `nuxt/starter` | 基本的Nuxt.js项目模板                   |
| `nuxt/express` | Nuxt.js+Express                         |
| `nuxt/koa`     | Nuxt.js+Koa2                            |
| `nuxt/adonuxt` | Nuxt.js+AdonisJS                        |
| `nuxt/micro`   | Nuxt.js+Micro                           |
| `nuxt/nuxtent` | 适用于内容较重网站的Nuxt.js+Nuxtend模块 |


## 声明

### 关于图片

本文所有涉及的图片，例如：Nuxt.js的打包方式，均使用官方图片，因为官方图片具有权威性，并非盗版及抄袭等。

### 关于版权

博客采用 **Evan You**开发的`vuePress`快速搭建而成，版权归开发者所有，博客原创文章版权归作者所有。

### 关于博客

搭建这个博客的模板就是为了记录个人学习的笔记、心得、及在使用某框架或者其他技术方面遇到的问题汇总。博客是**非盈利性质**，如有侵犯其他人著作权，使用权等，请及时联系邮箱：`cn_brian@163.com`

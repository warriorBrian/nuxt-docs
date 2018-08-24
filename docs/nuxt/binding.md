# 插件中获取vue绑定

我们需要在`axios`的插件中配置`Loading`加载效果，例如使用`element-ui`框架作为示例：

## 创建插件

在文件根目录创建(或已经存在)`plugins/`目录，创建名为：`axios.js`的文件，内容如下：

```js
import Vue from 'vue'

var vm = new Vue({})    //获取vue实例

export default function ({ $axios, redirect }) {

  $axios.onRequest(config => {
    if (process.browser) {    //判断是否为客户端（必须）
        vm.$loading();
    }
  })

  $axios.onResponse(response=>{
      if (process.browser) {    //判断是否为客户端（必须）
          let load = vm.$loading();
          load.close();
      }
  })

  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      redirect('/400')
    }
  })
}
```
如官方所说，并不需要像**原生**`axios`一样，去`return`一个`config`出来。

## 配置nuxt.config.js文件

在`plugins`选项添加：

```js
plugins:['~/plugins/axios']
```

添加`modules`选项并添加如下示例：

```js
modules:['@/nuxtjs/axios']
```

配置防止多次打包：

在build选项中(`nuxt.config.js`会默认配置)添加`vendor`配置项：

```js
build:{
    vendor:['axios']
}
```
这样就可以调用loading加载方法,并且愉快的使用了。

:::tip
在插件中获取vue绑定还有很多种方式，这只是其中一种，根据个人习惯不同，使用方式不同来决定。
:::

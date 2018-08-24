# 配置代理解决跨域

我们知道在vue-cli中配置代理很方便，只需要在config/目录下的index.js中找到proxyTable添加即可，而在`nuxt`中同样需要修改`nuxt.config.js`配置文件。

## 原始配置代理方式

使用`@nuxtjs/axios`和`@nuxtjs/proxy`进行代理解决跨域

### 1.下载插件

```shell
#下载插件
npm install @nuxtjs/axios --save
#下载依赖代理
npm install @nuxtjs/proxy --save
```

### 2.配置插件

在`nuxt.config.js`添加配置项：`modules`和`proxy`。

```js
export default = {

    modules:[
        '@nuxtjs/axios',
        '@nuxtjs/proxy'
    ],
    proxy:[
        ['/json.html',{target:'http://www.xxxx.com'}]    //注意这也是一个数组
    ]

}
```

按照上面的方式已经完成了代理，可以进行跨域请求了。

## 更简便的代理方式

### 1.下载插件

这次只需要下载`@nuxtjs/axios`插件就可以完成。

```shell
# 下载插件
npm install @nuxtjs/axios --save
```

### 2.配置插件

```js
module.exports = {

  modules: [
    '@nuxtjs/axios',
  ],
  axios: {
    proxy:true
  },
  proxy:{
    '/api': 'http://api.example.com',
    '/api2': 'http://api.another-website.com'
  }

}
```

:::warning
特别注意：此时，`axios`选项为对象(`object`)，`proxy`选项为对象(`object`)。
:::

## @nuxtjs/axios的配置项

### `pathRewrite`选项(重写地址)

如果配置`pathRewrite`选项，可以采用第二种写法如下：

```js{2}
proxy: {
  '/api/': { target: 'http://api.example.com', pathRewrite: {'^/api/': ''} }
 }
```

`/api/`将被添加到API端点的所有请求中。可以使用`pathRewrite`选项删除。

因为在 ajax 的 url 中加了前缀 `/api`，而原本的接口是没有这个前缀的。

所以需要通过 **pathRewrite** 来重写地址，将前缀 `/api` 转为 `/`或者是`''`。

如果本身的接口地址就有 `/api` 这种通用前缀，就可以把 `pathRewrite` 删掉。

### `retry`选项(自动拦截失败请求)

可以在`axios`选项中，配置`retry`配置项，自动拦截失败请求，**默认为3次**。

```js
axios: {
  retry: { retries: 3 }
}
```

### `progress`选项(发出请求时显示加载栏)

与`Nuxt.js`进度条集成，在发出请求时显示加载栏。**（仅在浏览器上，当加载栏可用时。）**

您还可以使用`progress`配置为每个请求禁用进度条。

```js
this.$axios.$get('URL', { progress: false })
```

### `baseURL`选项（服务器端默认请求地址）

在服务器端使用和预先创建请求的基本URL。

### `browserBaseURL`选项（客户端默认请求地址）

在客户端使用和预先创建请求的基本URL。

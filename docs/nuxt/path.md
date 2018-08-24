# 路径匹配

在Nuxt.js中，如果使用如下方式进行引入：

```js
@import url('~assets/css/style.css') //Error
```

以上路径匹配是错误的，而我们采用下面的方式是正确的：

```js
@import url('~/assets/css/style.css') //success
```

也就是说，在最新版本更新中，官方修复了路径匹配问题：

而官方推荐使用`~/assets`匹配路径，而不是使用在**中文文档**中的~assets去匹配路径。

而在**中文文档**中，也并未见修复及更改此问题。

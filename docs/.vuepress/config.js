module.exports = {
  base: '/',
  title: '踩坑指南',
  description: '一个基于vuePress快速成型的笔记整理站点',
  port:8080,
  themeConfig: {
    repo: 'https://github.com/warriorBrian',
    sidebar:{
        '/nuxt/':[
            '',
            'path',
            'loading',
            'binding',
            'proxy',
            'deploy'

        ]
    },
    nav:[
      {text:'Home',link:'/'},
      {text:'nuxt',link:'/nuxt/'},
      {text:'ES Next',link:'/es6/'}
    ]
  }
}

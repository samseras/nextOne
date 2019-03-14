const pkg = require('./package')
const webpack = require('webpack'); 
module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    'element-ui/lib/theme-chalk/index.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/element-ui',
    '@/plugins/route'
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    // '@nuxtjs/proxy'
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    proxy: true,
  },
  proxy: {
    '/v1': 'http://192.168.0.150:8090/',
    '/ttsv2': 'http://121.199.5.95:8099/',
    // '/v1' : 'http://10.2.1.6:8090/'
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
   styleResources: {
     scss: './assets/css/main.scss',

},
    extend(config, ctx) {
      
    }
  },
  /*
  ** Router extend
  */
 router: {
  extendRoutes (routes, resolve) {
    console.log(routes, '这个是否可以配置')
    routes.forEach(item => {
      if (item.path === '/name') {
        item.meta = {
          id: 9
        }
      }
    })
  }
}
}

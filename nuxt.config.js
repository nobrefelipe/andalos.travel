import pkg from './package'
const shrinkRay = require('shrink-ray-current');
var bodyParser = require('body-parser');

export default {

  mode: 'universal',

  modern: (process.env.NODE_ENV == 'production') ? true : false,

    dev: (process.env.NODE_ENV !== 'production'),

    env: {
        baseUrl: (process.env.NODE_ENV == 'production') ? 'https://andalos.travel' : 'http://localhost:3000'
    },

  /*
  ** Headers of the page
  */
  head: {
    title: 'Andalos | Free itineraries designed for you',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0' },
      { hid: 'description', name: 'description', content: "" }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
        { type: 'text/javascript', src: "https://www.google-analytics.com/analytics.js", async: true}
    ],

  },

    render: {

        compressor: shrinkRay(),

        bundleRenderer: {

            shouldPrefetch: (file, type) => {
                return ['script', 'style'].includes(type)
            }

        },

        http2: {
            push: true
        },

        static: {
            maxAge: "1y",
            setHeaders(res, path) {
                if (path.includes("~/sw.js")) {
                    res.setHeader("Cache-Control", `public, max-age=${15 * 60}`)
                }
            }
        }

    },

    serverMiddleware: [
        bodyParser.json(),
        { path: '/api', handler: '~/api/index.js' },
    ],


    manifest: {
        name: "Andalos Travel",
        short_name: "Andalos TRavel",
        description: "Free itineraries designed for you ",
        theme_color: "rgb(254,201,64)",
        icons: [
            {
                "src": "/appicon-144.png",
                "type": "image/png",
                "sizes": "144x144"
            },

            {
                "src": "/appicon-192.png",
                "type": "image/png",
                "sizes": "192x192"
            },

            {
                "src": "/appicon-512.png",
                "type": "image/png",
                "sizes": "512x512"
            }
        ]
    },


    /*
    ** Customize the progress-bar color
    */
  loading: { color: 'rgb(254,201,64)' },

  /*
  ** Global CSS
  */

    css: [
        'ant-design-vue/dist/antd.css',
    ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/antd-ui',
    '@/plugins/string-to-slug',
    { src: '~/plugins/lazy-load-images.js', ssr: false },
    { src: '~/plugins/tinymce-vue-2.js', ssr: false },
    { src: '~/plugins/v-touch.js', ssr: false },
    { src: '~/plugins/vuex-persistedstate.js', ssr: false },
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    'cookie-universal-nuxt',
    'nuxt-device-detect',
  ],
  /*
  ** Axios module configuration
  */
  axios: {
      //baseURL: "https://andalos.travel"
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */

      optimization: {
          splitChunks: {
              name: true
          }
      },


      extend(config) { //ctx

        // SVG LOADER
        const svgRule = config.module.rules.find(rule => rule.test.test('.svg'));

        svgRule.test = /\.(png|jpe?g|gif|webp)$/;

        config.module.rules.push({
            test: /\.svg$/,
            loader: 'vue-svg-loader',
        });


    }
  }
}

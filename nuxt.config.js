export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'demo-v2',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [ 
    'assets/css/common.scss',
    'element-ui/lib/theme-chalk/index.css',
    'swiper/css/swiper.css'
  ],
   styleResources: {
    scss: [
      //把全局样式放到这里，同时把css节点中引用的scss删除
      '@/assets/css/common.scss'
    ]
  },
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {
      src:'@/plugins/element-ui.js'
    },
    { src: "@/plugins/vue-swiper.js"}
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  // buildModules: [
  // ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/style-resources'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: 'https://106.wanyuanxiang.com/api/',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    analyze: true,//开启打包分析
    babel: {
			plugins: [
			  ['component', {
				libraryName: 'element-ui',
				styleLibraryName: 'theme-chalk'
			  }]
			],
			comments: true
		  },
    postcss: {
      plugins: {
        'postcss-px-to-viewport': {
         // 需要转换的单位，默认为"px"
      unitToConvert: "px",
 
      // 设计稿的视口宽度
      viewportWidth: 1920,
 
      // 单位转换后保留的精度
      unitPrecision: 5,
 
      // 能转化为vw的属性列表
      propList: ["*"],
 
      // 希望使用的视口单位
      viewportUnit: "vw",
 
      // 字体使用的视口单位
      fontViewportUnit: "vw",
 
      // 需要忽略的CSS选择器，不会转为视口单位，使用原有的px等单位。
      selectorBlackList: ['ignore', 'navigation'],
 
      // 设置最小的转换数值，如果为1的话，只有大于1的值会被转换
      minPixelValue: 1,
 
      // 媒体查询里的单位是否需要转换单位
      mediaQuery: false,
 
      //  是否直接更换属性值，而不添加备用属性
      replace: true,
 
      // 忽略某些文件夹下的文件或特定文件，例如 'node_modules' 下的文件
      exclude: [/node_modules/, /dist/, /.output/, /.nuxt/, /.vscode/],
 
      // 如果设置了include，那将只有匹配到的文件才会被转换
      include: [/pages/, /assets\/styles\/*/],
 
      // 是否添加根据 landscapeWidth 生成的媒体查询条件 @media (orientation: landscape)
      landscape: false,
 
      // 横屏时使用的单位
      landscapeUnit: "vw"
 
      // 横屏时使用的视口宽度
      // landscapeWidth: 1338
        }
      }
    },
    vendor: ["axios"],
    //将style集到一起
    extractCSS: true,
    optimization: {
       splitChunks: {
        minSize: 10000,
        maxSize: 250000
      }
    }
  }
}

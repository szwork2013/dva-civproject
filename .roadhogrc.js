/**
 * Created by lyunfan on 17/5/12.
 */
import pxtorem from 'postcss-pxtorem';
const path= require( 'path' );
const svgSpriteDirs = [
  require.resolve( 'antd-mobile' ).replace( /warn\.js$/ , '' ) ,
  // antd-mobile 内置svg
  // 业务代码本地私有 svg 存放目录
  path.resolve( __dirname , 'src/svg/icon-core' ) ,
];

export default {
  entry : "./src/index.js" ,
  //output: {
  //  filename: "[name].min.js",
  //  chunkFilename: "[name].min.js"
  //},
  disableCSSModules : false ,
  publicPath : "./" ,
  // outputPath: "./WebApp",
  theme : "./theme.config.js" ,
  svgSpriteLoaderDirs : svgSpriteDirs ,
  autoprefixer : {
    browsers : [
      "iOS >= 8" ,
      "Android >= 4"
    ]
  } ,
  proxy : { } ,
  extraPostCSSPlugins : [
    pxtorem( {
      rootValue : 100 ,
      propWhiteList : [] ,
    } ) ,
  ] ,
  // style 必须是 true
  //extraBabelPlugins : [
  //  "transform-runtime" ,
  //  [
  //    "import" ,
  //    { libraryName : "antd-mobile" , "libraryDirectory" : "lib" , "style" : true }
  //  ]
  //] ,
  env : {
    "development": {
    "extraBabelPlugins": [
      "dva-hmr",
      "transform-runtime",
      ["import", { "libraryName": "antd-mobile", "libraryDirectory": "lib", "style": true }]
    ]

  },
  "production": {
    "extraBabelPlugins": [
      "transform-runtime",
      "dva-hmr",
      ["import", { "libraryName": "antd-mobile","libraryDirectory": "lib", "style": true }]
    ]
  }
  },
  sass:true
};


//{
//  "entry": "src/index.js",
//  "autoprefixer": {
//  "browsers": [
//    "iOS >= 8", "Android >= 4"
//  ]
//},
//  "env": {
//  "development": {
//    "extraBabelPlugins": [
//      "dva-hmr",
//      "transform-runtime",
//      ["import", { "libraryName": "antd-mobile", "libraryDirectory": "lib", "style": true }]
//    ]
//
//  },
//  "production": {
//    "extraBabelPlugins": [
//      "transform-runtime",
//      "dva-hmr",
//      ["import", { "libraryName": "antd-mobile","libraryDirectory": "lib", "style": true }]
//    ]
//  },
//  "proxy": {
//    "/api": {
//      "target": "http://192.168.12.6:8091/",
//        "changeOrigin": true,
//        "pathRewrite": { "^/api" : "" }
//    }
//  }
//}
//}

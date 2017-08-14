## Webpack 101
## สารบัญ
- [Init Webpack](#init)
- [Build Webpack](#build)
- [Watch Webpack](#watch)
- [Loader](#loader)
- [Babel(es2015)](#babel)
- [Minification](#minification)
- [Sass](#sass)
- [Extract](#extract)
- [Relative URL](#relative_url)
- [Purify CSS](#purify_css)
- [Long-Term Caching](#long-term_caching)
- [Optimization Image](#optimization_image)
- [Manifests](#manifests)
- [HTML TEMPLATE](#html_template)

## Init
`npm init -y`<br>
`npm install webpack --save-dev`<br>
ทดสอบเรียก webpack พิมพ์คำสั่ง `webpack`<br>
ผลลัพธ์<br>
```
No configuration file found and no output filename configured via CLI option.
A configuration file could be named 'webpack.config.js' in the current directory.
Use --help to display the CLI options.
```

## Build
`webpack src/main.js dist/bundle.js`<br>

## Watch
`webpack src/main.js dist/bundle.js --watch`<br>
เพิ่ม script เพื่อ run command ที่ package.json ดังนี้<br>
```json
"scripts": {
  "build": "webpack src/main.js dist/bundle.js",
  "watch": "npm run build -- --watch"
},
```

## Config
สร้างไฟล์ webpack.config.js `touch webpack.config.js`<br>
โดยโครงสร้างคร่าวๆ เริ่มต้นจะประกอบด้วย
```javascript
const path = require('path')

module.exports = {
  entry: {
    app: './src/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name][chunkhash].js',
    publicPath: '/'
  }
}
```

## Loader
ติดตั้ง css-loader & transformers style พิมพ์คำสั่ง `npm install css-loader style-loader --save-dev`<br>
สร้าง rule ใน webpack.config.js ประมาณนี้<br>
```javascript
module: {
  rules: [
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }
  ]
}
```

## Babel
ติดตั้ง babel-loader & babel-core พิมพ์คำสั่ง `npm install --save-dev babel-loader babel-core`<br>
ลิงค์อ้างอิง [Babel](https://babeljs.io/docs/setup/#installation)<br>
เพิ่ม rules `{ test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }`<br>

ติดตั้ง babel-cli & babel-preset-es2015 พิมพ์คำสั่ง `npm install --save-dev babel-cli babel-preset-es2015 babel-preset-stage-2`<br>
สร้างไฟล์ .bablerc แล้วกำหนดค่าดังนี้ `{ "presets": ["es2015", "stage-2"] }`

## Minification
สร้าง plugins ใน webpack.config.js `plugins: []`<br>
เพิ่มเงื่อนไขการ minifile เฉพาะ production ที่ webpack.config.js<br>
```javascript
module.exports = {
  ...
  plugins: []
}
if (process.env.NODE_EN === 'production') {
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin()
  )
} 
```
เพิ่ม scripts production ที่ package.json `"prod": "NODE_ENV=production webpack"`<br>
แก้ไข scripts ใหม่ดังนี้<br>
```json
"scripts": {
  "dev": "webpack --watch",
  "prod": "NODE_ENV=production webpack"
},
```

## Sass
ติดตั้ง sass-load & node-sass พิมพ์คำสั่ง `npm install sass-loader node-sass --save-dev`
เพิ่ม rules ที่ webpack.config.js<br>
```javascript
{
  test: /\.s[ac]ss$/,
  use: ['style-loader', 'css-loader', 'sass-loader']
}
```

## Extract
ติดตั้ง extract พิมพ์คำสั่ง `npm install --save-dev extract-text-webpack-plugin`<br>
ลิงค์อ้างอิง [extract-text-webpack-plugin](https://github.com/webpack-contrib/extract-text-webpack-plugin)<br>
ลิงค์อ้างอิง [webpack loaderoptions plugin](https://webpack.js.org/plugins/loader-options-plugin/)<br>
แก้ไข rules ที่ webpack.config.js ดังนี้<br>
```javascript
module: {
  rules: [
    ...
    {
      test: /\.s[ac]ss$/,
      use: ExtractTextPlugin.extract({
        use: ['css-loader', 'sass-loader'],
        fallback: 'style-loader'
      })
    }
  ]
},
plugins: [
  ...
  new webpack.LoaderOptionsPlugin({
    minimize: inProduction
  })
]
```
/\*หมายเหตุ\*/ ค่า inProduction มาจาก var inProduction = (process.env.NODE_ENV === 'prod')

## Relative_URL
ติดตั้ง raw-loader & file-loader พิพม์คำสั่ง `npm install --save-dev raw-loader file-loader`<br>
เพิ่ม rule<br>
```javascript
{
  test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/,
  loader: 'file-loader',
  options: {
    name: 'img/[name].[hash:7].[ext]'
  }
}
```

## Purify_CSS
ติดตั้ง `npm i -D purifycss-webpack purify-css`<br>
เพิ่ม plugin<br>
```javascript
--- require
const glob = require('glob');
const PurifyCSSPlugin = require('purifycss-webpack');

--- plugin
new PurifyCSSPlugin({
  paths: glob.sync(path.join(__dirname, 'index.html')),
  minimize: inProduction
})
```

## Long-Term_Caching
`npm i jquery clean-webpack-plugin -D`<br>
set ค่า webpack.config.js ดังนี้<br>
```javascript
--- require
const CleanWebpackPlugin = require('clean-webpack-plugin');

--- module
entry: {
  main: './src/main.js',
  verdor: ['jquery']
},
output: {
  path: path.resolve(__dirname, 'dist'),
  filename: '[name].[chunkhash].js'
}

--- plugin
new CleanWebpackPlugin(['dist'], {
  _root: __dirname,
  verbose: true,
  dry: false
})
```

## Optimization_Image
ติดตั้ง `npm install img-loader --save-dev`<br>
```javascript
--- plugin
{
  test: /\.(svg|eot|ttf|woff|woff2)$/,
  use: 'file-loader'
},
{
  test: /\.(png|jpe?g|gif)$/,
  loaders: [
    {
      loader: 'file-loader',
      options: {
        name: 'img/[name].[hash:7].[ext]'
      }
    },
    'img-loader'
  ]
}
```

## Manifests

## HTML_TEMPLATE
ติดตั้ง `npm i -D html-webpack-plugin`<br>
```javascript
--- require
const HtmlWebpackPlugin = require('html-webpack-plugin')

--- plugin
new HtmlWebpackPlugin({
  template: 'index.html',
  inject: true,
  minify: {
    removeComments: true,
    collapseWhitespace: true,
    removeAttributeQuotes: true
  },
}),
```
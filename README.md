## Webpack 101
## สารบัญ
- บทที่ 1
  - [Init Webpack](#init)
  - [Build Webpack](#build)
  - [Watch Webpack](#watch)

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
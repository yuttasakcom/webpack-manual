## Webpack 101
##สารบัญ

## Init Webpack
`npm init -y`<br>
`npm install webpack --save-dev`<br>
ทดสอบเรียก webpack พิมพ์คำสั่ง `webpack`<br>
ผลลัพธ์<br>
```
No configuration file found and no output filename configured via CLI option.
A configuration file could be named 'webpack.config.js' in the current directory.
Use --help to display the CLI options.
```

## Build Webpack
`webpack src/main.js dist/bundle.js`<br>

## Watch Webpack
`webpack src/main.js dist/bundle.js --watch`<br>
สามารถกำหนดการ run command ที่ package.json ที่ key = script ได้ดังนี้<br>
```json
"scripts": {
    "build": "webpack src/main.js dist/bundle.js",
    "watch": "npm run build -- --watch"
},
```
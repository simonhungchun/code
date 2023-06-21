```bash
npx husky-init
npm install
npm install commitizen -D
npx commitizen init cz-conventional-changelog --save-dev --save-exact
npx commitizen init cz-customizable --save-dev --save-exact --force
npm i @commitlint/config-conventional @commitlint/cli -D
echo 'module.exports = {extends: ["@commitlint/config-conventional"]}' > commitlint.config.js
npx husky add .husky/commit-msg 'npx --no-install commitlint --edit $1'
```

webpack 应用于单页应用打包 SPA
webpack 也可以做多页应用打包 MPA
多页应用在使用 webpack 打包时：只需要基于 SPA 的配置文件修改 entry 和 HtmlWebpackPlugin 插件就可以了

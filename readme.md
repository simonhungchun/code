```bash
npx husky-init && npm install
npm install commitizen -D
npx commitizen init cz-conventional-changelog --save-dev --save-exact
npx commitizen init cz-customizable --save-dev --save-exact --force
npm i @commitlint/config-conventional @commitlint/cli -D
echo 'module.exports = {extends: ["@commitlint/config-conventional"]}' > commitlint.config.js
npx husky add .husky/commit-msg 'npx --no-install commitlint --edit $1'
```

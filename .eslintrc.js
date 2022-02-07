module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:vue/essential"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2021,
        "sourceType": "module"
    },
    "plugins": [
        "vue"
    ],
    "rules": {
      "vue/no-multiple-template-root": false
    }
};
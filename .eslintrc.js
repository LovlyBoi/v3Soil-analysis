module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ['eslint:recommended', 'plugin:vue/essential'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    process: true,
    Buffer: true
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: ['vue'],
  rules: {
    quotes: [2, 'single'],
    semi: [2, 'never'],
    eqeqeq: [2, 'always'],
    'no-global-assign': [2, { exceptions: ['Object'] }],
    'no-redeclare': 2,
    // 指定数组的元素之间要以空格隔开(, 后面)， never参数：[ 之前和 ] 之后不能带空格，always参数：[ 之前和 ] 之后必须带空格
    'array-bracket-spacing': [2, 'never'],
    //强制使用一致的缩进 第二个参数为 "tab" 时，会使用tab，
    // 控制逗号前后的空格
    'comma-spacing': [2, { before: false, after: true }],
    // 控制逗号在行尾出现还是在行首出现 (默认行尾)
    // http://eslint.org/docs/rules/comma-style
    'comma-style': [2, 'last'],
    //"SwitchCase" (默认：0) 强制 switch 语句中的 case 子句的缩进水平
    // 以方括号取对象属性时，[ 后面和 ] 前面是否需要空格, 可选参数 never, always
    'computed-property-spacing': [2, 'never'],
    // 文件末尾强制换行
    'eol-last': 2,
    // 强制在对象字面量的属性中键和值之间使用一致的间距
    'key-spacing': [2, { beforeColon: false, afterColon: true }],
    // 要求在注释周围有空行 ( 要求在块级注释之前有一空行)
    'lines-around-comment': [1, { beforeBlockComment: true }],
    // 强制在关键字前后使用一致的空格 (前后腰需要)
    'keyword-spacing': 1,
    // 强制一行的最大长度
    'max-len': [1, 200],
    // 强制 function 定义中最多允许的参数数量
    'max-params': [1, 7],
    // 强制 function 块最多允许的的语句数量
    'max-statements': [1, 200],
    // 要求构造函数首字母大写 （要求调用 new 操作符时有首字母大小的函数，允许调用首字母大写的函数时没有 new 操作符。）
    'new-cap': [2, { newIsCap: true, capIsNew: false }],
    // 要求调用无参构造函数时有圆括号
    'new-parens': 2,
    // 禁止使用 Array 构造函数
    'no-array-constructor': 2,
    // 要求方法链中每个调用都有一个换行符
    'newline-per-chained-call': 1,
    // 不允许空格和 tab 混合缩进
    'no-mixed-spaces-and-tabs': 2,
    // 不允许多个空行
    'no-multiple-empty-lines': [2, { max: 2 }],
    // 禁止使用 Object 的构造函数
    'no-new-object': 2,
    // 禁止 function 标识符和括号之间出现空格
    'no-spaced-func': 2,
    // 禁用行尾空格
    'no-trailing-spaces': 2,
    // 强制函数中的变量要么一起声明要么分开声明
    'one-var': [2, { initialized: 'never' }],
    // 强制在块之前使用一致的空格
    'space-before-blocks': [2, 'always'],
    // 强制在 function的左括号之前使用一致的空格
    // 'space-before-function-paren': [2, 'always'],
    // 要求操作符周围有空格
    'space-infix-ops': 2,
    // 强制在一元操作符前后使用一致的空格
    'space-unary-ops': [2, { words: true, nonwords: false }],
    // Vue模板必须只有一个根元素
    'vue/no-multiple-template-root': 0,
    // 组件名必须是一个多词
    'vue/multi-word-component-names': 0
  },
}

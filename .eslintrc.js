module.exports = {
    rules: {
        indent: [2, 4],
        quotes: [2, 'single'],
        'linebreak-style': [2, 'windows'],
        semi: [2, 'always'],
        curly: [2, 'multi', 'consistent']
    },
    env: {
        browser: true,
        commonjs: true,
        es2021: true
    },
    extends: [
        'standard'
    ],
    parserOptions: {
        ecmaVersion: 7
    }
};

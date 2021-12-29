module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es2021: true,
    },
    extends: [
        'airbnb-base',
    ],
    parserOptions: {
        ecmaVersion: 8,
    },
    rules: {
        'linebreak-style': [2, 'windows'],
        indent: [2, 4],
        'require-await': [2],
    },
};

/*
        indent: [2, 4],
        quotes: [2, 'single'],
        'linebreak-style': [2, 'windows'],
        semi: [2, 'always'],
        curly: [2, 'multi', 'consistent']
};
*/

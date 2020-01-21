module.exports = {
    "env": {
        "commonjs": true,
        "es6": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    'parser': 'babel-eslint',
    "parserOptions": {
        "ecmaVersion": 6
    },
    "rules": {
        "no-unused-vars": ["error", { "argsIgnorePattern": "next" }],
        'consistent-return': 1,
        'no-param-reassign': 1,
        'no-return-assign': 1,
        'no-return-await': 1,
        'no-unmodified-loop-condition': 1,
        'no-unused-expressions': 1,
        'comma-dangle': [1, 'always-multiline'],
        'indent': [2, 2],
        'no-trailing-spaces': 1,
        'quotes': [2, 'single'],
        'semi': [2, 'always'],
    }
};
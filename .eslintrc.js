module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: [ '@typescript-eslint' ],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        project: './tsconfig.json'
    },
    rules: {
        'quotes': [ 'error', 'single' ],
        'eqeqeq': [ 'error', 'always' ],
        'no-var': 'error',
        'semi': [ 'error', 'always' ],
        'semi-style': [ 'error', 'last' ],
        'no-unused-vars': 0,
        '@typescript-eslint/no-unused-vars': [ 'warn', {
            argsIgnorePattern: '^_',
            varsIgnorePattern: '^_'
        } ],
        '@typescript-eslint/strict-boolean-expressions': [ 'error', {
            allowString: false,
            allowNumber: false,
            allowNullableObject: false
        } ]
    }
};

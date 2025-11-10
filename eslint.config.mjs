import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    eslint.configs.recommended,
    tseslint.configs.recommended,
    {
        ignores: [
            '.vscode/**/*',
            'node_modules/**/*',
            'build/**/*',
            'dist/**/*',
            'public/**/*',
            'docs/**/*',
            'eslint.config.mjs',
            'webpack.config.cjs',
            'httpd.js',
        ],
    },
    {
        plugins: {
            '@typescript-eslint': tseslint.plugin,
        },
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                ecmaVersion: 2020,
                sourceType: 'module',
                project: './tsconfig.json',
                ecmaFeatures: {
                    jsx: false
                },
            },
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
                varsIgnorePattern: '^_',
                caughtErrorsIgnorePattern: '^_',
                destructuredArrayIgnorePattern: '^_',
            } ],
            '@typescript-eslint/explicit-function-return-type': [ 'error', {
                allowExpressions: true,
            } ],
            '@typescript-eslint/strict-boolean-expressions': [ 'error', {
                allowString: false,
                allowNumber: false,
                allowNullableObject: false,
            } ],
        },
    },
);

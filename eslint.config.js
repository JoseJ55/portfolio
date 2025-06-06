import js from '@eslint/js'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist', '**/*.d.ts'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/src/**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'max-len': ['error', { code: 120 }],
      "quotes": ["error", "single", { "allowTemplateLiterals": true }],
      'jsx-quotes': ['error', 'prefer-single'],
      'semi': ['error', 'always'],
      'object-curly-spacing': ['error', 'always'],
      'no-trailing-spaces': ['error'],
      '@typescript-eslint/no-invalid-void-type': 'off',
      'eol-last': ['error', 'always']
    },
  },
)

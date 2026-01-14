//-- NPM Packages
import {defineConfig, globalIgnores} from 'eslint/config';
import eslint from '@eslint/js';
import pluginPlaywright from 'eslint-plugin-playwright';
import pluginVitest from '@vitest/eslint-plugin';
import pluginPrettier from 'eslint-plugin-prettier/recommended';
import tseslint from 'typescript-eslint';

export default defineConfig(
    globalIgnores(['*.{js,cjs,mjs}']),
    {
        languageOptions: {
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname
            }
        }
    },
    eslint.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,
    pluginPrettier,
    {
        ...pluginVitest.configs.recommended,
        files: ['src/**/__tests__/*']
    },
    {
        ...pluginPlaywright.configs['flat/recommended'],
        files: ['e2e/**/*.{test,spec}.{js,ts,jsx,tsx}']
    },
    {
        files: ['**/tests/*.ts', '**/tests/**/*.ts'],
        rules: {
            '@typescript-eslint/no-unused-expressions': 'off'
        }
    }
);

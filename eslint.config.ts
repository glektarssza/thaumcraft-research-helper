//-- NPM Packages
import {
    defineConfigWithVueTs,
    vueTsConfigs
} from '@vue/eslint-config-typescript';
import {globalIgnores} from 'eslint/config';
import eslint from '@eslint/js';
import pluginPlaywright from 'eslint-plugin-playwright';
import pluginVitest from '@vitest/eslint-plugin';
import pluginVue from 'eslint-plugin-vue';
import prettierConfig from 'eslint-config-prettier';
import tseslint from 'typescript-eslint';

export default defineConfigWithVueTs(
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
    prettierConfig,
    {
        files: ['**/tests/*.ts', '**/tests/**/*.ts'],
        rules: {
            '@typescript-eslint/no-unused-expressions': 'off'
        }
    },
    pluginVue.configs['flat/essential'],
    vueTsConfigs.recommended,

    {
        ...pluginVitest.configs.recommended,
        files: ['src/**/__tests__/*']
    },

    {
        ...pluginPlaywright.configs['flat/recommended'],
        files: ['e2e/**/*.{test,spec}.{js,ts,jsx,tsx}']
    }
);

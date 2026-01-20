//-- NPM Packages
import globals from 'globals';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import configsPrettier from 'eslint-config-prettier';
import configsPrettierVue from '@vue/eslint-config-prettier';
import {
    configureVueProject,
    defineConfigWithVueTs,
    vueTsConfigs as configsVueTypescript
} from '@vue/eslint-config-typescript';
import pluginPlaywright from 'eslint-plugin-playwright';
import pluginVitest from '@vitest/eslint-plugin';
import pluginVue from 'eslint-plugin-vue';

configureVueProject({
    tsSyntaxInTemplates: true,
    scriptLangs: ['ts'],
    allowComponentTypeUnsafety: true,
    rootDir: import.meta.dirname
});

export default defineConfigWithVueTs(
    {
        languageOptions: {
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname
            },
            globals: {
                ...globals.builtin,
                ...globals.es2026,
                ...globals.browser
            }
        }
    },
    eslint.configs.recommended,
    tseslint.configs.recommendedTypeChecked,
    configsPrettier,
    pluginVue.configs['flat/recommended'],
    configsVueTypescript.recommendedTypeChecked,
    {
        files: ['**/tests/*.ts', '**/tests/**/*.ts'],
        languageOptions: {
            globals: {
                ...globals.vitest
            }
        },
        rules: {
            ...pluginVitest.configs.recommended.rules,
            '@typescript-eslint/no-unused-expressions': 'off'
        }
    },
    {
        files: ['e2e/**/*.ts'],
        languageOptions: {
            globals: {
                ...globals.vitest
            }
        },
        ...pluginPlaywright.configs['flat/recommended'],
        ...pluginVitest.configs.recommended
    },
    configsPrettierVue
);

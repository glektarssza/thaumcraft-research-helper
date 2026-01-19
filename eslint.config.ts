//-- NPM Packages
import {
    defineConfigWithVueTs,
    vueTsConfigs
} from '@vue/eslint-config-typescript';
import globals from 'globals';
import eslint from '@eslint/js';
import pluginPlaywright from 'eslint-plugin-playwright';
import pluginVitest from '@vitest/eslint-plugin';
import pluginVue from 'eslint-plugin-vue';
import prettierConfig from 'eslint-config-prettier';
import tseslint from 'typescript-eslint';

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
    ...tseslint.configs.recommendedTypeChecked,
    prettierConfig,
    {
        files: ['**/tests/*.ts', '**/tests/**/*.ts'],
        rules: {
            '@typescript-eslint/no-unused-expressions': 'off'
        },
        languageOptions: {
            globals: {
                ...globals.vitest
            }
        }
    },
    pluginVue.configs['flat/essential'],
    vueTsConfigs.recommended,
    {
        files: ['**/src/*.vue'],
        languageOptions: {
            globals: {
                ...globals.vue
            }
        }
    },
    {
        ...pluginVitest.configs.recommended,
        files: ['src/**/__tests__/*'],
        languageOptions: {
            globals: {
                ...globals.vitest
            }
        }
    },
    {
        ...pluginPlaywright.configs['flat/recommended'],
        files: ['e2e/**/*.{test,spec}.{js,ts,jsx,tsx}'],
        languageOptions: {
            globals: {
                ...globals.vitest
            }
        }
    }
);

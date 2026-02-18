//-- NPM Packages
import eslint from '@eslint/js';
import pluginVitest from '@vitest/eslint-plugin';
import configsPrettierVue from '@vue/eslint-config-prettier';
import {
    vueTsConfigs as configsVueTypescript,
    configureVueProject,
    defineConfigWithVueTs
} from '@vue/eslint-config-typescript';
import configsPrettier from 'eslint-config-prettier';
import pluginPlaywright from 'eslint-plugin-playwright';
import pluginVue from 'eslint-plugin-vue';
import globals from 'globals';
import tseslint from 'typescript-eslint';

configureVueProject({
    tsSyntaxInTemplates: true,
    scriptLangs: ['ts'],
    allowComponentTypeUnsafety: true,
    rootDir: import.meta.dirname
});

/**
 * The base ESLint configuration that all other configurations extend from.
 */
const baseConfig = defineConfigWithVueTs({
    name: 'Base Config',
    languageOptions: {
        globals: {
            ...globals.builtin,
            ...globals.es2026,
            ...globals.browser
        }
    },
    extends: [
        eslint.configs.recommended,
        pluginVue.configs['flat/recommended'],
        configsPrettier,
        configsPrettierVue
    ]
});

/**
 * The base project end-to-end tests ESLint configuration that all other
 * end-to-end test configurations extend from.
 */
const baseE2ETestsConfig = defineConfigWithVueTs({
    files: ['**/e2e/**/*.ts'],
    extends: [
        pluginPlaywright.configs['flat/recommended'],
        pluginVitest.configs.recommended
    ],
    rules: {
        'vitest/valid-expect': 'off'
    }
});

/**
 * The base JavaScript ESLint configuration that all other JavaScript
 * configurations extend from.
 */
const baseJavaScriptConfig = defineConfigWithVueTs({
    name: 'Base JavaScript Config',
    extends: [baseConfig]
});

/**
 * The base TypeScript ESLint configuration that all other TypeScript
 * configurations extend from.
 */
const baseTypescriptConfig = defineConfigWithVueTs({
    name: 'Base TypeScript Config',
    extends: [
        baseConfig,
        tseslint.configs.recommendedTypeChecked,
        configsVueTypescript.recommendedTypeChecked
    ],
    languageOptions: {
        parserOptions: {
            projectService: true,
            tsconfigRootDir: import.meta.dirname
        }
    }
});

/**
 * The base project JavaScript source ESLint configuration.
 */
const baseProjectJavaScriptSourceConfig = defineConfigWithVueTs({
    files: ['**/src/**/*.js'],
    extends: [baseJavaScriptConfig]
});

/**
 * The base project TypeScript source ESLint configuration.
 */
const baseProjectTypeScriptSourceConfig = defineConfigWithVueTs({
    files: ['**/src/**/*.ts'],
    extends: [baseTypescriptConfig]
});

/**
 * The base project JavaScript tests ESLint configuration.
 */
const baseProjectJavaScriptTestsConfig = defineConfigWithVueTs({
    files: ['**/tests/**/*.js'],
    extends: [
        pluginVitest.configs.recommended,
        pluginPlaywright.configs['flat/recommended']
    ],
    rules: {
        '@typescript-eslint/no-unused-expressions': 'off',
        'vitest/valid-expect': 'off'
    }
});

/**
 * The base project TypeScript tests ESLint configuration.
 */
const baseProjectTypeScriptTestsConfig = defineConfigWithVueTs({
    files: ['**/tests/**/*.ts'],
    extends: [baseTypescriptConfig, pluginVitest.configs.recommended],
    rules: {
        '@typescript-eslint/no-unused-expressions': 'off',
        'vitest/valid-expect': 'off'
    }
});

/**
 * The base project end-to-end tests JavaScript ESLint configuration.
 */
const baseProjectE2ETestsJavaScriptConfig = defineConfigWithVueTs({
    files: ['**/e2e/**/*.js'],
    extends: [baseConfig, baseE2ETestsConfig],
    rules: {
        'vitest/valid-expect': 'off'
    }
});

/**
 * The base project end-to-end tests TypeScript ESLint configuration.
 */
const baseProjectE2ETestsTypeScriptConfig = defineConfigWithVueTs({
    files: ['**/e2e/**/*.ts'],
    extends: [baseTypescriptConfig, baseE2ETestsConfig],
    rules: {
        '@typescript-eslint/no-unused-expressions': 'off'
    }
});

/**
 * The project-level JavaScript source ESLint configuration.
 */
const projectJavaScriptSourceConfig = defineConfigWithVueTs({
    name: 'Project JavaScript Config',
    ignores: ['**/tests/**'],
    extends: [baseProjectJavaScriptSourceConfig]
});

/**
 * The project-level source TypeScript ESLint configuration.
 */
const projectTypescriptSourceConfig = defineConfigWithVueTs({
    name: 'Project TypeScript Config',
    ignores: ['**/tests/**'],
    extends: [baseProjectTypeScriptSourceConfig]
});

/**
 * The project-level JavaScript tests ESLint configuration.
 */
const projectTestsJavaScriptConfig = defineConfigWithVueTs({
    name: 'Project Tests JavaScript Config',
    extends: [baseProjectJavaScriptTestsConfig]
});

/**
 * The project-level TypeScript ESLint configuration.
 */
const projectTestsTypescriptConfig = defineConfigWithVueTs({
    name: 'Project Tests TypeScript Config',
    extends: [baseProjectTypeScriptTestsConfig]
});

/**
 * The project-level JavaScript ESLint configuration.
 */
const projectTestsE2EJavaScriptConfig = defineConfigWithVueTs({
    name: 'Project End-to-End Tests JavaScript Config',
    extends: [baseProjectE2ETestsJavaScriptConfig]
});

/**
 * The project-level TypeScript ESLint configuration.
 */
const projectTestsE2ETypeScriptConfig = defineConfigWithVueTs({
    name: 'Project End-to-End Tests TypeScript Config',
    extends: [baseProjectE2ETestsTypeScriptConfig]
});

export default defineConfigWithVueTs([
    projectJavaScriptSourceConfig,
    projectTypescriptSourceConfig,
    projectTestsJavaScriptConfig,
    projectTestsTypescriptConfig,
    projectTestsE2EJavaScriptConfig,
    projectTestsE2ETypeScriptConfig
]);

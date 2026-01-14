//-- NodeJS
import os from 'node:os';
import path from 'node:path';
import url from 'node:url';

//-- NPM Packages
import {playwright as browserPlaywright} from '@vitest/browser-playwright';
import {type ViteUserConfig, defineConfig, configDefaults} from 'vitest/config';
import replacePlugin from '@rollup/plugin-replace';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';

const config = defineConfig(({mode}) => {
    const conf: ViteUserConfig = {
        mode,
        resolve: {
            extensions: ['.ts', '.js'],
            alias: {
                '@': url.fileURLToPath(new URL('./src/ts/', import.meta.url))
            }
        },
        base: mode !== 'development' ? '/thaumcraft-research-helper/' : '/',
        root: path.resolve(import.meta.dirname, './src/'),
        build: {
            outDir: path.resolve(import.meta.dirname, './dist/'),
            minify: mode !== 'development',
            sourcemap: mode !== 'development' ? 'hidden' : true,
            emptyOutDir: true
        },
        test: {
            alias: {
                '@src': path.resolve(import.meta.dirname, './src/ts/')
            },
            exclude: [...configDefaults.exclude, 'e2e/**'],
            environment: 'jsdom',
            browser: {
                enabled: true,
                provider: browserPlaywright(),
                instances: [
                    {
                        browser: 'chromium',
                        headless: true
                    }
                ]
            },
            mockReset: true,
            clearMocks: true,
            unstubGlobals: true,
            unstubEnvs: true,
            dir: './src/ts/',
            name: 'Thaumcraft Research Helper',
            maxConcurrency: Math.max(Math.floor(os.cpus().length / 2), 1),
            coverage: {
                enabled: true,
                provider: 'istanbul',
                reporter: ['text'],
                exclude: [
                    'scripts/**',
                    'templates/**',
                    'coverage/**',
                    '**/dist/**',
                    '**/[.]**',
                    'packages/*/test?(s)/**',
                    '**/*.d.ts',
                    '**/virtual:*',
                    '**/__x00__*',
                    '**/\x00*',
                    'cypress/**',
                    'test?(s)/**',
                    'test?(-*).?(c|m)[jt]s?(x)',
                    '**/*{.,-}{test,spec}?(-d).?(c|m)[jt]s?(x)',
                    '**/__tests__/**',
                    '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*',
                    '**/vitest.{workspace,projects}.[jt]s?(on)',
                    '**/.{eslint,mocha,prettier}rc.{?(c|m)js,yml}'
                ]
            },
            passWithNoTests: true,
            reporters: 'default'
        },
        server: {
            fs: {
                strict: process.env['VITEST_VSCODE'] === undefined
            }
        },
        plugins: [
            vue(),
            vueDevTools({
                launchEditor: process.env['VITE_EDITOR'] ?? 'code'
            }),
            replacePlugin({
                preventAssignment: true,
                values: {
                    FAKER_SEED: JSON.stringify(process.env['FAKER_SEED'])
                }
            })
        ]
    };
    return conf;
});

export default config;

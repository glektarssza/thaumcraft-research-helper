import process from 'node:process';
import {defineConfig, devices} from '@playwright/test';

export default defineConfig({
    testDir: './e2e',
    timeout: 30000,
    expect: {
        timeout: 5000
    },
    forbidOnly: !!process.env.CI,
    retries: process.env.CI !== undefined ? 2 : 0,
    workers: process.env.CI !== undefined ? 1 : undefined,
    reporter: 'html',
    use: {
        actionTimeout: 0,
        baseURL:
            process.env.CI ? 'http://localhost:4173' : 'http://localhost:5173',
        trace: 'on-first-retry',
        headless: process.env.CI !== undefined ? true : false
    },
    projects: [
        {
            name: 'chromium',
            use: {
                ...devices['Desktop Chrome']
            }
        },
        {
            name: 'firefox',
            use: {
                ...devices['Desktop Firefox']
            }
        }
    ],
    outputDir: '.playwright',
    webServer: {
        command: process.env.CI !== undefined ? 'pnpm run preview' : 'pnpm run dev',
        port: process.env.CI !== undefined ? 4173 : 5173,
        reuseExistingServer: process.env.CI !== undefined ? false : true
    }
});

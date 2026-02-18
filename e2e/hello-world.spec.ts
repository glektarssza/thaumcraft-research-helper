import {type Page, test, expect} from '@playwright/test';

const getById = (page: Page, id: string) => {
    if (!id.startsWith('#')) {
        return page.locator(`#${id}`);
    }
    return page.locator(id);
};

const getByName = (page: Page, name: string) => {
    if (name.startsWith('.') || name.startsWith('#')) {
        return page.locator(name.substring(1));
    }
    return page.locator(name);
};

test('visits the app root url', async ({page}) => {
    await page.goto('/');
    const elem = getById(page, 'hello-world').and(getByName(page, 'h1'));
    await expect(elem).toHaveText('Hello world!');
    await expect(elem).toHaveCSS(
        'color',
        /red|rgb\(255, 0, 0\)|rgba\(255, 0, 0, 1(.0?)?\)/
    );
});

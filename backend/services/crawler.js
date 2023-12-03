// crawler.js

import puppeteer from 'puppeteer';

export const crawlPage = async (url) => {
    try {
        const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
        const page = await browser.newPage();

        // Navigate to the provided URL
        await page.goto(url);

        // Extract page title
        const pageTitle = await page.title();
        console.log(pageTitle, 'pageTitle');

        // Extract page description
        let pageDescription;

        try {
            pageDescription = await page.$eval('meta[name="description"]', (meta) =>
                meta ? meta.getAttribute('content') : ''
            );
        } catch (error) {
            console.error('Error during page description extraction:', error);
            pageDescription = '';
        }

        console.log('Description', pageDescription);

        // Extract all H1 elements
        const h1Elements = await page.$$eval('h1', (h1s) => h1s.map((h1) => h1.textContent).filter(Boolean));
        console.log('h1Elements', h1Elements);

        // Extract all H2 elements
        const h2Elements = await page.$$eval('h2', (h2s) => h2s.map((h2) => h2.textContent).filter(Boolean));
        console.log('h2Elements', h2Elements);

        // Extract links
        const links = await page.$$eval('a', (anchors) =>
            anchors.map((anchor) => anchor.textContent.trim()).filter(Boolean)
        );
        console.log('links', links);

        // Close the browser
        await browser.close();

        return {
            pageTitle,
            pageDescription,
            h1Elements,
            h2Elements,
            links,
        };
    } catch (error) {
        console.error('Error during crawling:', error);
        throw new Error('Crawling failed');
    }
};

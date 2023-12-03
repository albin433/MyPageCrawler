import Page from '../models/CrawledPageModel';
import puppeteer from 'puppeteer';

export const crawl = async (req, res) => {
  const { url } = req.body;

  try {
    const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
    const page = await browser.newPage();

    // Navigate to the provided URL
    await page.goto(url);

    // Extract page title
    const pageTitle = await page.title();
    console.log(pageTitle, 'pageTitle')

    // Extract page description (you may need to adjust this based on the actual structure of the page)
    let pageDescription;

    try {
      // Attempt to extract page description
      pageDescription = await page.$eval('meta[name="description"]', (meta) =>
        meta ? meta.getAttribute('content') : ''
      );
    } catch (error) {
      // Handle the error (e.g., log it) and set pageDescription to null or an empty string
      console.error('Error during page description extraction:', error);
      pageDescription = ''; // or pageDescription = null; depending on your preference
    }

    console.log('Description', pageDescription);

    // Extract all H1 elements
    const h1Elements = await page.$$eval('h1', (h1s) => h1s.map((h1) => h1.textContent).filter(Boolean));
    console.log('h1Elements', h1Elements);

    // Extract all H2 elements
    const h2Elements = await page.$$eval('h2', (h2s) => h2s.map((h2) => h2.textContent).filter(Boolean));
    console.log('h2Elements', h2Elements);

    // Extract links (anchor tags)
    const links = await page.$$eval('a', (anchors) =>
      anchors.map((anchor) => anchor.textContent.trim()).filter(Boolean)
    );
    console.log('links', links);

    // Close the browser
    await browser.close();

    const crawledPage = new Page({
      url,
      title: pageTitle,
      description: pageDescription,
      header_one: h1Elements,
      header_two: h2Elements,
      links,
    });

    await crawledPage.save();
    // Send the crawled data in the response
    return res.json({
      url,
      pageTitle,
      pageDescription,
      h1Elements,
      h2Elements,
      links,
    });
  } catch (error) {
    console.error('Error during crawling:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

//load history using mongoose -> https://mongoosejs.com/
export const getHistory = async (req, res) => {
  try {
    const pages = await Page.find({}).sort({ createdAt: -1 });
    return res.json(pages);
  } catch (error) {
    console.error('Error fetching data:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const deletePage = async (req, res) => {
  try {
    const { pageId } = req.params; // Assuming pageId is passed as a URL parameter

    console.log(pageId, 'pageID')
    // Use Mongoose to find and delete the page by its ID
    const deletedPage = await Page.findByIdAndDelete(pageId);

    console.log(deletedPage, 'deletedPage')
    if (!deletedPage) {
      // If the page with the given ID is not found, return a 404 response
      return res.status(404).json({ error: 'Page not found' });
    }

    // Return a success response
    return res.status(200).json({ message: 'Page deleted successfully' });
  } catch (error) {
    // Handle any errors that occur during the deletion process
    console.error('Error deleting page:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
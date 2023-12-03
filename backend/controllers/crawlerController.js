import Page from '../models/CrawledPageModel';
import { crawlPage } from './../services/crawler'

export const addPage = async (req, res) => {
  const { url } = req.body;

  try {
    const crawledData = await crawlPage(url);

    const crawledPage = new Page({
      url,
      title: crawledData.pageTitle,
      description: crawledData.pageDescription,
      header_one: crawledData.h1Elements,
      header_two: crawledData.h2Elements,
      links: crawledData.links,
    });

    await crawledPage.save();

    return res.json({
      url,
      pageTitle: crawledData.pageTitle,
      pageDescription: crawledData.pageDescription,
      h1Elements: crawledData.h1Elements,
      h2Elements: crawledData.h2Elements,
      links: crawledData.links,
    });
  } catch (error) {
    console.error('Error during crawling:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const fetchPages = async (req, res) => {
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
    const { pageId } = req.params;
    const deletedPage = await Page.findByIdAndDelete(pageId);

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
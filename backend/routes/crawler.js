import express from 'express';
import { addPage, fetchPages, deletePage } from '../controllers/crawlerController';
let crawlerRouter = express.Router();

// we protect the POST, PUT and DELETE methods
crawlerRouter.post('/crawl', addPage);
crawlerRouter.get('/history', fetchPages);
crawlerRouter.delete('/delete/:pageId', deletePage)

export default crawlerRouter;

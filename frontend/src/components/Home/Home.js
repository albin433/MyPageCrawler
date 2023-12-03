import React from 'react';
import './Home.scss';
import agent from "../../agent/agent";
import { Container, Button, Input, FormControl } from '@material-ui/core';
import { FiberManualRecord } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from './home-components/home-pagination';
import CustomTooltip from './home-components/element-tooltip';
import ItemHeaderSide from './home-components/item-header-side';

const Home = () => {
  const [anchorElArray, setAnchorElArray] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [pages, setPages] = React.useState([]);
  const [displayedPages, setDisplayedPages] = React.useState([]);
  const [url, setUrl] = React.useState('');
  const [currentPage, setCurrentPage] = React.useState(1);
  const anchorRef = React.useRef(null);
  const itemsPerPage = 6;

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);

    const startIndex = (newPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    setDisplayedPages(pages.slice(startIndex, endIndex));
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const fetchData = async () => {
    try {
      const response = await agent.Crawler.getHistory({ withCredentials: true })
      setPages(response);
      setDisplayedPages(response.slice(startIndex, endIndex));
      setAnchorElArray(Array(displayedPages.length).fill(null));
      console.log(displayedPages, "responsi"); // This will log the response data to the console
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }));
  const classes = useStyles();

  const handleClick = (event, index) => {
    const newAnchorElArray = [...anchorElArray];
    newAnchorElArray[index] = event.currentTarget;
    setAnchorElArray(newAnchorElArray);
  };

  const handleClose = (index) => {
    const newAnchorElArray = [...anchorElArray];
    newAnchorElArray[index] = null;
    setAnchorElArray(newAnchorElArray);
  };

  const handleAddPage = async () => {
    try {
      const response = await agent.Crawler.crawl(url)
      // setPages((prevState) => [...prevState, response])
      console.log('setPages', setPages((prevState) => [...prevState, response]))
      console.log('displayedPages', displayedPages)
      // setDisplayedPages((prevDisplayedPages) => [...prevDisplayedPages, response]);

      // setDisplayedPages(pages.slice(startIndex, endIndex))
      console.log('mas add page', pages, displayedPages)

      // displayedPages = [...displayedPages, response]
      fetchData();
      console.log(response, "responsi"); // This will log the response data to the console
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    console.log('API call with URL:', url);
    // Reset the input field after making the API call
    setUrl('');
  };

  const handleDelete = async (pageId) => {
    try {
      // Call the delete API
      console.log('pageid', pageId)
      await agent.Crawler.deletePage(pageId);
      // Fetch updated data after deletion
      fetchData();
    } catch (error) {
      console.error('Error deleting page:', error);
    }
    handleClose(); // Close the menu after deletion
  };

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  function formatDate(date) {
    const options = { month: 'long', day: 'numeric', year: '2-digit' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  }

  return (
    <Container maxWidth="100%" style={{ overflowY: 'auto', height: '100vh', margin: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div className='feed'>
        <div className='top'>
          <img className='header-image' alt='logo' src="/images/logo.png" />
          <div className='title'>
            <h1>Page Crawler</h1>
            <p className='primary-paragraph'>Crawl pages to see their HTML elements (headings, paragraphs, meta tags, links, etc.)</p>
          </div>
        </div>
        <div className='pages'>
          <div className='search-bar'>
            <FormControl fullWidth className={classes.margin}>
              <Input
                id="standard-adornment-amount"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                color='#2D6FF6'
                placeholder='Enter page URL...'
              />
            </FormControl>
            <Button
              variant="contained"
              color="primary"
              style={{ borderRadius: '30px', background: '#2D6FF6', width: '176px', textTransform: 'none' }}
              onClick={handleAddPage}
            >
              Add Page
            </Button>
          </div>
          <div className='list'>
            <h2>Crawled Pages</h2>
            <div className='pages-list'>
              {displayedPages.map((page, index) => (
                <div className='item'>
                  <div className='item-number'>{(currentPage - 1) * itemsPerPage + index + 1}</div>
                  <div className='item-content'>
                    <div className='item-header'>
                      <p className='secondary-paragraph'>{page.url}</p>
                      <ItemHeaderSide
                        date={formatDate(new Date(page.createdAt))}
                        onClick={handleClick}
                        anchorEl={anchorElArray[index]}
                        onClose={handleClose}
                        index={index}
                        handleDelete={() => handleDelete(page._id)}
                      />
                    </div>
                    <div className='page-title'>{page.title}</div>
                    <div className='page-description'>{page.description}</div>
                    <div className='page-elements'>
                      <CustomTooltip elements={page.header_one} elementType={`H1`} />
                      <div className='pika'>
                        <FiberManualRecord fontSize='small' style={{ fontSize: '5px', color: '#D9D9D9', verticalAlign: 'center' }} />
                      </div>
                      <CustomTooltip elements={page.header_two} elementType={`H2`} />
                      <div className='pika'>
                        <FiberManualRecord fontSize='small' style={{ fontSize: '5px', color: '#D9D9D9', verticalAlign: 'center' }} />
                      </div>
                      <CustomTooltip elements={page.links} elementType={`A`} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className='pagination'>
            <Pagination count={Math.ceil(pages.length / itemsPerPage)} handleChange={handleChangePage} page={currentPage} />
          </div>
        </div>
      </div >
    </Container >
  );
};

export default Home;

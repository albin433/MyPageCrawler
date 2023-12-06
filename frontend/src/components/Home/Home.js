import React from 'react';
import './Home.scss';
import { Container, Button, Input, FormControl, CircularProgress, Backdrop } from '@material-ui/core';
import { FiberManualRecord } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import agent from "../../agent/agent";
import CustomTooltip from './home-components/element-tooltip';
import ErrorModal from './home-components/error-modal';
import ItemHeaderSide from './home-components/item-header-side';
import Pagination from './home-components/home-pagination';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  container: {
    overflowY: 'auto',
    height: '100vh',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
    maxWidth: '100%'
  },
  backdrop: {
    zIndex: 1000,
    color: 'grey'
  },
  circularProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    zIndex: 1000,
  },
  addPageButton: {
    borderRadius: '30px',
    background: '#2D6FF6',
    width: '176px',
    textTransform: 'none',
    '&:hover': {
      background: '#0949CC',
    },
  },
  fiberManualRecord: {
    fontSize: '5px',
    color: '#D9D9D9',
    verticalAlign: 'center'
  }
}));

const Home = () => {
  const [anchorElArray, setAnchorElArray] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [displayedPages, setDisplayedPages] = React.useState([]);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [errorModalOpen, setErrorModalOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [pages, setPages] = React.useState([]);
  const [url, setUrl] = React.useState('');
  const anchorRef = React.useRef(null);
  const itemsPerPage = 6;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await agent.Crawler.getHistory({ withCredentials: true })
      setPages(response);
      setDisplayedPages(response.slice(startIndex, endIndex));
      setAnchorElArray(Array(displayedPages.length).fill(null));
    } catch (error) {
      console.error('Error fetching data:', error);
      setErrorModalOpen(true);
      setErrorMessage(`Error while trying to fetch data! ${error}`)
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const isValidUrl = (url) => {
    const urlPattern = /^(https?:\/\/)?([\w-]+\.)+([a-z]{2,})+(\.[a-z]{2,})?(\S+)?$/i;
    return urlPattern.test(url);
  };

  const handleAddPage = async () => {
    try {
      setLoading(true);
      if (!isValidUrl(url)) {
        setErrorModalOpen(true);
        setErrorMessage(`Invalid url provided!`)
        return;
      }
      await agent.Crawler.crawl(url)
      fetchData();
    } catch (error) {
      setErrorModalOpen(true);
      setErrorMessage(`Error wlile trying to crawl page! ${error}`)
    }
    finally {
      setUrl('');
      setLoading(false);
    }
  };

  const handleDelete = async (pageId) => {
    try {
      setLoading(true)
      await agent.Crawler.deletePage(pageId);
      fetchData();
    } catch (error) {
      console.error('Error deleting page:', error);
      setErrorModalOpen(true);
      setErrorMessage(`Error while trying to delete item! ${error}`)
    }
    finally {
      handleClose();
      setLoading(false)
    }
  };

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);

    const startIndex = (newPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    setDisplayedPages(pages.slice(startIndex, endIndex));
  };

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current && !open) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  function formatDate(date) {
    const options = { month: 'long', day: 'numeric', year: '2-digit' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  }

  const closeErrorModal = () => {
    setErrorModalOpen(false);
  };

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

  const classes = useStyles();

  return (
    <Container className={classes.container} >
      {errorModalOpen && <ErrorModal open={errorModalOpen} onClose={closeErrorModal} errorMessage={errorMessage} />}
      <div className='feed'>
        <Backdrop className={classes.backdrop} open={loading}>
          <CircularProgress className={classes.circularProgress} />
        </Backdrop>
        <div className='top'>
          <img className='header-image' alt='logo' src="/images/logo.png" />
          <div className='title'>
            <h1>Page Crawler</h1>
            <p className='primary-paragraph'>Crawl pages to see their HTML elements (headings, paragraphs, meta tags, links, etc.)</p>
          </div>
        </div>
        <div className='pages'>
          <div className='search-bar'>
            <FormControl fullWidth>
              <Input
                id="standard-adornment-amount"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                color='#2D6FF6'
                placeholder='Enter page URL...'
              />
            </FormControl>
            <Button
              className={classes.addPageButton}
              variant="contained"
              color="primary"
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
                      <a className='secondary-paragraph' href={page.url}>{page.url}</a>
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
                      <div className='fiber-manual-record'>
                        <FiberManualRecord className={classes.fiberManualRecord} />
                      </div>
                      <CustomTooltip elements={page.header_two} elementType={`H2`} />
                      <div className='fiber-manual-record'>
                        <FiberManualRecord className={classes.fiberManualRecord} />
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

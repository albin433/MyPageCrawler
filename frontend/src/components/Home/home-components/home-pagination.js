import React from 'react';
import Pagination from '@material-ui/lab/Pagination';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            marginTop: theme.spacing(2),
            color: 'blue'
        },
        '& .MuiPaginationItem-root': {
            borderRadius: '8px',
            border: '1px solid #CCCFD6',
            color: '#667085',
        },
        '& .Mui-selected': {
            backgroundColor: '#2D6FF6',
            color: '#fff',
            borderRadius: '8px',
            border: '1px solid #CCCFD6',
            '&:hover': {
                backgroundColor: '#0949CC'
            },
        },
    }
}));

const HomePagination = ({ count, handleChange, page }) => {
    const classes = useStyles();

    return (
        <Pagination
            count={count}
            page={page}
            onChange={handleChange}
            variant="outlined"
            shape="rounded"
            showFirstButton
            showLastButton
            classes={{ root: classes.root }}
        />
    );
};

export default HomePagination;

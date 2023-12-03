import React from 'react';
import { IconButton, Typography, Popover, Box } from '@material-ui/core';
import { MoreVert, Delete } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    popover: {
        borderRadius: '5px',
        padding: theme.spacing(1),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxShadow: '0px 1px 4px 0px rgba(0, 0, 0, 0.10)',
    },
    container: {
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
    },
    listItemIcon: {
        color: '#667085'
    },
    typography: {
        fontFamily: 'Lato',
        fontSize: '14px',
        fontStyle: 'normal',
        fontWeight: 400,
        lineHeight: 'normal',
        color: '#667085',
    },
}));

const ItemHeaderSide = ({ date, onClick, anchorEl, onClose, index, handleDelete }) => {
    const classes = useStyles();

    return (
        <div className='item-header-side'>
            <p className='date'>{date}</p>
            <div className='icon'>
                <IconButton
                    aria-label="morevert"
                    size='small'
                    onClick={(event) => onClick(event, index)}
                >
                    <MoreVert />
                </IconButton>
                <Popover
                    classes={{ paper: classes.popover }}
                    className={classes.popover}
                    id={`customized-popover-${index}`}
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={() => onClose(index)}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                >
                    <Box className={classes.container} onClick={() => handleDelete(index)}>
                        <Delete fontSize="small" className={classes.listItemIcon} />
                        <Typography variant="body2" className={classes.typography}>
                            Delete
                        </Typography>
                    </Box>
                </Popover>
            </div>
        </div>
    );
};

export default ItemHeaderSide;

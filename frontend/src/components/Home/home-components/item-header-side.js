import React from 'react';
import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from '@material-ui/core';
// import { IconButton } from '@material-ui/core';
import { MoreVert, Delete } from '@material-ui/icons';
import { withStyles, makeStyles } from '@material-ui/core/styles';

const HTMLMenuItem = withStyles((theme) => ({
    root: {
        paddingTop: 0
    }
}))(MenuItem);

const ItemHeaderSide = ({ date, onClick, anchorEl, onClose, index, handleDelete }) => {
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
                <Menu
                    id={`customized-menu-${index}`}
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={() => onClose(index)}
                // anchorOrigin={{
                //     vertical: 'bottom',
                //     horizontal: 'right',
                // }}
                // transformOrigin={{
                //     vertical: 'top',
                //     horizontal: 'right',
                // }}
                >
                    <HTMLMenuItem onClick={() => handleDelete(index)}>
                        <ListItemIcon>
                            <Delete fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Delete" />
                    </HTMLMenuItem>
                </Menu>
            </div>
        </div>
    );
};

export default ItemHeaderSide;

import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Tooltip, Typography, List, ListItem, ListItemText, Divider } from '@material-ui/core';
import { CloseSharp } from '@material-ui/icons';

const HtmlTooltip = withStyles((theme) => ({
    tooltip: {
        backgroundColor: '#fff',
        color: 'rgba(0, 0, 0, 0.87)',
        maxWidth: 320,
        fontSize: theme.typography.pxToRem(12),
        border: '1px solid #dadde9',
        padding: 0,
    },
    arrow: {
        color: '#E3E5E9',
        fontSize: '20px',
    },
}))(Tooltip);

const CustomTooltip = ({ elements, elementType }) => {
    const useStyles = makeStyles({
        dividerInset: {
            marginLeft: `15px`,
            marginTop: '5px',
            marginBottom: '5px',
        },
        closeSharpIcon: {
            fontSize: '13px',
        },
    });

    const classes = useStyles();
    return (
        <HtmlTooltip title={
            <React.Fragment className='tooltip'>
                {elements.length > 0 ?
                    <React.Fragment>
                        <Typography color="inherit" className='tooltip-header'>HTML elements on this page</Typography>
                        <List component="nav">
                            <ListItem>
                                <ListItemText
                                    primary={
                                        <React.Fragment>
                                            <div className='tooltip-description'>
                                                {elements.length}
                                                <div className='close-sharp'>
                                                    <CloseSharp fontSize="small" className={classes.closeSharpIcon} />
                                                </div>
                                                {elementType}
                                            </div>
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>
                            <Divider className={classes.dividerInset} variant="inset" />
                            {elements.map((element, index) => (
                                <ListItem key={index}>
                                    <ListItemText className='list-item-text' primary={element} />
                                </ListItem>
                            ))}
                        </List>
                    </React.Fragment> :
                    <Typography color="inherit" className='tooltip-header'>{`No ${elementType} elements were found`}</Typography>
                }
            </React.Fragment>
        } placement="bottom-start" leaveDelay={2} arrow interactive>
            <div className='page-elements'>
                {elements.length ?? 0}
                <div className='close-sharp'>
                    <CloseSharp fontSize="small" className={classes.closeSharpIcon} />
                </div>
                {elementType}
            </div>
        </HtmlTooltip>
    );
};

export default CustomTooltip;

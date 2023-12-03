// TooltipComponent.js

import React from 'react';
import { withStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
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
    // dividerInset: {
    //     margin: `90px 0 0 ${theme.spacing(9)}px`,
    // },
}))(Tooltip);

const CustomTooltip = ({ elements, elementType }) => {
    const theme = useTheme();
    const useStyles = makeStyles({
        dividerInset: {
            marginLeft: `15px`,
            marginTop: '5px',
            marginBottom: '5px',
        },
        // Add other styles if needed
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
                                                <div className='here'>
                                                    <CloseSharp fontSize="small" style={{ fontSize: '13px' }} />
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
        } placement="bottom-start" leaveDelay={200000} arrow interactive>
            <div className='page-elements'>
                {elements.length ?? 0}
                <div className='here'>
                    <CloseSharp fontSize="small" style={{ fontSize: '13px' }} />
                </div>
                {elementType}
            </div>
        </HtmlTooltip>

        // const useStyles = makeStyles((theme) => ({
        //     tooltip: {
        //         backgroundColor: '#f5f5f9',
        //         color: 'rgba(0, 0, 0, 0.87)',
        //         maxWidth: 320,
        //         fontSize: theme.typography.pxToRem(12),
        //         border: '1px solid #dadde9',
        //         padding: 0,
        //         display: 'inline-flex',
        //         paddingBottom: '0px',
        //         flexDirection: 'column',
        //         alignItems: 'flex-start',
        //         gap: '8px',
        //         borderRadius: '5px',
        //         background: '#FFF',
        //         boxShadow: '0px 2px 7px 0px rgba(0, 0, 0, 0.25)',
        //     },
        //     tooltipHeader: {
        //         display: 'flex',
        //         padding: '12px 17px',
        //         alignItems: 'flex-start',
        //         gap: '10px',
        //         alignSelf: 'stretch',
        //         color: 'var(--Primary-Text, #000)',
        //         fontFamily: 'Lato',
        //         fontSize: '14px',
        //         fontStyle: 'normal',
        //         fontWeight: 700,
        //         lineHeight: '122%', // 17.08px
        //     },
        //     listItemText: {
        //         display: 'flex',
        //         padding: '10px 0px 0px 20px',
        //         flexDirection: 'column',
        //         alignItems: 'flex-start',
        //         gap: '15px',
        //     },
        //     pageElements: {
        //         display: 'flex',
        //         width: '231px',
        //         alignItems: 'center',
        //         gap: '3px',
        //     },
        // }));

        // <HtmlTooltip
        //     title={
        //         <React.Fragment className={classes.tooltip}>
        //             <Typography color="inherit" className={`${classes.tooltipHeader} tooltip-header`}>
        //                 HTML elements on this page
        //             </Typography>
        //             <List component="nav">
        //                 <ListItem>
        //                     <ListItemText primary={`${elements.length} x ${elementType}`} />
        //                 </ListItem>
        //                 <Divider variant="inset" />
        //                 {elements.map((element, index) => (
        //                     <ListItem key={index}>
        //                         <ListItemText className={classes.listItemText} primary={element} />
        //                     </ListItem>
        //                 ))}
        //             </List>
        //         </React.Fragment>
        //     }
        //     placement="bottom-start"
        //     leaveDelay={200000}
        //     arrow
        // >
        //     {elements.length > 0 && (
        //         <div className={`${classes.pageElements} page-elements`}>
        //             {elements.length} x {elementType}
        //         </div>
        //     )}
        // </HtmlTooltip>

    );
};

export default CustomTooltip;

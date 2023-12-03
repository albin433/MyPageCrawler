import React from 'react';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        width: '400px',
    },
    button: {
        marginTop: theme.spacing(3),
        backgroundColor: '#2D6FF6',
        '&:hover': {
            background: '#0949CC',
        },
    },
}));

const ErrorModal = ({ open, onClose, errorMessage }) => {
    const classes = useStyles();

    return (
        <Modal
            className={classes.modal}
            open={open}
            onClose={onClose}
            aria-labelledby="error-modal-title"
            aria-describedby="error-modal-description"
        >
            <div className={classes.paper} >
                <Typography variant="h6" id="error-modal-title">
                    Error
                </Typography>
                <Typography variant="body1" id="error-modal-description">
                    {errorMessage}
                </Typography>
                <div className={classes.buttonContainer}>
                    <Button className={classes.button} variant="contained" color="primary" onClick={onClose}>
                        Close
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default ErrorModal;

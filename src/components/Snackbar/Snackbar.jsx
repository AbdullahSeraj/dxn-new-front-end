import { Alert, Snackbar } from '@mui/material'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleClickFalse } from '../../redux/slices/SnackbarSlice';

const SuccessSnackbar = () => {
    const { open, message, condition } = useSelector((state) => state.snackbar)
    const dispatch = useDispatch()

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(handleClickFalse())
    };

    return (
        <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
            <Alert
                onClose={handleClose}
                severity={condition} // success error info warning
                variant="filled"
                sx={{ width: '100%' }}
            >
                {message}
            </Alert>
        </Snackbar>
    )
}

export default SuccessSnackbar
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import AuthNewForm from 'components/AuthNewForm';
import { NewAuthFieldProps } from '@automatisch/types';




export default function AuthNewField({ handleClose, removeField, openModal, formUtilities }: NewAuthFieldProps) {

    return (
        <Dialog open={openModal} onClose={handleClose}>
            <DialogTitle>New Field</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Use standard Fields to request info from users. Computed Fields are used programmatically and not shown to users.
                </DialogContentText>
                <AuthNewForm removeField={removeField} handleClose={handleClose} formUtilities={formUtilities} />
            </DialogContent>

        </Dialog>
    );
}
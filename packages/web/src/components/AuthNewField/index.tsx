import Box  from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { FieldValues } from 'react-hook-form'
import AuthNewForm from 'components/AuthNewForm';
import type { AuthFirstStepProps } from 'components/AuthFirstStep';


type NewAuthFieldProps = {
    openModal: boolean;
    handleClose: () => void;
    fieldsState: AuthFirstStepProps;
}



export default function AuthNewField({handleClose, openModal, fieldsState}:NewAuthFieldProps) {



    return (
            <Dialog open={openModal} onClose={handleClose}>
                <DialogTitle>New Field</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                       Use standard Fields to request info from users. Computed Fields are used programmatically and not shown to users.
                    </DialogContentText>
                    <AuthNewForm handleClose={handleClose} fieldsState={fieldsState} />
                </DialogContent>
                {/* <DialogActions>

                </DialogActions> */}
            </Dialog>
    );
}
import React, { useState } from 'react';
import { Alert, Box, Grid, Snackbar } from '@mui/material';
import { Input } from './Input';
import { QuestionService } from '../services/QuestionService';

import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';;


export interface CreateDialogProps {
  open: boolean;
  onClose: () => void;
  setMessage: (value: string) => void
  setSnackError: (value: boolean) => void
  setSnackSuccess: (value: boolean) => void
}

function CreateDialog(props: CreateDialogProps) {
  const { onClose, open, setMessage, setSnackSuccess, setSnackError } = props;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const newQuestion = await QuestionService().create(data) as { data: any, error?: string }
    
    if(newQuestion.data) {
      setMessage('Вопрос создан')
      setSnackSuccess(true)
      setSnackError(false)
    }else {
      setMessage('Произашла ошибка')
      setSnackError(true)
      setSnackSuccess(false)
    }

    onClose()
  }

  return (
    <Dialog open={open}>
        <DialogTitle>Создай вопрос</DialogTitle>
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={2} style={{ padding: '20px'}}>
            <Grid item xs={12}>
                <Input style={{ width:"100%" }} placeholder='Название' name="title" />
            </Grid>
            <Grid item xs={12}>
                <Input style={{ width:"100%" }} placeholder='Описание' name="describe" />
            </Grid>
            <Grid item xs={12}>
                <Input style={{ width:"100%" }} type="file" placeholder='Фото' name="photo"/>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ 
                borderRadius:'10px', 
                background:"#0966aa", 
                marginLeft:"15px",
                marginTop:"10px" 
              }}
            >
              Отправить
            </Button>
          </Grid>
        </Box>
    </Dialog>
  );
}

export default function CreateDialogPop() {
  const [open, setOpen] = useState(false);
  const [ snackError, setSnackError ] = useState<boolean>(false)
  const [ snackSuccess, setSnackSuccess ] = useState<boolean>(false)
  const [ message, setMessage ] = useState<string>('')


  const handleCloseSnack = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackError(false);
    setSnackSuccess(false);  
  };

  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button 
        variant="contained"  
        fullWidth 
        sx={{ mt: 3, mb: 2, borderRadius:'10px', background:"#0966aa" }}
        onClick={handleClickOpen}>
        Создать вопрос
      </Button>
      <CreateDialog
        open={open}
        onClose={handleClose}
        setMessage={setMessage}
        setSnackError={setSnackError}
        setSnackSuccess={setSnackSuccess}
      />
        <Snackbar open={snackError} autoHideDuration={6000} onClose={handleCloseSnack}>
          <Alert onClose={handleCloseSnack} severity="error" sx={{ width: '100%' }}>
            {message}
          </Alert>
        </Snackbar>
        <Snackbar open={snackSuccess} autoHideDuration={6000} onClose={handleCloseSnack}>
          <Alert onClose={handleCloseSnack} severity="success" sx={{ width: '100%' }}>
            {message}
          </Alert>
        </Snackbar>
    </div>
  );
}

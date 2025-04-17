import React, { useState } from 'react';
import { Alert, Box, Grid, Snackbar } from '@mui/material';
import { Input, TextArea } from './Input';
import { QuestionService } from '../services/QuestionService';

import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';import { fetchMyQuestions } from '../store/slices/questionSlice';
import { useAppDispatch } from '../store/hooks';
;


export interface CreateDialogProps {
  open: boolean;
  onClose: () => void;
  setMessage: (value: string) => void
  setSnackError: (value: boolean) => void
  setSnackSuccess: (value: boolean) => void
}
 


function CreateDialog(props: CreateDialogProps) {
  const [photoText, setPhotoText] = useState<string>('Выбрать фото')
  const { onClose, open, setMessage, setSnackSuccess, setSnackError } = props;
  const dispatch = useAppDispatch()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const newQuestion = await QuestionService().create(data) as { data: any, error?: string }
    
    if(newQuestion.data) {
      setMessage('Вопрос создан')
      setSnackSuccess(true)
      setSnackError(false)
      dispatch(fetchMyQuestions())

    }else {
      setMessage('Произашла ошибка')
      setSnackError(true)
      setSnackSuccess(false)
    }

    onClose()
  }

  return (
    <Dialog onClose={onClose} open={open}>
        <DialogTitle fontWeight={'bold'}>Создай вопрос</DialogTitle>
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={2} style={{ padding: '20px'}}>
            <Grid item xs={12}>
                <Input style={{ width:"100%" }} required placeholder='Название' name="title" />
            </Grid>
            <Grid item xs={12}>
                <TextArea style={{ width:"100%" }} required  placeholder='Описание' name='describe' />
            </Grid>
            <Grid item xs={12}>
                <Input style={{ width:"100%" }} required placeholder='Название языка' name="lang" />
            </Grid>
            <Grid item xs={12}>
                <Input style={{ width:"100%" }} required placeholder='Название технологии' name="tech" />
            </Grid>
            <Grid item xs={12}>
                <label htmlFor="photo" className="choocePhoto">{photoText}</label>
                <Input style={{ width:"100%",display:'none' }} onChange={() => setPhotoText('Фото выбрано')} type="file" placeholder='Фото' name="photo" id='photo'/>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ 
                borderRadius:'10px', 
                background:"#292e3c", 
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
        sx={{ mt: 3, mb: 2, borderRadius:'10px', background:"#292e3c" }}
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

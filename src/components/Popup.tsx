import * as React from 'react';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import { Grid } from '@mui/material';
import { Input } from './Input';

const emails = ['username@gmail.com', 'user02@gmail.com'];

export interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
}

function SimpleDialog(props: SimpleDialogProps) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value: string) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Создай вопрос</DialogTitle>
        <Grid container spacing={2} style={{ padding: '20px'}}>
            <Grid item xs={12}>
                <Input style={{ width:"100%" }} placeholder='Название'/>
            </Grid>
            <Grid item xs={12}>
                <Input style={{ width:"100%" }} placeholder='Описание'/>
            </Grid>
            <Grid item xs={12}>
                <Input style={{ width:"100%" }} type="file" placeholder='Фото'/>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ borderRadius:'10px', background:"#0966aa", marginLeft:"15px",marginTop:"10px" }}
            >
              Отправить
            </Button>
        </Grid>
    </Dialog>
  );
}

export default function SimpleDialogDemo() {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: string) => {
    setOpen(false);
    setSelectedValue(value);
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
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
}

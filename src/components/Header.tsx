import * as React from 'react';
import PropTypes from 'prop-types';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';



interface HeaderProps {
  sections: ReadonlyArray<{
    title: string;
    url: string;
  }>;
  title: string;
}

function Header(props: HeaderProps) {
  const { title, sections } = props;

  return (
    <React.Fragment>
      <Toolbar sx={{ 
        borderBottom: 1,
        borderColor: 'divider', 
        background:"#0966aa", 
        borderRadius:'20px',
        marginTop:'10px',
        position:'sticky',
        top:10,
        left: 0,
        zIndex:10
      }}>
        <Button 
          variant="contained" 
          size="small"
          sx={{
            background: "#e75357", 
            borderRadius: '10px', 
            boxShadow:'none'}}
          >
            IT BOT
        </Button>
        <Typography
          component="h2"
          variant="h5"
          color="white"
          align="center"
          fontWeight="bold"
          noWrap
          sx={{ flex: 1, letterSpacing:'5px' }}
        >
          <Link sx={{ textDecoration:"none", color:"white" }} href='/'>
          {title}
          </Link>

        </Typography>
        <IconButton>
        </IconButton>
        <Button 
          variant="contained" 
          size="small"
          href='/signin'
          sx={{background: "#1dc62e", borderRadius: '10px', boxShadow:'none'}}
        >
          Войти
        </Button>
      </Toolbar>
      <Toolbar
        component="nav"
        variant="dense"
        sx={{ 
          justifyContent: 'space-between',
          overflowX: 'auto',
          paddingLeft: '0px',
          paddingRight: '0px'
        }}
      >
        {sections.map((section) => (
          <Link
            color="inherit"
            noWrap
            key={section.title}
            variant="body2"
            href={section.url}
            sx={{
               flexShrink: 0,
               background: '#1315200d',
               borderRadius: '15px',
               fontWeight: 'bold', 
               padding:'8px 15px', 
               textDecoration:"none"}}
          >
            {section.title}
          </Link>
        ))}
      </Toolbar>
    </React.Fragment>
  );
}

Header.defaultProps = {
  title: "Привет"
}

Header.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }),
  ),
  title: PropTypes.string.isRequired,
};

export default Header;
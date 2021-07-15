import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
    textAlign: 'center'
  },
  nav: {
    boxShadow: '0px 0px 30px -10px rgba(0,0,0,.5)',
  }
}));

const Navbar = () => {
  const classes = useStyles();

  return (
    <AppBar position="fixed" className={classes.nav}>
      <Container>
        <Toolbar> 
          <Typography variant="h6" className={classes.title}>
            Alexander Le - C964 Computer Science Capstone Project
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
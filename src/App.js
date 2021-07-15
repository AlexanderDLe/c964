import { makeStyles } from '@material-ui/core/styles';
import Navbar from './Navbar';
import Section from './Section';

const useStyles = makeStyles((theme) => ({
  root: {
    background: '#fefefe',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}));

function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Navbar />
      <Section />
    </div>
  );
}

export default App;

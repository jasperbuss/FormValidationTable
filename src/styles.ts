import {makeStyles, Theme} from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
  },
  btnStyles: {
    marginRight: '3px',
  },
  linkStyles: {
    textDecoration: 'none',
  },
}));

export default useStyles;

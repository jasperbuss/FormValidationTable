import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
btnStyles:{
    background:"darkgrey",
    marginRight:"3px"
},
linkStyles:{
textDecoration:"none"
}
  }),
);
export default useStyles;
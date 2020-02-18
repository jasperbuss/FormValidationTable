import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
      formStyle:{
        display:"flex",
        flexDirection:"column"
      },
   inputStyle:{
       width:"fit-content"
   }
  }),
);
export default useStyles;
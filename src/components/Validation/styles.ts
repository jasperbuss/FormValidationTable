import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme:Theme) => ({
  root: {
    display:"flex",
    maxWidth: "fit-content",
  },
  formStyle:{
    display:"flex",
    flexDirection:"column"
  },
inputStyle:{
   width:"fit-content"
}
})
);
export default useStyles;
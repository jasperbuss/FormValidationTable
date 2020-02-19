import * as React from 'react';
import {useForm} from 'react-hook-form';
import useStyles from './styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
export const FormValidation: React.FC = () => {
  const {register, handleSubmit, errors} = useForm();
  const onSubmit = (data: React.DOMAttributes<HTMLFormElement>) =>
    alert('Form submitted');
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardContent>
        <form className={classes.formStyle} onSubmit={handleSubmit(onSubmit)}>
          Name
          <div>
            <input
              className={classes.inputStyle}
              name="Name"
              ref={register({required: true, minLength: 2})}
            />
            <br />
            <span style={{color: 'red'}}>
              {errors.Name && 'At least 2 characters'}
            </span>
          </div>
          <br />
          Email
          <div>
            <input
              className={classes.inputStyle}
              name="Email"
              ref={register({
                required: true,
                pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
              })}
            />
            <br />
            <span>{errors.Email && 'Enter a valid email address'}</span>
            <br />
          </div>
          Password
          <div>
            <input
              className={classes.inputStyle}
              name="Password"
              ref={register({
                required: true,
                pattern: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,1000}$/,
              })}
            />
            <br />
            <span>
              {errors.Password &&
                'At least: 8 chars, one of: [!@#$%^&*] & [0-9] & [A-Z]'}
            </span>
            <br />
          </div>
          <br />
          <input className={classes.inputStyle} type="submit" />
        </form>
      </CardContent>
    </Card>
  );
};
export default FormValidation;

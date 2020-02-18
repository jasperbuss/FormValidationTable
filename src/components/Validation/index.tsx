import * as React from 'react'
import { useForm } from 'react-hook-form'
import useStyles from './styles';
export  const FormValidation:React.FC = () => {
  const { register, handleSubmit, errors } = useForm()
  const onSubmit = (data:React.DOMAttributes<HTMLFormElement>) => alert("you did it")
   const classes = useStyles();
  return (
    <form className={classes.formStyle} onSubmit={handleSubmit(onSubmit)}>
            name
            <div>
          <input className={classes.inputStyle} name="firstName" ref={register({ required: true, minLength: 2 })} />
            {errors.firstName && 'First name is required'}
            </div>
            email
            <div>
           <input className={classes.inputStyle} name="email" ref={register({ pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ })} />
           {errors.email && 'First name is required'}
            </div>
            password
            <div>
           <input className={classes.inputStyle} name="password" 
               ref={register({ pattern: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,100}$/ })} />
            {errors.password && 'First name is required'}
                  </div>
           <input  className={classes.inputStyle} type="submit" />
    </form>
  );
}
export default FormValidation;
import React from 'react'
import { useForm } from 'react-hook-form'

export  const FormValidation:React.FC = () => {
  const { register, handleSubmit, errors } = useForm()
  const onSubmit = (data:React.DOMAttributes<HTMLFormElement>) => console.log(data)
   
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <div>
            name
          <input name="firstName" ref={register({ required: true, minLength: 2 })} />
          <div>
            {errors.firstName && 'First name is required'}
          </div>
        </div>
        email
      <input name="email" ref={register({ pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ })} />
        password
      <input name="password" 
      ref={register({ pattern: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,100}$/ })} />
      {errors.firstName && 'First name is required'}
      <input type="submit" />
    </form>
  );
}
export default FormValidation;
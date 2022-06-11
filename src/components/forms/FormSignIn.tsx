import { Formik, FormikHelpers, FormikProps, Form, Field, FieldProps } from 'formik';
import { useRouter } from 'next/router';
import { setCookie } from 'nookies';
import { useState } from 'react';
import Bar from '../bar';
import ButtonFill, { ButtonFillLoading } from '../buttons';

const axios = require("axios").default

type SignInProps = {
  firstName: string
  lastName: string
  email: string
  password: string
  checkpassword: string
}

export const FormSignIn = () => {
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false)
  const [msg, setMsg] = useState("")
  const router = useRouter()

  return (
    <div>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          checkpassword: ""
        }}
        onSubmit={async (values: SignInProps) => {
          const data = {
            ...values
          }
          setIsLoadingSubmit(true)
          if(!values.firstName){ 
            setMsg("Campo Nome não pode esta vazio")
            setIsLoadingSubmit(false)
            return
          }else if(!values.email){
            setMsg("Campo Email não pode esta vazio")
            setIsLoadingSubmit(false)
            return
          }else if(!values.password || values.password !== values.checkpassword){
            setMsg("As Senhas são invalidas")
            setIsLoadingSubmit(false)
            return
          }
          const signInUser = await axios.post("/api/user/signin", {
            ...data
          })
          setCookie(undefined, 'c.token', signInUser.data.token, {
            maxAge: 60 * 60 * 1  //1 hour
          })
          setMsg(signInUser.data.msg)
          setIsLoadingSubmit(false)
          router.push("/admin")
        }}
      >
        <Form className='flex flex-col items-center text-[12px] gap-5 '>
          <div className='flex gap-2  w-full'>
            <Field id="firstName" name="firstName" placeholder="Nome" className="bg-c_lgray w-full p-3 rounded outline-c_orange" />
            <Field id="lastName" name="lastName" placeholder="Sobrenome" className="bg-c_lgray w-full p-3 rounded outline-c_orange" />
          </div>
          <Field id="email" name="email" placeholder="email" className="bg-c_lgray w-full p-3 rounded outline-c_orange" />
          <div className='flex gap-2  w-full'>
            <Field id="password" name="password" type="password" placeholder="Senha" className="bg-c_lgray w-full p-3 rounded outline-c_orange" />
            <Field id="checkpassword" name="checkpassword" type="password" placeholder="Confirme a Senha" className="bg-c_lgray w-full p-3 rounded outline-c_orange" />
          </div>
          <div className='w-[50%] flex items-center'>{isLoadingSubmit ? <ButtonFillLoading /> : <ButtonFill name='Fazer Cadastro'/>}</div>
        </Form>
      </Formik>
      {msg && (
        <>
        <div className='my-8 w-full'><Bar /></div>
        <div className='w-full text-[12px] text-center'>{msg}</div>
        </>        
      )}
      

    </div>
  );
};
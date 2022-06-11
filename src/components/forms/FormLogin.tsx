import { Formik, FormikHelpers, FormikProps, Form, Field, FieldProps } from 'formik';
import { useRouter } from 'next/router';
import { setCookie } from 'nookies';
import { useState } from 'react';
import Bar from '../bar';
import ButtonFill, { ButtonFillLoading } from '../buttons';

const axios = require("axios").default

type SignInProps = {
  email: string
  password: string

}

export const FormLogin = () => {
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false)
  const [msg, setMsg] = useState("")
  const router = useRouter()
  
  return (
    <div>
      <Formik
        initialValues={{          
          email: "",
          password: "",
        }}
        onSubmit={async (values: SignInProps) => {
          setIsLoadingSubmit(true)
          const data = {
            ...values
          }
          if(!values.email){
            setMsg("Campo E-mail não pode estar vazio")
            setIsLoadingSubmit(false)
            return
          }else if(!values.password ){
            setMsg("Campo Senha não pode estar vazio")
            setIsLoadingSubmit(false)
            return
          }
          const loginUser = await axios.post("/api/user/login", {
            ...data
          })

          setCookie(undefined, 'c.token', loginUser.data.token, {
            maxAge: 60 * 60 * 1  //1 hour
          })
          setMsg(loginUser.data.msg)
          setIsLoadingSubmit(false)
          router.push("/admin")
        }}
      >
        <Form className='w-full flex flex-col items-center text-[12px] gap-5 '>         
          <Field id="email" name="email" placeholder="Digite seu E-mail!" className="bg-c_lgray w-full p-3 rounded outline-c_orange text-center" />
          <div className='flex gap-2  w-full'>
            <Field id="password" name="password" type="password" placeholder="Digite sua Senha!" className="bg-c_lgray w-full p-3 rounded outline-c_orange text-center" />
          </div>
          <div className='w-[50%] flex items-center'>{isLoadingSubmit ? <ButtonFillLoading /> : <ButtonFill name='Fazer Cadastro'/>}</div>
        </Form>
      </Formik>
      {msg && (
        <>
        <div className='w-full my-8'><Bar /></div>
        <div className='w-full text-[12px] text-center'>{msg}</div>
        </>        
      )}
    </div>
  );
};
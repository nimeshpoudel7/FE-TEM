import React, { useState } from "react";
import {yupResolver} from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {useForm} from "react-hook-form";
import SignUp from "./SignUp";
import VerifyOtp from "./VerifyOtp";
import { useSignUpMCP } from "service/signup";
import { useSendOTP } from "service/signup";
import { useHistory } from "react-router-dom";


const schema = Yup.object().shape({
  type: Yup.object().shape({
    label: Yup.string().required(),
    value: Yup.string().required()
  }).nullable().required("Please choose business type"),
  full_name: Yup.string().required("Please enter full name "),
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Please enter email"),
  password: Yup.string().required("Password is required"),
});

const verifySchema=Yup.object().shape({
  mobile_number:Yup.string()
  .nullable()
  .typeError("That doesn't look like a phone number")
  .min(10, "A phone number should be 10 digits")
  .max(10,"A phone number should be 10 digits")
  .required("A phone number is required")
  .matches(/^\d{10}$/, "Enter a 10 digit valid phone number"),
  otp:Yup.string()
  .nullable()
  .typeError("That doesn't look like an OTP")
  .min(6, "OTP should be 6 digits")
  .max(6,"OTP should be 6 digits")
  .required("A phone number is required")
  .matches(/^\d{6}$/, "Enter a 6 digit valid OTP"),
})

function SignIn() {
 const[step,setStep]=useState(1)
 const {
  data,
  mutateAsync: mutateSignUp,
  isLoading,
} = useSignUpMCP();
const navigate = useHistory();

const {mutateAsync:mutateSendOTP}=useSendOTP();
 
  const defaultValues = {
    email: "",
    full_name: "",
    password: "",
    terms_agreed: false,
    type: null,
  };
  const verifyDefaultValues={
    mobile_number:"",
    otp:""
  }
  const {control, handleSubmit} = useForm({
    defaultValues: {
      ...defaultValues,
    },
    resolver: yupResolver(schema),
  });
  const {control:verifyControl,handleSubmit:verifyHandleSubmit,formState,getValues} = useForm({
    defaultValues: {
      ...verifyDefaultValues,
    },
    resolver: yupResolver(verifySchema),
  });
  const onSubmitHandler = async(data) => {
    const values={...data,type:data.type.value,terms_agreed:true
  };
  
  const response=await mutateSignUp(values)
  console.log(response)
  if(response?.data?.code===1){
    console.log("enter")
    setStep(2)
  }
  
  }
  const verifyOnSubmitHandler=async(data)=>{
    
    const response= await mutateSendOTP({action:"verify_otp",mobile_number:data?.mobile_number,purpose:"sign_up",key:data?.otp})
    if(response?.data?.code===1){
      console.log("respo",response)
      ///call checklist
          navigate.push("/auth/kycdetails")
    }else{
    }
  
    //toast
   }



  
  
  const handleOtp=async()=>{
   const values= getValues()
   if(values?.mobile_number?.length===10){
    //call api
   const response= await mutateSendOTP({action:"send_otp",mobile_number:values?.mobile_number,purpose:"sign_up"})
    
   }else{
    //toast
   }
  }
  return (
    step===1?
    <SignUp onSubmitHandler={onSubmitHandler} handleSubmit={handleSubmit} control={control} />
    :<VerifyOtp onSubmitHandler={verifyOnSubmitHandler} handleSubmit={verifyHandleSubmit} control={verifyControl} setStep={setStep} handleOtp={handleOtp}/>
  );

}
export default SignIn

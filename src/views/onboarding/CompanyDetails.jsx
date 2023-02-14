import React, { useEffect } from "react";
import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  SimpleGrid,
} from "@chakra-ui/react";
import TextInput from "components/forms/TextInput";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { usePostCompanyDetails } from "service/kyc";

const schema = Yup.object().shape({
  company_name: Yup.string().required("Name is required"),
  gst_no: Yup.string().nullable(true).notRequired().matches(/^[0-9]{2}[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}Z[0-9a-zA-Z]{1}$/,"Please enter Valid GST Number"),
  pan: Yup.string().required("PAN is required"),
});

const CompanyDetails = (props) => {
  const { companyData,userId, }=props
  const {
    data:comapnyRequestData,
    mutateAsync: mutateCompany,
  } = usePostCompanyDetails();
  
  const defaultValues = {
    company_name: companyData?.company_name ?? "",
    gst_no: companyData?.gst_no ?? null,
    pan: companyData?.pan ?? "",
    pin: companyData?.pin ?? "",
    city: companyData?.city ?? ""
  }
  const {
    control,
    reset,
    handleSubmit,
    formState: { isValid },
    setValue,
  } = useForm({
    defaultValues: {
      ...defaultValues,
    },
    companyData,
    resolver: yupResolver(schema),
  });
  useEffect(() => {
    reset(companyData)
  }, [companyData])

  const onSubmitHandler =async (data) => {
    console.log(data)
    const body={
        gst_no:data?.gst_no,
      company_name:data?.company_name,
      pan:data?.pan, 
      user_id:userId
    }
const onPersonal= await mutateCompany(body)
if(onPersonal?.data?.code==1){

  props?.onSelectChange(1);

}   };


  return (
    <AccordionItem m={3}>
      <h2>
        <AccordionButton>
          <Box as="span" flex="1" textAlign="left">
            Company Details
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <SimpleGrid columns={{ sm: "1", lg: "2" }} spacing={6} mt={4}>
            <TextInput name="company_name" control={control} type="text" label="Name of HUF" disabled={companyData?.company_name ? true : false} />
            <TextInput
              name="gst_no"
              control={control}
              type="text"
              label="GST number of HUF"
              disabled={companyData?.gst_no ? true : false}
            />
            <TextInput
              name="pan"
              control={control}
              type="text"
              label="Pan number of HUF"
            />
          </SimpleGrid>
          <Button
            fontSize="sm"
            variant="brand"
            fontWeight="500"
            w={{ sm: "100%", lg: "30%" }}
            h="50"
            mt="5px"
            mb="24px"
            type="submit"
          >
            Save and Continue
          </Button>
        </form>
      </AccordionPanel>
    </AccordionItem>
  );
};

export default CompanyDetails;

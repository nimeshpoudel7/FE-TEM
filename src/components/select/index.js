import { Select, Stack } from '@chakra-ui/react'
import React from 'react'

const SelectComponent = (props) => {
    const {placeholder,options,variants,filled,boxBg} = props
    console.log(options)
  const  handleChange = (event) =>
    {
        let selectedValue = event.target.value;
        props.onSelectChange(selectedValue);
    }
  return (
    <Stack spacing={3}>
    <Select variant={variants} bg={boxBg} placeholder={placeholder}  onChange={handleChange}> 
    {options.map((details)=>{
        console.log(details)
        return(
        <option value={details}>{details}</option>
        )
    })}
    </Select>
  </Stack>
  )
}

export default SelectComponent
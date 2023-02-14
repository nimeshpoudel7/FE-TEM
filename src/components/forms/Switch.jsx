import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Switch,
} from "@chakra-ui/react";
import React from "react";
import {  Controller } from "react-hook-form";


const SwitchInput = ({
  name,
  control,
  label,
  helperText,
  isRequired,
  disabled,
  ...extraProps
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        return (
          <FormControl
            display="flex"
            alignItems="center"
            id={name}
            isRequired={!!isRequired}
            isInvalid={!!error}
          >
            <FormLabel mb={0} ml={2}>
              {label}
            </FormLabel>
            <Switch
              id={name}
              placeholder=" "
              height={"inherit"}
              onChange={onChange}
              isChecked={value}
              isInvalid={!!error}
              errorBorderColor={"red.500"}
              disabled={disabled}
              {...extraProps}
            />

            <FormErrorMessage>{error ? error?.message : ""}</FormErrorMessage>
            {helperText ? <FormHelperText>{helperText}</FormHelperText> : ""}
          </FormControl>
        );
      }}
    />
  );
};
export default SwitchInput;

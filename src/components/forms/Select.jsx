import {
  Alert,
  AlertIcon,
  Box,
  FormControl,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import { Controller } from "react-hook-form";
import ReactSelect from "react-select";
import { selectStyles } from "./selectStyles";



function Select({
  size = "sm",
  control,
  name,
  isMulti,
  helperText,
  ...args
}) {
  return (
    <Box zIndex={6} w={"100%"}>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            <FormControl variant="floating" id={name} isInvalid={!!error} marginBottom={5}>
              <ReactSelect
                closeMenuOnSelect={!isMulti}
                {...field}
                styles={{
                  ...selectStyles,
                }}
                size={size}
                isMulti={isMulti}
                {...args}
              />
              <FormErrorMessage>{error ? error?.message : ""}</FormErrorMessage>
              {helperText ? (
                <FormHelperText>
                  <Alert status="warning">
                    <AlertIcon />
                    {helperText}
                  </Alert>
                </FormHelperText>
              ) : (
                ""
              )}
            </FormControl>
          </>
        )}
      />
    </Box>
  );
}

export default Select;

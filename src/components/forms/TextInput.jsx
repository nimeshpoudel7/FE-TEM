import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Textarea,
} from "@chakra-ui/react";
import React from "react";
import { Controller } from "react-hook-form";

const TextInput = ({
  name,
  control,
  label,
  type,
  helperText,
  isRequired,
  startIcon,
  disabled,
  endIcons,
  onIconClick,
  variant,
  noFloating,
  ...extraProps
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        return (
          <>
            <FormControl
              variant={noFloating ? "default" : "floating"}
              id={name}
              isRequired={!!isRequired}
              isInvalid={!!error}
              marginBottom={3}
            >
              {!noFloating && <FormLabel>{label}</FormLabel>}
              
              <InputGroup height={type !== "textarea" ? "46px" : "auto"}>
                {startIcon ? (
                  <InputLeftElement
                    top="12%"
                    pointerEvents="none"
                    onClick={onIconClick}
                  >
                    {startIcon}
                  </InputLeftElement>
                ) : (
                  ""
                )}
                {type === "textarea" ? (
                  <Textarea
                    paddingLeft={startIcon ? 9 : ""}
                    placeholder=" "
                    height={"inherit"}
                    onChange={onChange}
                    value={value ?? ""}
                    isInvalid={!!error}
                    errorBorderColor={"red.500"}
                    boxShadow="inset 0px 1px 1px rgba(0, 0, 0, 0.12)"
                    disabled={disabled}
                    variant={variant}
                    {...extraProps}
                  />
                ) : (
                  <Input
                    paddingLeft={startIcon ? 9 : ""}
                    placeholder={noFloating ? label : " "}
                    type={type}
                    height={"inherit"}
                    onChange={onChange}
                    value={value ?? ""}
                    isInvalid={!!error}
                    errorBorderColor={"red.500"}
                    disabled={disabled}
                    variant={variant}
                    {...extraProps}
                  />
                )}
                
                {endIcons ? (
                  <InputRightElement onClick={onIconClick} top="8%">
                    {endIcons}
                  </InputRightElement>
                ) : (
                  ""
                )}
              </InputGroup>

              <FormErrorMessage>{error ? error?.message : ""}</FormErrorMessage>
              {helperText ? <FormHelperText>{helperText}</FormHelperText> : ""}
            </FormControl>
          </>
        );
      }}
    />
  );
};
export default TextInput;

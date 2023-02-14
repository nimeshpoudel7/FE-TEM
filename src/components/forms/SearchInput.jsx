import { Search2Icon } from "@chakra-ui/icons";
import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
} from "@chakra-ui/react";
import React from "react";
import {  Controller } from "react-hook-form";


const SearchInput = ({
  name,
  label,
  type,
  control,
  helperText,
  isRequired,
  disabled,
  isLoading,
  isControlled,
  value,

  onSearch = () => {},
  ...extraProps
}) => {
  return isControlled ? (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        return (
          <>
            <FormControl
              variant="floating"
              isRequired={!!isRequired}
              isInvalid={!!error}
              id={name}
            >
              <InputGroup maxW={"350px"} h={"46px"}>
                <Input
                  ml={0.5}
                  h={"98%"}
                  placeholder=" "
                  onChange={e => {
                    onSearch(e.target.value);
                    onChange(e);
                  }}
                  value={value}
                  type={type}
                  isInvalid={!!error}
                  errorBorderColor={"red.500"}
                  backgroundColor="white"
                  disabled={disabled}
                  {...extraProps}
                />
                <FormLabel>{label}</FormLabel>

                <InputRightElement color="#FFFFFF" mr={2}>
                  <IconButton
                    type="submit"
                    top="6%"
                    size="md"
                    h={"85%"}
                    aria-label="customerCode"
                    disabled={extraProps.isDisabled}
                    icon={
                      isLoading ? (
                        <Spinner pos="absolute" size="md" />
                      ) : (
                        <Search2Icon width={18} height={18} />
                      )
                    }
                  />
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>{error ? error?.message : ""}</FormErrorMessage>
              {helperText ? <FormHelperText>{helperText}</FormHelperText> : ""}
            </FormControl>
          </>
        );
      }}
    />
  ) : (
    <FormControl variant="floating" isRequired={!!isRequired} id={name}>
      <InputGroup maxW={"350px"} h={"46px"}>
        <Input
          ml={0.5}
          h={"98%"}
          placeholder=" "
          onChange={e => {
            onSearch(e.target.value);
          }}
          value={value}
          type={type}
          errorBorderColor={"red.500"}
          backgroundColor="white"
          disabled={disabled}
          {...extraProps}
        />
        <FormLabel>{label}</FormLabel>

        <InputRightElement color="#FFFFFF" mr={2}>
          <IconButton
            type="submit"
            top="6%"
            size="md"
            h={"85%"}
            aria-label="customerCode"
            disabled={extraProps.isDisabled}
            icon={
              isLoading ? (
                <Spinner pos="absolute" size="md" />
              ) : (
                <Search2Icon width={18} height={18} />
              )
            }
          />
        </InputRightElement>
      </InputGroup>
      {helperText ? <FormHelperText>{helperText}</FormHelperText> : ""}
    </FormControl>
  );
};
export default SearchInput;

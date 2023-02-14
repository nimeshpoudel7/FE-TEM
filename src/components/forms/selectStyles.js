import chakraUiTheme from "@chakra-ui/theme";
const fontSizes = {
  sm: "0.875rem",
  md: "1rem",
  lg: "1.125rem",
};
const paddings = {
  sm: "6px 9px",
  md: "8px 12px",
  lg: "10px 15px",
};
const px = {
  sm: "0.75rem",
  md: "1rem",
  lg: "1rem",
};
export const selectStyles = {
  // When disabled, react-select sets the pointer-state to none
  // which prevents the `not-allowed` cursor style from chakra
  // from getting applied to the Control
  container: (
    provided,
    { selectProps: { hideContainerBorder, isSingleTimeDropdown } }
  ) => ({
    ...provided,
    pointerEvents: "auto",
    //flex: 1,
    width: isSingleTimeDropdown ? "60px" : "100%",
    backgroundColor: "#F7FAFC",
    borderColor: hideContainerBorder
      ? "white"
      : `${chakraUiTheme.colors.gray["200"]}`,
    height: "100%",
  }),
  input: (provided, { selectProps: { size } }) => ({
    ...provided,
    color: "inherit",
    lineHeight: "inherit",
    fontSize: fontSizes[size ?? "sm"],
    height: "37px",
  }),
  menu: (provided, { selectProps: { isSingleTimeDropdown } }) => ({
    ...provided,
    zIndex: 3,
    boxShadow: `0 0 0 1px ${chakraUiTheme.colors.gray["200"]}, 0 1px 1px ${chakraUiTheme.colors.gray["200"]}`,
    width: isSingleTimeDropdown ? "80px" : "100%",
    borderRadius: "6px",
  }),
  option: (provided, { selectProps: { size } }) => ({
    ...provided,
    fontSize: fontSizes[size ?? "sm"],
  }),
  control: (
    provided,
    {
      selectProps: { hasInputAddon, isSingleTimeDropdown, inheritControlBG },
      isDisabled,
    }
  ) => ({
    ...provided,
    borderColor: "inherit",
    ...(isDisabled && inheritControlBG ? { backgroundColor: "inherit" } : {}),
    "&:hover": {
      borderColor: "inherit",
      backgroundColor: isSingleTimeDropdown
        ? `${chakraUiTheme.colors.gray["100"]}`
        : "inherit",
      ...(isDisabled
        ? {
            cursor: "not-allowed",
            backgroundColor: "gray.100",
          }
        : {}),
    },
    borderRadius: hasInputAddon ? "0px 6px 6px 0px" : "6px",
    flex: 1,
  }),
  dropdownIndicator: (provided, { selectProps: { hideDropdownArrow } }) => {
    if (hideDropdownArrow) {
      return {
        display: "none",
      };
    } else {
      return { ...provided };
    }
  },
  valueContainer: (
    provided,
    {
      selectProps: {
        size,
        formatOptionLabel,
        disableLeftPaddingInValueContainer,
        value,
        isMulti,
      },
    }
  ) => {
    let padding = `0.125rem ${px[size ?? "sm"]}`;
    if (
      formatOptionLabel && isMulti ? (value )?.length : value
    ) {
      padding = `0.125rem ${px[size ?? "sm"]}`;
    }
    if (disableLeftPaddingInValueContainer) {
      padding = `0.41rem 0 0.41rem 0.25rem`;
    }
    return {
      ...provided,
      padding,
      overflow: "visible",
    };
  },
  placeholder: (provided, state) => ({
    ...provided,
    display:
      state.isFocused || state.hasValue || state.selectProps.inputValue
        ? "none"
        : "block",
  }),
  multiValueRemove: (
    provided,
    { selectProps: { disableMultiValueRemove }, isDisabled }
  ) => ({
    ...provided,
    ...(isDisabled && disableMultiValueRemove
      ? {
          visibility: "hidden",
          width: "4px",
        }
      : {}),
  }),
  multiValue: (
    provided,
    { selectProps: { hasInputAddon, hideSelectedValues, inheritMultiValueBG } }
  ) =>
    hasInputAddon
      ? {
          ...provided,
          borderRadius: "6px",
          backgroundColor: inheritMultiValueBG ? "inherit" : "#F1F3F6",
          padding: "4px 8px",
        }
      : hideSelectedValues
      ? { ...provided, display: "none" }
      : { ...provided },
  indicatorSeparator: () => ({
    display: "none",
  }),
  indicatorsContainer: provided => ({
    ...provided,
    color: chakraUiTheme.colors.gray["200"],
    "&:hover": {
      color: chakraUiTheme.colors.gray["200"],
    },
  }),
  loadingMessage: (provided, { selectProps: { size } }) => {
    return {
      ...provided,
      fontSize: fontSizes[size ?? "sm"],
      padding: paddings[size ?? "sm"],
    };
  },
};

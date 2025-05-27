import { StylesConfig } from "react-select";

export const selectOptionStyles: StylesConfig = {
  control: (styles, { isFocused }) => ({
    ...styles,
    padding: "0.1rem 0.25rem",
    outline: isFocused ? "1px solid #234E52" : "none", // custom outline on focus
    borderColor: isFocused ? "#234E52" : styles.borderColor,
    "&:hover": {
      borderColor: "#234E52",
    },
  }),
  option: (styles, { isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      backgroundColor: isDisabled
        ? undefined
        : isSelected
        ? "#234E52" // accent (selected)
        : isFocused
        ? "#CFE7F2" // toggle-bg (hover)
        : undefined,
      color: isDisabled
        ? "#BEE7F8" // border (disabled text)
        : isSelected
        ? "#E6F5FA" // bg (text on selected)
        : "#234E52", // text
      cursor: isDisabled ? "not-allowed" : "pointer",
      borderColor: isFocused ? "#234E52" : undefined,
      outlineColor: isFocused ? "#234E52" : undefined,

      ":active": {
        ...styles[":active"],
        outlineColor: isFocused ? "#234E52" : undefined,
        borderColor: isFocused ? "#234E52" : undefined,
        backgroundColor: !isDisabled
          ? isSelected
            ? "#F55655" // accent (active selected)
            : "#CFE7F2" // toggle-bg (active hover)
          : undefined,
      },
    };
  },
};

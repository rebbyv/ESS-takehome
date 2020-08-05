import { useState } from "react";

export const useInput = (initialValue, searchFunc) => {
  const [value, setValue] = useState(initialValue);

  return {
    value,
    setValue,
    reset: () => setValue(initialValue),
    bind: {
      value,
      onChange: event => {
        setValue(event.target.value);
        if (searchFunc) searchFunc(event.target.value);
      }
    }
  };
};
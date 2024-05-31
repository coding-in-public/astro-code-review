import { forwardRef } from "react";
import sanitize from "sanitize-html";

const FormInputWrapper = forwardRef(
  (
    {
      placeholder,
      name,
      handleBlur,
      state,
      updateState,
      icon,
    }: {
      placeholder: string;
      name: string;
      handleBlur: (
        state: string,
        ref: React.RefObject<HTMLLabelElement>
      ) => void;
      state: string;
      updateState: (state: string) => void;
      icon: JSX.Element;
    },
    ref: React.RefObject<HTMLLabelElement>
  ) => {
    return (
      <label
        className="flex items-center gap-2 rounded-md border border-astro-500 bg-astro-900 pr-4 pl-3 py-2 shadow-sm focus-within:bg-astro-800 focus-within:shadow-lg"
        ref={ref}
      >
        <span className="sr-only">{placeholder}</span>
        <input
          type="text"
          placeholder={placeholder}
          required
          className="bg-transparent placeholder-astro-300 focus:outline-none peer order-1"
          name={name}
          value={state}
          onChange={(e) => updateState(sanitize(e.target.value))}
          onBlur={() => handleBlur(state, ref)}
        />
        {icon}
      </label>
    );
  }
);
export default FormInputWrapper;

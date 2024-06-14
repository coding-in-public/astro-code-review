import Check from "@/icons/check";

type Props = {
  label: string;
  checked: boolean;
  onChangeHandler: () => void;
};

const Checkbox = ({ label, checked, onChangeHandler, ...rest }: Props) => {
  const inputId = Math.random();
  return (
    <div className="relative max-w-fit grid place-items-center items-center mx-auto">
      <input
        type="checkbox"
        checked={checked}
        className="absolute inset-0 peer opacity-0 cursor-pointer"
        id={`check-${inputId}`}
        {...rest}
        onChange={onChangeHandler}
      />
      <div
        className="size-6 border-2 border-astro-accent-pink rounded-md grid place-items-center text-astro-800 peer-checked:bg-astro-accent-pink peer-focus-visible:ring-2 ring-astro-accent-pink ring-offset-2 ring-offset-theme-base bg-astro-800"
        aria-hidden="true"
      >
        <Check />
      </div>
      <label htmlFor={`check-${inputId}`} className="sr-only">
        {label}
      </label>
    </div>
  );
};
export default Checkbox;

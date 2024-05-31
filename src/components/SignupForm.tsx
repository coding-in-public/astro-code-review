import { useEffect, useState, type FormEvent } from "react";
import sanitize from "sanitize-html";
import toast, { Toaster } from "react-hot-toast";

const SignupForm = () => {
  const [repo, setRepo] = useState("");
  const [name, setName] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setError("");
    if (name.length < 3 && repo.length < 5) {
      return;
    }
  }, [name, repo]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const honeypot = (e.target as HTMLFormElement).honeypot.value;
    if (honeypot) {
      return;
    }

    if (name.length < 3) {
      setDisabled(true);
      return setError("Name must be at least 3 characters long.");
    }

    setLoading(true);
    setDisabled(true);
  };

  return (
    <>
      <form
        className="mx-auto grid max-w-md place-items-center gap-3"
        onSubmit={handleSubmit}
      >
        <label className="flex items-center gap-2 rounded-md border border-astro-500 bg-astro-900 px-4 py-2 shadow-sm focus-within:bg-astro-800 focus-within:shadow-lg">
          <span className="sr-only">Your name</span>
          <svg
            width="15"
            height="16"
            viewBox="0 0 15 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M7.49999 1.375C6.62575 1.37384 5.78053 1.68866 5.12008 2.26147C4.45962 2.83427 4.02842 3.62646 3.90593 4.49208C3.78343 5.35771 3.97789 6.23844 4.45348 6.972C4.92908 7.70557 5.65375 8.24255 6.49399 8.484C5.29999 8.629 4.27599 9.051 3.50399 9.812C2.52199 10.779 2.02499 12.22 2.02499 14.1C2.02499 14.226 2.07504 14.3468 2.16412 14.4359C2.2532 14.525 2.37402 14.575 2.49999 14.575C2.62597 14.575 2.74679 14.525 2.83587 14.4359C2.92495 14.3468 2.97499 14.226 2.97499 14.1C2.97499 12.38 3.42799 11.22 4.17099 10.488C4.91499 9.755 6.02699 9.375 7.49999 9.375C8.97299 9.375 10.085 9.755 10.83 10.488C11.572 11.221 12.025 12.38 12.025 14.1C12.025 14.226 12.075 14.3468 12.1641 14.4359C12.2532 14.525 12.374 14.575 12.5 14.575C12.626 14.575 12.7468 14.525 12.8359 14.4359C12.9249 14.3468 12.975 14.226 12.975 14.1C12.975 12.22 12.478 10.78 11.495 9.812C10.725 9.052 9.69999 8.629 8.50599 8.484C9.34343 8.23983 10.0648 7.70203 10.5379 6.96917C11.011 6.23632 11.2042 5.3575 11.082 4.49379C10.9597 3.63009 10.5303 2.83937 9.87246 2.26656C9.21458 1.69375 8.3723 1.37723 7.49999 1.375ZM4.82499 5C4.82499 4.29055 5.10682 3.61015 5.60848 3.10849C6.11014 2.60683 6.79054 2.325 7.49999 2.325C8.20945 2.325 8.88984 2.60683 9.3915 3.10849C9.89316 3.61015 10.175 4.29055 10.175 5C10.175 5.70946 9.89316 6.38985 9.3915 6.89151C8.88984 7.39317 8.20945 7.675 7.49999 7.675C6.79054 7.675 6.11014 7.39317 5.60848 6.89151C5.10682 6.38985 4.82499 5.70946 4.82499 5Z"
              fill="#546375"
            />
          </svg>
          <input
            type="text"
            placeholder="Your name…"
            autoComplete="name"
            required
            className="bg-transparent placeholder-astro-300 focus:outline-none"
            value={name}
            onChange={(e) => setName(sanitize(e.target.value))}
          />
        </label>
        <input name="honeypot" type="text" className="hidden" />
        <label className="flex items-center gap-2 rounded-md border border-astro-500 bg-astro-900 px-4 py-2 shadow-sm focus-within:bg-astro-800 focus-within:shadow-lg">
          <span className="sr-only">Email address</span>
          <svg
            width="15"
            height="16"
            viewBox="0 0 15 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_1_192)">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1 2.5C0.734784 2.5 0.48043 2.60536 0.292893 2.79289C0.105357 2.98043 0 3.23478 0 3.5L0 12.5C0 12.7652 0.105357 13.0196 0.292893 13.2071C0.48043 13.3946 0.734784 13.5 1 13.5H14C14.2652 13.5 14.5196 13.3946 14.7071 13.2071C14.8946 13.0196 15 12.7652 15 12.5V3.5C15 3.23478 14.8946 2.98043 14.7071 2.79289C14.5196 2.60536 14.2652 2.5 14 2.5H1ZM1 3.5H14V4.425C13.9146 4.4249 13.831 4.44918 13.759 4.495L7.5 8.467L1.241 4.495C1.16898 4.44918 1.08536 4.4249 1 4.425V3.5ZM1 5.408V12.5H14V5.408L7.741 9.38C7.66893 9.42571 7.58534 9.44998 7.5 9.44998C7.41466 9.44998 7.33107 9.42571 7.259 9.38L1 5.408Z"
                fill="#546375"
              />
            </g>
            <defs>
              <clipPath id="clip0_1_192">
                <rect
                  width="15"
                  height="15"
                  fill="white"
                  transform="translate(0 0.5)"
                />
              </clipPath>
            </defs>
          </svg>

          <input
            type="text"
            placeholder="Your public repository…"
            required
            className="bg-transparent placeholder-astro-300 focus:outline-none"
            value={repo}
            onChange={(e) => setRepo(sanitize(e.target.value))}
          />
        </label>
        <button
          type="submit"
          className="relative w-full rounded-md border border-transparent bg-gradient-to-r from-astro-accent-red to-astro-accent-pink hover:to-astro-accent-dark-pink hover:transition-all px-4 py-3 leading-none shadow-sm [text-shadow:none] disabled:cursor-not-allowed disabled:border-astro-500 disabled:from-astro-800 disabled:to-astro-800 disabled:text-astro-400 flex items-center justify-center gap-2"
          disabled={disabled}
        >
          {loading ? (
            <>
              <span>Submitting…</span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute right-4 animate-spin"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83"
                />
              </svg>
            </>
          ) : (
            <>
              <span>Submit</span>
              <span className="absolute right-4">&rarr;</span>
            </>
          )}
        </button>
      </form>
      <Toaster
        toastOptions={{
          className: "",
          style: {
            border: "1px solid #445060",
            minWidth: "250px",
            background: "#23262D",
            color: "#eceff2",
            boxShadow:
              "-1px 4px 8px hsl(0 67.9% 52.4% / .2), 2px 3px 7px hsl(300 100% 63.5% / .1)",
          },
          success: {
            iconTheme: {
              primary: "#F340C6",
              secondary: "#eceff2",
            },
          },
        }}
      />
    </>
  );
};
export default SignupForm;

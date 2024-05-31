import { useEffect, useRef, useState, type FormEvent } from "react";
import sanitize from "sanitize-html";
import toast, { Toaster } from "react-hot-toast";
import Globe from "@/assets/Globe";
import Github from "@/assets/Github";
import Spinner from "@/assets/Spinner";

const SignupForm = () => {
  const [demoUrl, setDemoUrl] = useState("");
  const [repo, setRepo] = useState("");

  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const demoRef = useRef<HTMLLabelElement>(null);
  const repoRef = useRef<HTMLLabelElement>(null);

  const doesInputSeemValid = (input: string) => {
    if (input.length < 4) {
      return true;
    }
    if (!input.startsWith("https://")) {
      return false;
    }
    return true;
  };

  useEffect(() => {
    if (demoUrl.length < 4 || repo.length < 4) {
      return;
    }

    const isRepoProbsValid = doesInputSeemValid(repo);
    const isDemoUrlProbsValid = doesInputSeemValid(repo);
    if (isRepoProbsValid && isDemoUrlProbsValid) {
      setDisabled(false);
    }
  }, [repo, demoUrl]);

  const handleBlur = (
    state: string,
    ref: React.RefObject<HTMLLabelElement>
  ) => {
    const probsValid = doesInputSeemValid(state);
    if (!probsValid) {
      ref.current?.classList.add("border-astro-accent-pink");
      ref.current?.classList.remove("border-astro-500");
      toast.error("Provide the full URL (e.g., https://…)");
    } else {
      ref.current?.classList.remove("border-astro-accent-pink");
      ref.current?.classList.add("border-astro-500");
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const honeypot = (e.target as HTMLFormElement).honeypot.value;
    if (honeypot) {
      return;
    }

    if (demoUrl.length < 3) {
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
        <label
          className="flex items-center gap-2 rounded-md border border-astro-500 bg-astro-900 pr-4 pl-3 py-2 shadow-sm focus-within:bg-astro-800 focus-within:shadow-lg"
          ref={demoRef}
        >
          <span className="sr-only">Demo Site…</span>
          <input
            type="text"
            placeholder="Demo site URL…"
            required
            className="bg-transparent placeholder-astro-300 focus:outline-none peer order-1"
            value={demoUrl}
            onChange={(e) => setDemoUrl(sanitize(e.target.value))}
            onBlur={() => handleBlur(demoUrl, demoRef)}
          />
          <Globe className="size-5 text-astro-500 peer-focus:text-astro-200 pointer-events-none" />
        </label>
        <input name="honeypot" type="text" className="hidden" />
        <label
          className="flex  items-center gap-2 rounded-md border border-astro-500 bg-astro-900 pl-3 pr-4 py-2 shadow-sm focus-within:bg-astro-800 focus-within:shadow-lg"
          ref={repoRef}
        >
          <span className="sr-only">Your public repo</span>
          <input
            type="text"
            placeholder="Your public repo..."
            required
            className="bg-transparent placeholder-astro-300 focus:outline-none order-1 peer"
            value={repo}
            onChange={(e) => setRepo(sanitize(e.target.value))}
            onBlur={() => handleBlur(repo, repoRef)}
          />
          <Github className="size-5 text-astro-500 peer-focus:text-astro-200" />
        </label>
        <button
          type="submit"
          className="relative w-full rounded-md border border-transparent font-bold text-astro-800 bg-gradient-to-r from-astro-accent-red to-astro-accent-pink hover:to-astro-accent-dark-pink focus:outline-none focus-visible:ring-2 ring-black hover:transition-all px-4 py-3 leading-none shadow-sm [text-shadow:none] disabled:cursor-not-allowed disabled:border-astro-500 disabled:from-astro-800 disabled:to-astro-800 disabled:text-astro-400 flex items-center justify-center gap-2"
          disabled={disabled}
        >
          {loading ? (
            <>
              <span>Submitting…</span>
              <Spinner />
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

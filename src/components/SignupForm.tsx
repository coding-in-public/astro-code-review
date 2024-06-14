import Github from "@/assets/Github";
import Globe from "@/assets/Globe";
import Person from "@/assets/Person";
import Spinner from "@/assets/Spinner";
import { actions, isInputError } from "astro:actions";
import { useEffect, useRef, useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import sanitize from "sanitize-html";

const SignupForm = () => {
  const [name, setName] = useState("");
  const nameRef = useRef<HTMLLabelElement>(null);

  const [demoUrl, setDemoUrl] = useState("");
  const demoRef = useRef<HTMLLabelElement>(null);

  const [repo, setRepo] = useState("");
  const repoRef = useRef<HTMLLabelElement>(null);

  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleNameBlur = () => {
    if (name === "") {
      return;
    }
    if (name.length < 2) {
      nameRef.current?.classList.add("border-astro-accent-pink");
      nameRef.current?.classList.remove("border-astro-500");
      toast.error("Name must be at least 2 characters");
    } else {
      nameRef.current?.classList.remove("border-astro-accent-pink");
      nameRef.current?.classList.add("border-astro-500");
    }
  };

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
    if (demoUrl.length < 4 || repo.length < 4 || name.length < 2) {
      return;
    }

    const isRepoProbsValid = doesInputSeemValid(repo);
    const isDemoUrlProbsValid = doesInputSeemValid(repo);
    if (isRepoProbsValid && isDemoUrlProbsValid && name.length >= 2) {
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
    setLoading(true);
    setDisabled(true);

    const formData = new FormData(e.currentTarget);

    const honeypot = (e.target as HTMLFormElement).honeypot.value;
    if (honeypot) {
      return;
    }

    const { error } = await actions.review.safe(formData);

    if (error && isInputError(error)) {
      console.error(error);

      Object.entries(error.fields).forEach(([key, value]) => {
        if (key === "name") {
          nameRef.current?.classList.add("border-astro-accent-pink");
          nameRef.current?.classList.remove("border-astro-500");
          toast.error(`${value[0]} for ${key}`);
          return;
        }

        if (key === "demoUrl") {
          demoRef.current?.classList.add("border-astro-accent-pink");
          demoRef.current?.classList.remove("border-astro-500");
          toast.error(`${value[0]} for ${key}`);
          return;
        }

        if (key === "repoUrl") {
          repoRef.current?.classList.add("border-astro-accent-pink");
          repoRef.current?.classList.remove("border-astro-500");
          toast.error(`${value[0]} for ${key}`);
          return;
        }
        toast.error(`${value[0]} for ${key}`);
      });

      setDisabled(false);
      setLoading(false);
      return;
    }

    setName("");
    setDemoUrl("");
    setRepo("");
    setLoading(false);
    toast.success("Thanks for submitting your site!");
  };

  return (
    <>
      <form
        className="mx-auto grid max-w-md place-items-center gap-3"
        onSubmit={handleSubmit}
      >
        <input name="honeypot" type="text" className="hidden" />
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
            name="demoUrl"
            value={demoUrl}
            onChange={(e) => setDemoUrl(sanitize(e.target.value))}
            onBlur={() => handleBlur(demoUrl, demoRef)}
          />
          <Globe className="size-5 text-astro-500 peer-focus:text-astro-200 pointer-events-none" />
        </label>
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
            name="repoUrl"
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
    </>
  );
};
export default SignupForm;

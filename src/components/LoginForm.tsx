import Github from "@/assets/Github";
import Globe from "@/assets/Globe";
import Person from "@/assets/Person";
import Spinner from "@/assets/Spinner";
import { actions, isInputError } from "astro:actions";
import { useEffect, useRef, useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import sanitize from "sanitize-html";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const usernameRef = useRef<HTMLLabelElement>(null);

  const [password, setPassword] = useState("");
  const passwordRef = useRef<HTMLLabelElement>(null);

  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (username.length > 4 && password.length > 6) {
      setDisabled(false);
    }
  }, [username, password]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setDisabled(true);

    const formData = new FormData(e.currentTarget);

    const honeypot = (e.target as HTMLFormElement).honeypot.value;
    if (honeypot) {
      return;
    }

    const { error } = await actions.login.safe(formData);

    if (error && isInputError(error)) {
      console.error(error);

      Object.entries(error.fields).forEach(([key, value]) => {
        if (key === "name") {
          usernameRef.current?.classList.add("border-astro-accent-pink");
          usernameRef.current?.classList.remove("border-astro-500");
          toast.error(`${value[0]} for ${key}`);
          return;
        }

        if (key === "demoUrl") {
          passwordRef.current?.classList.add("border-astro-accent-pink");
          passwordRef.current?.classList.remove("border-astro-500");
          toast.error(`${value[0]} for ${key}`);
          return;
        }

        toast.error(`${value[0]} for ${key}`);
      });

      setLoading(false);
      return;
    }

    if (error) {
      toast.error("Nice try! Not authorized!");
      return setLoading(false);
    }

    setPassword("");
    setUsername("");
    setLoading(false);
    toast.success("Logged in!");
    setTimeout(() => {
      window.location.href = "/admin";
    }, 1200);
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
          ref={usernameRef}
        >
          <span className="sr-only">Your Username</span>
          <input
            type="text"
            placeholder="Your Username…"
            required
            className="bg-transparent placeholder-astro-300 focus:outline-none peer order-1"
            name="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(sanitize(e.target.value))}
          />
          <Person className="size-5 text-astro-500 peer-focus:text-astro-200 pointer-events-none" />
        </label>
        <label
          className="flex items-center gap-2 rounded-md border border-astro-500 bg-astro-900 pr-4 pl-3 py-2 shadow-sm focus-within:bg-astro-800 focus-within:shadow-lg"
          ref={passwordRef}
        >
          <span className="sr-only">Your Password…</span>
          <input
            type="password"
            placeholder="Your Password…"
            required
            className="bg-transparent placeholder-astro-300 focus:outline-none peer order-1"
            name="password"
            value={password}
            onChange={(e) => setPassword(sanitize(e.target.value))}
          />
          <Globe className="size-5 text-astro-500 peer-focus:text-astro-200 pointer-events-none" />
        </label>

        <button
          type="submit"
          className="relative w-full rounded-md border border-transparent font-bold text-astro-800 bg-gradient-to-r from-astro-accent-red to-astro-accent-pink hover:to-astro-accent-dark-pink focus:outline-none focus-visible:ring-2 ring-black hover:transition-all px-4 py-3 leading-none shadow-sm [text-shadow:none] disabled:cursor-not-allowed disabled:border-astro-500 disabled:from-astro-800 disabled:to-astro-800 disabled:text-astro-400 flex items-center justify-center gap-2"
          disabled={disabled}
        >
          {loading ? (
            <>
              <span>Logging In…</span>
              <Spinner />
            </>
          ) : (
            <>
              <span>Login</span>
            </>
          )}
        </button>
      </form>
    </>
  );
};
export default LoginForm;

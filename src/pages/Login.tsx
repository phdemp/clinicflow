import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useClinic } from "../state/store";

export function Login() {
  const { login } = useClinic();
  const navigate = useNavigate();
  const [email, setEmail] = useState("shuklajeetendra@gmail.com");
  const [password, setPassword] = useState("demo1234");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Enter email and password to continue.");
      return;
    }
    login(email);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-dvh bg-surface flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center gap-2 mb-6">
          <div className="h-11 w-11 rounded-2xl bg-primary flex items-center justify-center text-on-primary font-headline font-bold text-[18px]">
            C
          </div>
          <h1 className="font-headline text-[20px] font-bold text-on-surface">Jeetendra Clinic</h1>
          <p className="text-[13px] text-on-surface-variant">Jagatpura, Jaipur · Staff Login</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-surface-container-lowest rounded-2xl border border-outline-variant/40 shadow-sm p-6 flex flex-col gap-4"
        >
          <div>
            <label className="text-[11px] font-semibold text-outline uppercase tracking-wider">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@jeetendraclinic.com"
              className="mt-1 w-full h-11 px-3 rounded-lg border border-outline-variant bg-surface text-[14px] text-on-surface focus:outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="text-[11px] font-semibold text-outline uppercase tracking-wider">
              Password
            </label>
            <div className="relative mt-1">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full h-11 px-3 pr-10 rounded-lg border border-outline-variant bg-surface text-[14px] text-on-surface focus:outline-none focus:border-primary"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface-variant"
                tabIndex={-1}
              >
                <span className="material-symbols-outlined text-[18px]">
                  {showPassword ? "visibility_off" : "visibility"}
                </span>
              </button>
            </div>
          </div>

          {error && (
            <p className="text-[12px] text-status-cancelled-text bg-status-cancelled-bg border border-status-cancelled-border rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <div className="flex items-center justify-between text-[12px]">
            <label className="flex items-center gap-2 text-on-surface-variant">
              <input type="checkbox" defaultChecked className="accent-primary" />
              Remember me
            </label>
            <span className="text-primary font-semibold cursor-pointer">Forgot password?</span>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-primary hover:bg-primary-container text-on-primary text-[14px] font-semibold transition-colors shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]"
          >
            Sign in
          </button>

          <p className="text-[11px] text-outline text-center">
            Demo build — any email/password signs you in.
          </p>
        </form>

        <p className="text-[12px] text-on-surface-variant text-center mt-4">
          Patient? Use the{" "}
          <a href="/book" className="text-primary font-semibold">
            online booking portal
          </a>{" "}
          instead.
        </p>
      </div>
    </div>
  );
}

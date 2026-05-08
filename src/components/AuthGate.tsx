import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { getCurrentUser, loginUser, registerUser, logoutUser, type User } from "@/lib/users";

export function AuthGate({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setUser(getCurrentUser());
    setReady(true);
    const onChange = () => setUser(getCurrentUser());
    window.addEventListener("onecity:auth-change", onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener("onecity:auth-change", onChange);
      window.removeEventListener("storage", onChange);
    };
  }, []);

  if (!ready) return null;
  if (user) return <>{children}</>;
  return <AuthScreen />;
}

function AuthScreen() {
  const [mode, setMode] = useState<"register" | "login">("register");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setError("");
    if (mode === "register") {
      const r = registerUser({ email, username, password });
      if (!r.ok) setError(r.error || "Failed");
    } else {
      const r = loginUser(identifier, password);
      if (!r.ok) setError(r.error || "Failed");
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/20 blur-[120px]" />
      <div className="absolute right-0 top-0 h-[400px] w-[400px] rounded-full bg-accent/20 blur-[120px]" />

      <main className="relative z-10 container mx-auto flex min-h-screen items-center justify-center px-6 py-16">
        <div className="w-full max-w-md">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-accent">
              Members Area
            </span>
            <h1 className="mt-3 font-display text-4xl font-black uppercase md:text-5xl">
              One <span className="text-gradient-neon">City RP</span>
            </h1>
            <p className="mt-3 text-sm text-muted-foreground">
              {mode === "register"
                ? "Create your free account to enter the city."
                : "Welcome back. Sign in to continue."}
            </p>
          </div>

          <form
            onSubmit={submit}
            className="glass mt-8 space-y-4 rounded-2xl p-8 shadow-[var(--shadow-neon)]"
          >
            {mode === "register" ? (
              <>
                <Field label="Email">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    className={inputClass}
                    required
                  />
                </Field>
                <Field label="Username">
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    autoComplete="username"
                    className={inputClass}
                    required
                  />
                </Field>
                <Field label="Password">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="new-password"
                    className={inputClass}
                    required
                  />
                </Field>
              </>
            ) : (
              <>
                <Field label="Email or Username">
                  <input
                    type="text"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    autoComplete="username"
                    className={inputClass}
                    required
                  />
                </Field>
                <Field label="Password">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    className={inputClass}
                    required
                  />
                </Field>
              </>
            )}

            {error && (
              <p className="text-sm font-medium text-destructive">{error}</p>
            )}

            <button
              type="submit"
              className="w-full rounded-md bg-primary py-3 font-bold uppercase tracking-wider text-primary-foreground shadow-[var(--shadow-neon)] transition-transform hover:scale-[1.02]"
            >
              {mode === "register" ? "Create Account" : "Sign In"}
            </button>

            <p className="text-center text-xs text-muted-foreground">
              {mode === "register" ? "Already have an account?" : "New here?"}{" "}
              <button
                type="button"
                onClick={() => {
                  setError("");
                  setMode(mode === "register" ? "login" : "register");
                }}
                className="font-bold uppercase tracking-widest text-primary hover:underline"
              >
                {mode === "register" ? "Sign in" : "Register"}
              </button>
            </p>
          </form>
        </div>
      </main>
    </div>
  );
}

const inputClass =
  "mt-2 w-full rounded-md border border-border bg-input/50 px-4 py-2.5 text-foreground outline-none transition-all focus:border-primary focus:shadow-[var(--shadow-neon)]";

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  );
}

export function UserBadge() {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    setUser(getCurrentUser());
    const onChange = () => setUser(getCurrentUser());
    window.addEventListener("onecity:auth-change", onChange);
    return () => window.removeEventListener("onecity:auth-change", onChange);
  }, []);
  if (!user) return null;
  return (
    <div className="flex items-center gap-3">
      <span className="hidden text-xs uppercase tracking-widest text-muted-foreground md:inline">
        {user.username}
      </span>
      <button
        onClick={logoutUser}
        className="rounded-md border border-border px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:border-destructive hover:text-destructive"
      >
        Logout
      </button>
    </div>
  );
}

// Simple localStorage-backed user registry. NOT secure — for demo/local only.
export type User = {
  id: string;
  email: string;
  username: string;
  password: string; // plain (local demo)
  createdAt: number;
};

const USERS_KEY = "onecity_users";
const SESSION_KEY = "onecity_user_session";

export function getUsers(): User[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveUsers(users: User[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function getCurrentUser(): User | null {
  if (typeof window === "undefined") return null;
  try {
    const id = localStorage.getItem(SESSION_KEY);
    if (!id) return null;
    return getUsers().find((u) => u.id === id) || null;
  } catch {
    return null;
  }
}

export function registerUser(input: { email: string; username: string; password: string }): {
  ok: boolean;
  error?: string;
  user?: User;
} {
  const email = input.email.trim().toLowerCase();
  const username = input.username.trim();
  const password = input.password;
  if (!email || !username || !password)
    return { ok: false, error: "All fields are required." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return { ok: false, error: "Invalid email address." };
  if (username.length < 3)
    return { ok: false, error: "Username must be at least 3 characters." };
  if (password.length < 6)
    return { ok: false, error: "Password must be at least 6 characters." };

  const users = getUsers();
  if (users.some((u) => u.email === email))
    return { ok: false, error: "This email is already registered." };
  if (users.some((u) => u.username.toLowerCase() === username.toLowerCase()))
    return { ok: false, error: "This username is already taken." };

  const user: User = {
    id: crypto.randomUUID(),
    email,
    username,
    password,
    createdAt: Date.now(),
  };
  users.push(user);
  saveUsers(users);
  localStorage.setItem(SESSION_KEY, user.id);
  window.dispatchEvent(new CustomEvent("onecity:auth-change"));
  return { ok: true, user };
}

export function loginUser(identifier: string, password: string): {
  ok: boolean;
  error?: string;
  user?: User;
} {
  const id = identifier.trim().toLowerCase();
  const users = getUsers();
  const user = users.find(
    (u) => u.email === id || u.username.toLowerCase() === id,
  );
  if (!user || user.password !== password)
    return { ok: false, error: "Invalid credentials." };
  localStorage.setItem(SESSION_KEY, user.id);
  window.dispatchEvent(new CustomEvent("onecity:auth-change"));
  return { ok: true, user };
}

export function logoutUser() {
  localStorage.removeItem(SESSION_KEY);
  window.dispatchEvent(new CustomEvent("onecity:auth-change"));
}

import { authUrl } from "lib/authUrl";

function handleLogin() {
  window.location = authUrl();
}

export default function LoginComponent() {
  return (
    <main>
      <p>Please Login to use this Widget.</p>
      <button onClick={handleLogin}>Login</button>
    </main>
  );
}

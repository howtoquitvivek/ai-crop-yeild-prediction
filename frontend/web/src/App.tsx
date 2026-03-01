import { useContext, useState } from "react";
import { AuthContext } from "./context/AuthContext";
import Login from "./pages/Login";

function App() {
  const { user, loading, logout } = useContext(AuthContext);
  const [response, setResponse] = useState("");

  if (loading) return <div>Loading...</div>;
  if (!user) return <Login />;

  const callBackend = async () => {
    const token = await user.getIdToken();

    const res = await fetch("http://localhost:8080/api/test", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const text = await res.text();
    setResponse(text);
  };

  return (
    <div>
      <h2>Logged in as {user.email}</h2>

      <button onClick={callBackend}>Call Backend</button>
      <button onClick={logout} style={{ marginLeft: "10px" }}>
        Logout
      </button>

      <p>{response}</p>
    </div>
  );
}

export default App;
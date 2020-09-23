import Cookies from "js-cookie";
import LoginComponent from "../components/LoginComponent"
import PlayerComponent from "../components/PlayerComponent";

export default function Home() {
  if (typeof window == "undefined") return <div></div>;

  const accessToken = Cookies.get("access_token");

  return (
    <div className="container">
        {!accessToken ? <LoginComponent /> : <PlayerComponent token={accessToken}/>}
    </div>
  );
}

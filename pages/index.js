import Cookies from "js-cookie";
import LoginComponent from "components/LoginComponent";

export default function Home() {
  const access_token = Cookies.get("access_token") === 'undefined' ? null : Cookies.get("access_token") 
  const refresh_token = Cookies.get("refresh_token") === 'undefined' ? null : Cookies.get("refresh_token") 

  return (
    <div className="container">
      {!access_token ? (
        <LoginComponent />
      ) : (
        <div className="content">
          <p>Please add a new Browser Source in OBS with the URL</p>
          <p>{`https://spotifywidget.vercel.app/player?access_token=${access_token}&refresh_token=${refresh_token}`}</p>
        </div>
      )}
    </div>
  );
}

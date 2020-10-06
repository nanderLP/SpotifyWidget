import Cookies from "js-cookie";
import LoginComponent from "components/LoginComponent";

export default function Home(props) {
  const { access_token, refresh_token } = props;

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

export async function getServerSideProps(context) {
  return {
    props: context.query,
  };
}

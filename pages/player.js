import LoginComponent from "components/LoginComponent";
import PlayerComponent from "components/PlayerComponent";
import Cookies from "js-cookie";

export default function Player(props) {

  const {access_token, refresh_token} = props;

  if(!access_token && !refresh_token) {
    Cookies.set("access_token", access_token);
    Cookies.set("refresh_token", refresh_token);
  }

  return (
    <div className="container">
      <main>
        <PlayerComponent query={props}/>
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  return {
    props: context.query,
  };

  /*const { access_token, refresh_token } = context.query;
  if (!access_token && !refresh_token)
    return {
      props: {},
    };
  if (!access_token && refresh_token) {
    fetch("/api/refreshToken?refresh_token=" + refresh_token)
      .then((response) => response.json())
      .then((response) => {
        return {
          props: response,
        };
      });
  }
  if (access_token && refresh_token) {
    return {
      props: { access_token: access_token, refresh_token: refresh_token },
    };
  }

  return {
    props: {}, // at this point, i dont know what happened
  };*/
  // fucking hell
}

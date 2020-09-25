import LoginComponent from "components/LoginComponent";
import PlayerComponent from "components/PlayerComponent";
import { fetcher } from "lib/fetcher"
import useSWR from "swr";
import { useRouter } from "next/router";

export default function Player(props) {
  const router = useRouter();

  if (props === {}) router.push("/");

  const { access_token, refresh_token } = props;

  /*if(!access_token && refresh_token) {
    const { data, error } = useSWR("/api/refreshToken?refresh_token=" + refresh_token, fetcher);
    if(data) {

    }
  }*/

  return (
    <div className="container">
      <main>
        <PlayerComponent token={access_token} />
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

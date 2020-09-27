import LoginComponent from "components/LoginComponent";
import PlayerComponent from "components/PlayerComponent";
import Cookies from "js-cookie";
import { fetcher } from "lib/fetcher";
import useSWR from "swr";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Player(props) {
  const router = useRouter();

  let access_token = Cookies.get("access_token");
  let refresh_token = Cookies.get("refresh_token");

  if (props === {}) if (window != "undefined") router.push("/");

  if (refresh_token === undefined) {
    console.log("hi");
    Cookies.set("refresh_token", props.refresh_token);
    Cookies.set("access_token", props.access_token, {
      expires: 1 / 24, // one hour
    });
    //   if (typeof window != 'undefined') router.reload();
  } else {
    if (access_token === undefined) {
      // refresh access_token
      fetch("/api/refreshToken?refresh_token=" + refresh_token).then(
        (response) =>
          response.json().then((response) => {
            if (response.refresh_token)
              Cookies.set("refresh_token", response.refresh_token);
            Cookies.set("access_token", response.access_token, {
              expires: 1 / 24, // one hour
            });
            //        if (window !== 'undefined') router.reload();
          })
      );
    }
  }

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

import Cookies from "js-cookie";

export default function Callback(props) {
  const { code } = props;

  if (typeof window !== "undefined") {
    if (!code) router.push("/"); // that would be weird
  }

  fetch("/api/getToken?code=" + code)
    .then((response) => response.json())
    .then((res) => {
      Cookies.set("access_token", res.access_token);
      Cookies.set("refresh_token", res.refresh_token);
    });

  return (
    <div>
      <p>You are getting redirected in a couple seconds.</p>
    </div>
  );
}

export async function getServerSideProps(context) {
  return {
    props: context.query,
  };
}

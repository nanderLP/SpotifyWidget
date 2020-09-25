import Cookies from "js-cookie";
import useSWR from "swr";
import { useRouter } from "next/router";
import { fetcher } from "lib/fetcher";

export default function Callback(props) {
  const router = useRouter();

  const { code } = props;

  if (typeof window !== "undefined") {
    if (!code) router.push("/"); // that would be weird
  }

  const { data, error } = useSWR("/api/getToken?code=" + code, fetcher);

  if (error) {
    console.error(error);
    return (
      <div>
        <p>An error occurred</p>
      </div>
    );
  }

  if (data) {
    Cookies.set("access_token", data.access_token, {
      expires: 1/12
    });
    Cookies.set("refresh_token", data.refresh_token);
    router.push("/");
  }

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

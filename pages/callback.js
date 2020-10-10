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
    router.push({
      pathname: '/',
      query: {access_token: data.access_token, refresh_token: data.refresh_token}
    }, '/'); // make it look clean
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

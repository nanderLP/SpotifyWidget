export const fetcher = async (...args) => {
  const res = await fetch(...args);
  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");
    error.info = await res.json();
    error.status = res.status;
    throw error;
  } else if (res.status == 204) {
    const error = new Error("Nothing is being played at the moment.");
    error.status = res.status;
    throw error;
  } else return await res.json();
};

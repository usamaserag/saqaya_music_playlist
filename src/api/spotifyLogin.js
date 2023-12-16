const client_id = `${process.env.REACT_APP_CLIENT_ID}`;
const redirect_uri = "http://localhost:3000/";
const scope = [
  "user-read-email",
  "user-read-private",
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-top-read",
  "user-modify-playback-state",
  "user-read-playback-state",
  "playlist-modify-public",
  "playlist-modify-private"
];

export const loginURL = `https://accounts.spotify.com/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope.join(
  " "
)}&response_type=token&show_dialog=true`;

export const getToken = () => {
  const params = new URLSearchParams(window.location.hash.substring(1));
  const accessToken = params.get("access_token");

  if (accessToken) {
    localStorage.setItem("accessToken", accessToken);
  }

  return accessToken;
};

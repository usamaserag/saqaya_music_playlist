const client_id = "febc1979b59e4b039c3e570547f5ae06";
const redirect_uri = "http://localhost:3000/";
const scope = [
  "user-read-email",
  "user-read-private",
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-top-read",
  "user-modify-playback-state",
  "user-read-playback-state",
];

export const loginUrl = `https://accounts.spotify.com/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope.join(
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


// export const getToken = async () => {
//   const clientId = "febc1979b59e4b039c3e570547f5ae06";
//   const clientSecret = "6812a53cc3454942a6cdb17b86cb8176";

//   const requestOptions = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/x-www-form-urlencoded",
//     },
//     body:
//       "grant_type=client_credentials&client_id=" +
//       clientId +
//       "&client_secret=" +
//       clientSecret,
//   };

//   try {
//     const response = await fetch(
//       "https://accounts.spotify.com/api/token",
//       requestOptions
//     );
//     const data = await response.json();
//     return data.access_token;
//   } catch (error) {
//     console.error("Error:", error);
//     throw error; // You might want to handle the error in the calling code
//   }
// };



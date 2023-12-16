const BASE_URL = "https://api.spotify.com/v1";

const apiService = {
  get: async (endpoint, headers = {}) => {
    try {
      const response = await fetch(`${BASE_URL}/${endpoint}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return await response.json();
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  },
  post: async (endpoint, headers = {}) => {
    try {
      const response = await fetch(`${BASE_URL}/${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
      });
      return await response.json();
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  },
  createPlaylist: async (playlistName, playlistDescription, headers = {}) => {
    try {
      const response = await fetch(`${BASE_URL}/me/playlists`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
        body: JSON.stringify({
          name: playlistName,
          description: playlistDescription,
          public: true,
        }),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error creating playlist:", error);
      throw error;
    }
  },
  addTrackToPlaylist: async (playlistId, trackUri, headers = {}) => {
    try {
      const response = await fetch(`${BASE_URL}/playlists/${playlistId}/tracks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
        body: JSON.stringify({
          uris: [`spotify:track:${trackUri}`],
          "position": 0
        }),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error adding track to playlist:", error);
      throw error;
    }
  },
};

export default apiService;

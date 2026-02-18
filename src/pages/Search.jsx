import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  const [videos, setVideos] = useState([]);

  useEffect(() => {
    if (!query) return;

    fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=12&q=${query}&key=${API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => setVideos(data.items));
  }, [query]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Results for: {query}</h2>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {videos.map((video) => (
          <div key={video.id.videoId} style={{ width: "250px" }}>
            <img
              src={video.snippet.thumbnails.medium.url}
              alt=""
              style={{ width: "100%" }}
            />
            <p>{video.snippet.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;

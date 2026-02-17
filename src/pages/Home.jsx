import React, { useEffect, useState } from "react";
import Shimmer from "../components/Shimmer";
import styles from "./Home.module.css"; 

const YOUTUBE_API_URL = "https://www.googleapis.com/youtube/v3/search";

function Home() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(
          `${YOUTUBE_API_URL}?part=snippet&maxResults=12&q=trending&type=video&key=${API_KEY}`
        );
        const data = await response.json();
        setVideos(data.items || []);
      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [API_KEY]);

  if (loading) return <Shimmer />;

  return (
    <div className={styles.videoGrid}>
      {videos.map((video) => (
        <div key={video.id.videoId} className={styles.videoCard}>
          <a href={`/watch/${video.id.videoId}`}>
            <img
              src={video.snippet.thumbnails.medium.url}
              alt={video.snippet.title}
              className={styles.thumbnail}
            />
            <div className={styles.videoInfo}>
              <h4 className={styles.videoTitle}>{video.snippet.title}</h4>
              <p className={styles.channelName}>{video.snippet.channelTitle}</p>
            </div>
          </a>
        </div>
      ))}
    </div>
  );
}

export default Home;

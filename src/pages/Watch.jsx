import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Shimmer from "../components/Shimmer";
import styles from "./Watch.module.css";

const YOUTUBE_API_URL = "https://www.googleapis.com/youtube/v3/videos";
const YOUTUBE_SEARCH_URL = "https://www.googleapis.com/youtube/v3/search";

function Watch() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        // Fetch main video details
        const response = await fetch(
          `${YOUTUBE_API_URL}?part=snippet,statistics&id=${id}&key=${API_KEY}`
        );
        const data = await response.json();
        if (data.items && data.items.length > 0) {
          setVideo(data.items[0]);
        }

        // Fetch related videos
        const related = await fetch(
          `${YOUTUBE_SEARCH_URL}?part=snippet&relatedToVideoId=${id}&type=video&maxResults=10&key=${API_KEY}`
        );
        const relatedData = await related.json();
        setRelatedVideos(relatedData.items || []);
      } catch (error) {
        console.error("Error fetching video:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
  }, [id, API_KEY]);

  if (loading) return <Shimmer />;

  if (!video) return <p>Video not found.</p>;

  const { snippet, statistics } = video;

  return (
    <div className={styles.watchPage}>
      <div className={styles.mainVideo}>
        <div className={styles.videoPlayer}>
          <iframe
            width="100%"
            height="500px"
            src={`https://www.youtube.com/embed/${id}`}
            title={snippet.title}
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>

        <div className={styles.videoDetails}>
          <h2 className={styles.title}>{snippet.title}</h2>
          <p className={styles.channel}>{snippet.channelTitle}</p>
          <p className={styles.stats}>
            {statistics.viewCount} views • {statistics.likeCount} likes
          </p>
          <p className={styles.description}>{snippet.description}</p>
        </div>
      </div>

      <div className={styles.relatedVideos}>
        <h3>Related Videos</h3>
        <div className={styles.relatedGrid}>
          {relatedVideos.map((vid) => (
            <a
              key={vid.id.videoId}
              href={`/watch/${vid.id.videoId}`}
              className={styles.relatedCard}
            >
              <img
                src={vid.snippet.thumbnails.medium.url}
                alt={vid.snippet.title}
              />
              <p className={styles.relatedTitle}>{vid.snippet.title}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Watch;

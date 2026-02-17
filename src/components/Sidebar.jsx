import { Link } from "react-router-dom";
import styles from "./Sidebar.module.css";

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Link className={styles.link} to="/">Home</Link>
      <Link className={styles.link} to="/watch/1">Watch</Link>
      <Link className={styles.link} to="/upload">Upload</Link>
      <Link className={styles.link} to="/profiles">Profile</Link>
    </div>
  );
}

export default Sidebar;

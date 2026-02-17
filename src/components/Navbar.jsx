import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className={styles.navbar}>
      {/* Left - Logo */}
      <Link to="/" className={styles.logo}>
        Harsh's Stream App
      </Link>

      {/* Center - Search */}
      <div className={styles.searchBox}>
        <input type="text" placeholder="Search videos..." />
        <button>Search</button>
      </div>

      {/* Right - Actions */}
      <div className={styles.actions}>
        <Link to="/upload" className={styles.uploadBtn}>
          Upload
        </Link>
        <div className={styles.profile}>👤</div>
      </div>
    </div>
  );
}

export default Navbar;

import styles from "./Navbar.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (query.trim() !== "") {
      navigate(`/search?q=${query}`);
      setQuery("");
    }
  };

  return (
    <div className={styles.navbar}>
      {/* Left - Logo */}
      <Link to="/" className={styles.logo}>
        Harsh's Stream App
      </Link>

      {/* Center - Search */}
      <div className={styles.searchBox}>
        <input
          type="text"
          placeholder="Search videos..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button onClick={handleSearch}>Search</button>
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

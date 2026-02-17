function Shimmer() {
  return (
    <div className="shimmer-container">
      {Array(12)
        .fill("")
        .map((_, index) => (
          <div className="shimmer-card" key={index}>
            <div className="shimmer-thumbnail"></div>
            <div className="shimmer-text title"></div>
            <div className="shimmer-text channel"></div>
          </div>
        ))}
    </div>
  );
}

export default Shimmer;

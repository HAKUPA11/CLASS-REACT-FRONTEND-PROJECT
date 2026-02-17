import { useParams } from "react-router-dom";

function Watch() {
  const { id } = useParams();

  return (
    <div>
      <h1>Watch Page</h1>
      <p>Video ID: {id}</p>
    </div>
  );
}

export default Watch;

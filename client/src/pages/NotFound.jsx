import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div>
      <div>
        <h1>404</h1>
        <Link to="/">This page could not be found </Link>
      </div>
    </div>
  );
}

export default NotFound;

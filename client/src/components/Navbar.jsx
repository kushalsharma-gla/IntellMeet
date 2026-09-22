import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/">
        <h2>IntellMeet</h2>
      </Link>

      <div className="nav-buttons">
        <Link to="/login">
          <button>Login</button>
        </Link>

        <Link to="/register">
          <button>Register</button>
        </Link>
      </div>
    </nav>
  )
}

export default Navbar
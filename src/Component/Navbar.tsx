import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="#">
          Navbar
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className="nav-link active"
                aria-current="page"
                to="/counter"
              >
                Counter App
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/todoApp">
                Todo App
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Soltrx">
                Sol transfer App
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/tokenCreator">
                Create Token
              </Link>
            </li>
             <li className="nav-item">
              <Link className="nav-link" to="/stake">
               Staking
              </Link>
            </li>
          </ul>

          <WalletMultiButton />
        </div>
      </div>
    </nav>
  );
};

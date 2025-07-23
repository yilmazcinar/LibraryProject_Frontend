import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";
import libraryBackground from "./assets/library-background.jpg";

// Components
import HomePage from "./pages/HomePage";
import AuthorsPage from "./pages/AuthorsPage";
import PublishersPage from "./pages/PublishersPage";
import CategoriesPage from "./pages/CategoriesPage";
import BooksPage from "./pages/BooksPage";
import BorrowingsPage from "./pages/BorrowingsPage";
import ApiTestPage from "./pages/ApiTestPage";
import ContactPage from "./pages/ContactPage";
import ToastContainer from "./components/ToastContainer";

function App() {
  useEffect(() => {
    document.body.style.backgroundImage = `url(${libraryBackground})`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundAttachment = "fixed";
    document.body.style.backgroundRepeat = "no-repeat";

    return () => {
      document.body.style.backgroundImage = "";
      document.body.style.backgroundSize = "";
      document.body.style.backgroundPosition = "";
      document.body.style.backgroundAttachment = "";
      document.body.style.backgroundRepeat = "";
    };
  }, []);

  return (
    <Router>
      <div className="App">
        {/* Navigation */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <div className="container">
            <Link className="navbar-brand" to="/">
              <i className="bi bi-book me-2"></i>
              BookHole
            </Link>

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    <i className="bi bi-house me-1"></i>Ana Sayfa
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/books">
                    <i className="bi bi-book me-1"></i>Kitaplar
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/authors">
                    <i className="bi bi-person me-1"></i>Yazarlar
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/publishers">
                    <i className="bi bi-building me-1"></i>Yayınevleri
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/categories">
                    <i className="bi bi-tags me-1"></i>Kategoriler
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/borrowings">
                    <i className="bi bi-arrow-left-right me-1"></i>Ödünç
                    İşlemleri
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/api-test">
                    <i className="bi bi-gear me-1"></i>API Test
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/contact">
                    <i className="bi bi-envelope me-1"></i>İletişim
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="container-fluid mt-3">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/books" element={<BooksPage />} />
            <Route path="/authors" element={<AuthorsPage />} />
            <Route path="/publishers" element={<PublishersPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/borrowings" element={<BorrowingsPage />} />
            <Route path="/api-test" element={<ApiTestPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="py-3 mt-5">
          <div className="container">
            {/* Navigation Links */}
            <div className="d-flex flex-wrap justify-content-center gap-3 mb-3">
              <Link to="/" className="text-decoration-none text-white">
                <i className="bi bi-house me-1"></i>Ana Sayfa
              </Link>
              <Link to="/books" className="text-decoration-none text-white">
                <i className="bi bi-book me-1"></i>Kitaplar
              </Link>
              <Link to="/authors" className="text-decoration-none text-white">
                <i className="bi bi-person me-1"></i>Yazarlar
              </Link>
              <Link
                to="/publishers"
                className="text-decoration-none text-white"
              >
                <i className="bi bi-building me-1"></i>Yayınevleri
              </Link>
              <Link
                to="/categories"
                className="text-decoration-none text-white"
              >
                <i className="bi bi-tags me-1"></i>Kategoriler
              </Link>
              <Link
                to="/borrowings"
                className="text-decoration-none text-white"
              >
                <i className="bi bi-arrow-left-right me-1"></i>Ödünç İşlemleri
              </Link>
            </div>

            {/* Footer Bottom */}
            <div className="text-center">
              <p className="mb-0 text-white">
                © 2025 BookHole. Tüm hakları saklıdır.
              </p>
            </div>
          </div>
        </footer>

        {/* Toast Container */}
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { bookService } from "../services/bookService";
import { authorService } from "../services/authorService";
import { categoryService } from "../services/categoryService";
import { publisherService } from "../services/publisherService";
import { borrowingService } from "../services/borrowingService";

function HomePage() {
  const [stats, setStats] = useState({
    totalBooks: 0,
    totalAuthors: 0,
    totalPublishers: 0,
    totalCategories: 0,
    totalBorrowings: 0,
    activeBorrowings: 0,
    overdueBorrowings: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const [books, authors, categories, publishers, borrowings] =
        await Promise.all([
          bookService.getAllBooks(),
          authorService.getAllAuthors(),
          categoryService.getAllCategories(),
          publisherService.getAllPublishers(),
          borrowingService.getAllBorrowings(),
        ]);

      const activeBorrowings = borrowings.filter((b) => b.status === "active");

      const overdueBorrowings = borrowings.filter(
        (b) => b.status === "overdue"
      );

      console.log("Tüm ödünç kayıtları:", borrowings);
      console.log("Sadece aktif ödünç kayıtları:", activeBorrowings);
      console.log("Vadesi geçmiş ödünç kayıtları:", overdueBorrowings);
      console.log("Aktif ödünç sayısı:", activeBorrowings.length);

      setStats({
        totalBooks: books.length,
        totalAuthors: authors.length,
        totalPublishers: publishers.length,
        totalCategories: categories.length,
        totalBorrowings: borrowings.length,
        activeBorrowings: activeBorrowings.length,
        overdueBorrowings: overdueBorrowings.length,
      });
    } catch (error) {
      console.error("İstatistikler yüklenirken hata:", error);
      if (window.showToast) {
        window.showToast("İstatistikler yüklenirken hata oluştu", "error");
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Yükleniyor...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mb-5 pb-4">
      {/* Hero Section */}
      <div className="jumbotron">
        <h1 className="display-4">Kütüphane Yönetim Sistemi</h1>
        <p className="lead">
          Kitapları, yazarları ve ödünç alma işlemlerini kolayca yönetin.
        </p>
        <hr className="my-4" />
        <p>
          Kitap koleksiyonunuzu düzenleyin, yazarları takip edin ve ödünç alma
          işlemlerini kayıt altına alın.
        </p>
        <Link className="btn-library-primary btn-lg" to="/books" role="button">
          Kitaplara Göz At
        </Link>
      </div>

      {/* Statistics Cards */}
      <div className="row mb-5">
        <div className="col-md-6 col-lg-4 mb-3">
          <Link to="/books" className="text-decoration-none">
            <div
              className="card text-center border-primary h-100"
              style={{ cursor: "pointer", transition: "transform 0.2s" }}
              onMouseEnter={(e) =>
                (e.target.closest(".card").style.transform = "scale(1.05)")
              }
              onMouseLeave={(e) =>
                (e.target.closest(".card").style.transform = "scale(1)")
              }
            >
              <div className="card-body">
                <i className="bi bi-book display-4 text-primary"></i>
                <h5 className="card-title mt-3">Toplam Kitap</h5>
                <h2 className="text-primary">{stats.totalBooks}</h2>
              </div>
            </div>
          </Link>
        </div>

        <div className="col-md-6 col-lg-4 mb-3">
          <Link to="/authors" className="text-decoration-none">
            <div
              className="card text-center border-success h-100"
              style={{ cursor: "pointer", transition: "transform 0.2s" }}
              onMouseEnter={(e) =>
                (e.target.closest(".card").style.transform = "scale(1.05)")
              }
              onMouseLeave={(e) =>
                (e.target.closest(".card").style.transform = "scale(1)")
              }
            >
              <div className="card-body">
                <i className="bi bi-person display-4 text-success"></i>
                <h5 className="card-title mt-3">Toplam Yazar</h5>
                <h2 className="text-success">{stats.totalAuthors}</h2>
              </div>
            </div>
          </Link>
        </div>

        <div className="col-md-6 col-lg-4 mb-3">
          <Link to="/publishers" className="text-decoration-none">
            <div
              className="card text-center border-warning h-100"
              style={{ cursor: "pointer", transition: "transform 0.2s" }}
              onMouseEnter={(e) =>
                (e.target.closest(".card").style.transform = "scale(1.05)")
              }
              onMouseLeave={(e) =>
                (e.target.closest(".card").style.transform = "scale(1)")
              }
            >
              <div className="card-body">
                <i className="bi bi-building display-4 text-warning"></i>
                <h5 className="card-title mt-3">Toplam Yayınevi</h5>
                <h2 className="text-warning">{stats.totalPublishers}</h2>
              </div>
            </div>
          </Link>
        </div>

        <div className="col-md-6 col-lg-4 mb-3">
          <Link to="/categories" className="text-decoration-none">
            <div
              className="card text-center border-info h-100"
              style={{ cursor: "pointer", transition: "transform 0.2s" }}
              onMouseEnter={(e) =>
                (e.target.closest(".card").style.transform = "scale(1.05)")
              }
              onMouseLeave={(e) =>
                (e.target.closest(".card").style.transform = "scale(1)")
              }
            >
              <div className="card-body">
                <i className="bi bi-tags display-4 text-info"></i>
                <h5 className="card-title mt-3">Toplam Kategori</h5>
                <h2 className="text-info">{stats.totalCategories}</h2>
              </div>
            </div>
          </Link>
        </div>

        <div className="col-md-6 col-lg-4 mb-3">
          <Link to="/borrowings" className="text-decoration-none">
            <div
              className="card text-center border-danger h-100"
              style={{ cursor: "pointer", transition: "transform 0.2s" }}
              onMouseEnter={(e) =>
                (e.target.closest(".card").style.transform = "scale(1.05)")
              }
              onMouseLeave={(e) =>
                (e.target.closest(".card").style.transform = "scale(1)")
              }
            >
              <div className="card-body">
                <i className="bi bi-arrow-left-right display-4 text-danger"></i>
                <h5 className="card-title mt-3">Aktif Ödünç</h5>
                <h2 className="text-danger">{stats.activeBorrowings}</h2>
                <small className="text-muted d-block mt-1">
                  Sadece aktif durumda olanlar
                </small>
              </div>
            </div>
          </Link>
        </div>

        <div className="col-md-6 col-lg-4 mb-3">
          <Link to="/borrowings" className="text-decoration-none">
            <div
              className="card text-center border-secondary h-100"
              style={{ cursor: "pointer", transition: "transform 0.2s" }}
              onMouseEnter={(e) =>
                (e.target.closest(".card").style.transform = "scale(1.05)")
              }
              onMouseLeave={(e) =>
                (e.target.closest(".card").style.transform = "scale(1)")
              }
            >
              <div className="card-body">
                <i className="bi bi-clock-history display-4 text-secondary"></i>
                <h5 className="card-title mt-3">Toplam İşlem</h5>
                <h2 className="text-secondary">{stats.totalBorrowings}</h2>
              </div>
            </div>
          </Link>
        </div>

        <div className="col-md-6 col-lg-4 mb-3">
          <Link to="/borrowings" className="text-decoration-none">
            <div
              className="card text-center border-warning h-100"
              style={{ cursor: "pointer", transition: "transform 0.2s" }}
              onMouseEnter={(e) =>
                (e.target.closest(".card").style.transform = "scale(1.05)")
              }
              onMouseLeave={(e) =>
                (e.target.closest(".card").style.transform = "scale(1)")
              }
            >
              <div className="card-body">
                <i className="bi bi-exclamation-triangle display-4 text-warning"></i>
                <h5 className="card-title mt-3">Vadesi Geçmiş</h5>
                <h2 className="text-warning">{stats.overdueBorrowings}</h2>
                <small className="text-muted d-block mt-1">
                  Gecikmiş iadeler
                </small>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="row">
        <div className="col-12">
          <h3 className="mb-4">Hızlı İşlemler</h3>
        </div>

        <div className="col-md-6 col-lg-3 mb-3">
          <div className="card h-100">
            <div className="card-body text-center">
              <i className="bi bi-plus-circle display-4 text-primary mb-3"></i>
              <h5 className="card-title">Yeni Kitap Ekle</h5>
              <p className="card-text">Kütüphaneye yeni kitap ekleyin</p>
              <Link to="/books" className="btn btn-primary">
                Kitaplar Sayfası
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3 mb-3">
          <div className="card h-100">
            <div className="card-body text-center">
              <i className="bi bi-person-plus display-4 text-success mb-3"></i>
              <h5 className="card-title">Yeni Yazar Ekle</h5>
              <p className="card-text">Sisteme yeni yazar kaydedin</p>
              <Link to="/authors" className="btn btn-success">
                Yazarlar Sayfası
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3 mb-3">
          <div className="card h-100">
            <div className="card-body text-center">
              <i className="bi bi-arrow-down-circle display-4 text-warning mb-3"></i>
              <h5 className="card-title">Kitap Ödünç Ver</h5>
              <p className="card-text">Yeni ödünç alma işlemi</p>
              <Link to="/borrowings" className="btn btn-warning">
                Ödünç İşlemleri
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3 mb-3">
          <div className="card h-100">
            <div className="card-body text-center">
              <i className="bi bi-search display-4 text-info mb-3"></i>
              <h5 className="card-title">Kitap Ara</h5>
              <p className="card-text">Kütüphanede kitap arayın</p>
              <Link to="/books" className="btn btn-info">
                Kitaplarda Ara
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;

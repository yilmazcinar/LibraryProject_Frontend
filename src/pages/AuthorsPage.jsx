import { useState, useEffect } from "react";
import { authorService } from "../services/authorService";

function AuthorsPage() {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingAuthor, setEditingAuthor] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    birthDate: "",
    country: "",
  });

  useEffect(() => {
    fetchAuthors();
  }, []);

  useEffect(() => {
    // Bootstrap tooltip'lerini aktifleştir
    const initializeTooltips = () => {
      const tooltipTriggerList = [].slice.call(
        document.querySelectorAll('[data-bs-toggle="tooltip"]')
      );

      if (window.bootstrap && window.bootstrap.Tooltip) {
        tooltipTriggerList.map(function (tooltipTriggerEl) {
          return new window.bootstrap.Tooltip(tooltipTriggerEl, {
            delay: { show: 0, hide: 0 },
            trigger: "hover",
          });
        });
      }
    };

    const timeoutId = setTimeout(initializeTooltips, 100);

    return () => {
      clearTimeout(timeoutId);

      if (window.bootstrap && window.bootstrap.Tooltip) {
        const tooltipTriggerList = [].slice.call(
          document.querySelectorAll('[data-bs-toggle="tooltip"]')
        );
        tooltipTriggerList.forEach((tooltipTriggerEl) => {
          const tooltip =
            window.bootstrap.Tooltip.getInstance(tooltipTriggerEl);
          if (tooltip) {
            tooltip.dispose();
          }
        });
      }
    };
  }, [authors]);

  const fetchAuthors = async () => {
    try {
      setLoading(true);
      const response = await authorService.getAllAuthors();
      setAuthors(response);
    } catch (error) {
      console.error("Yazarlar yüklenirken hata:", error);
      if (window.showToast) {
        window.showToast("Yazarlar yüklenirken hata oluştu", "error");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingAuthor) {
        await authorService.updateAuthor(editingAuthor.id, formData);
        if (window.showToast) {
          window.showToast("Yazar başarıyla güncellendi", "success");
        }
      } else {
        await authorService.createAuthor(formData);
        if (window.showToast) {
          window.showToast("Yazar başarıyla eklendi", "success");
        }
      }

      setShowModal(false);
      setEditingAuthor(null);
      setFormData({ name: "", birthDate: "", country: "" });
      fetchAuthors();
    } catch (error) {
      console.error("Yazar kaydedilirken hata:", error);
      if (window.showToast) {
        window.showToast("Yazar kaydedilirken hata oluştu", "error");
      }
    }
  };

  const handleEdit = (author) => {
    setEditingAuthor(author);
    setFormData({
      name: author.name,
      birthDate: author.birthDate,
      country: author.country,
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bu yazarı silmek istediğinizden emin misiniz?")) {
      try {
        await authorService.deleteAuthor(id);
        if (window.showToast) {
          window.showToast("Yazar başarıyla silindi", "success");
        }
        fetchAuthors();
      } catch (error) {
        console.error("Yazar silinirken hata:", error);
        if (window.showToast) {
          window.showToast("Yazar silinirken hata oluştu", "error");
        }
      }
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setEditingAuthor(null);
    setFormData({ name: "", birthDate: "", country: "" });
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
      <div className="row mb-4">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center">
            <h2>
              <i className="bi bi-person me-2"></i>
              Yazarlar
            </h2>
            <button
              className="btn btn-primary"
              onClick={() => setShowModal(true)}
            >
              <i className="bi bi-plus me-1"></i>
              Yeni Yazar Ekle
            </button>
          </div>
        </div>
      </div>

      {/* Authors Table */}
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              {authors.length === 0 ? (
                <div className="text-center py-5">
                  <i className="bi bi-person-x display-1 text-muted"></i>
                  <h4 className="mt-3 text-muted">Henüz yazar eklenmemiş</h4>
                  <p className="text-muted">
                    İlk yazarınızı eklemek için yukarıdaki butonu kullanın.
                  </p>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-striped table-hover">
                    <thead className="table-dark">
                      <tr>
                        <th>ID</th>
                        <th>Yazar Adı</th>
                        <th>Doğum Tarihi</th>
                        <th>Ülke</th>
                        <th>İşlemler</th>
                      </tr>
                    </thead>
                    <tbody>
                      {authors.map((author) => (
                        <tr key={author.id}>
                          <td>{author.id}</td>
                          <td>
                            <i className="bi bi-person me-2"></i>
                            {author.name}
                          </td>
                          <td>{author.birthDate}</td>
                          <td>
                            <i className="bi bi-geo-alt me-1"></i>
                            {author.country}
                          </td>
                          <td>
                            <div className="d-flex gap-1">
                              <button
                                className="btn btn-sm btn-outline-primary"
                                onClick={() => handleEdit(author)}
                                title="Yazarı düzenle"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                              >
                                <i className="bi bi-pencil"></i>
                              </button>
                              <button
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => handleDelete(author.id)}
                                title="Yazarı sil"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                              >
                                <i className="bi bi-trash"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editingAuthor ? "Yazar Düzenle" : "Yeni Yazar Ekle"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleModalClose}
                ></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Yazar Adı *
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="birthDate" className="form-label">
                      Doğum Tarihi *
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="birthDate"
                      value={formData.birthDate}
                      onChange={(e) =>
                        setFormData({ ...formData, birthDate: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="country" className="form-label">
                      Ülke *
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="country"
                      value={formData.country}
                      onChange={(e) =>
                        setFormData({ ...formData, country: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleModalClose}
                  >
                    İptal
                  </button>
                  <button type="submit" className="btn btn-primary">
                    {editingAuthor ? "Güncelle" : "Ekle"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AuthorsPage;

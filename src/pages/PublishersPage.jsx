import { useState, useEffect } from "react";
import { publisherService } from "../services/publisherService";

function PublishersPage() {
  const [publishers, setPublishers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingPublisher, setEditingPublisher] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    establishmentYear: "",
    address: "",
  });

  useEffect(() => {
    fetchPublishers();
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
  }, [publishers]);

  const fetchPublishers = async () => {
    try {
      setLoading(true);
      const data = await publisherService.getAllPublishers();
      setPublishers(data);
    } catch (error) {
      console.error("Yayınevleri yüklenirken hata:", error);
      if (window.showToast) {
        window.showToast("Yayınevleri yüklenirken hata oluştu", "error");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = {
        ...formData,
        establishmentYear: parseInt(formData.establishmentYear),
      };

      if (editingPublisher) {
        await publisherService.updatePublisher(editingPublisher.id, dataToSend);
        if (window.showToast) {
          window.showToast("Yayınevi başarıyla güncellendi", "success");
        }
      } else {
        await publisherService.addPublisher(dataToSend);
        if (window.showToast) {
          window.showToast("Yayınevi başarıyla eklendi", "success");
        }
      }

      setShowModal(false);
      setEditingPublisher(null);
      setFormData({ name: "", establishmentYear: "", address: "" });
      fetchPublishers();
    } catch (error) {
      console.error("Yayınevi kaydedilirken hata:", error);
      if (window.showToast) {
        window.showToast("Yayınevi kaydedilirken hata oluştu", "error");
      }
    }
  };

  const handleEdit = (publisher) => {
    setEditingPublisher(publisher);
    setFormData({
      name: publisher.name,
      establishmentYear: publisher.establishmentYear.toString(),
      address: publisher.address,
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bu yayınevini silmek istediğinizden emin misiniz?")) {
      try {
        await publisherService.deletePublisher(id);
        if (window.showToast) {
          window.showToast("Yayınevi başarıyla silindi", "success");
        }
        fetchPublishers();
      } catch (error) {
        console.error("Yayınevi silinirken hata:", error);
        if (window.showToast) {
          window.showToast("Yayınevi silinirken hata oluştu", "error");
        }
      }
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setEditingPublisher(null);
    setFormData({ name: "", establishmentYear: "", address: "" });
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
              <i className="bi bi-building me-2"></i>
              Yayınevleri
            </h2>
            <button
              className="btn btn-primary"
              onClick={() => setShowModal(true)}
            >
              <i className="bi bi-plus me-1"></i>
              Yeni Yayınevi Ekle
            </button>
          </div>
        </div>
      </div>

      {/* Publishers Table */}
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              {publishers.length === 0 ? (
                <div className="text-center py-5">
                  <i className="bi bi-building-x display-1 text-muted"></i>
                  <h4 className="mt-3 text-muted">Henüz yayınevi eklenmemiş</h4>
                  <p className="text-muted">
                    İlk yayınevinizi eklemek için yukarıdaki butonu kullanın.
                  </p>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-striped table-hover">
                    <thead className="table-dark">
                      <tr>
                        <th>ID</th>
                        <th>Yayınevi Adı</th>
                        <th>Kuruluş Yılı</th>
                        <th>Adres</th>
                        <th>İşlemler</th>
                      </tr>
                    </thead>
                    <tbody>
                      {publishers.map((publisher) => (
                        <tr key={publisher.id}>
                          <td>{publisher.id}</td>
                          <td>
                            <i className="bi bi-building me-2"></i>
                            {publisher.name}
                          </td>
                          <td>
                            <i className="bi bi-calendar me-1"></i>
                            {publisher.establishmentYear}
                          </td>
                          <td>
                            <i className="bi bi-geo-alt me-1"></i>
                            {publisher.address}
                          </td>
                          <td>
                            <div className="d-flex gap-1">
                              <button
                                className="btn btn-sm btn-outline-primary"
                                onClick={() => handleEdit(publisher)}
                                title="Yayınevini düzenle"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                              >
                                <i className="bi bi-pencil"></i>
                              </button>
                              <button
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => handleDelete(publisher.id)}
                                title="Yayınevini sil"
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
                  {editingPublisher ? "Yayınevi Düzenle" : "Yeni Yayınevi Ekle"}
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
                      Yayınevi Adı *
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
                    <label htmlFor="establishmentYear" className="form-label">
                      Kuruluş Yılı *
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="establishmentYear"
                      min="1800"
                      max={new Date().getFullYear()}
                      value={formData.establishmentYear}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          establishmentYear: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="address" className="form-label">
                      Adres *
                    </label>
                    <textarea
                      className="form-control"
                      id="address"
                      rows="3"
                      value={formData.address}
                      onChange={(e) =>
                        setFormData({ ...formData, address: e.target.value })
                      }
                      required
                    ></textarea>
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
                    {editingPublisher ? "Güncelle" : "Ekle"}
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

export default PublishersPage;

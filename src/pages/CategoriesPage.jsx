import { useState, useEffect } from "react";
import { categoryService } from "../services/categoryService";

function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    color: "#3498db",
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await categoryService.getAllCategories();
      setCategories(response);
    } catch (error) {
      console.error("Kategoriler yüklenirken hata:", error);
      if (window.showToast) {
        window.showToast("Kategoriler yüklenirken hata oluştu", "error");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCategory) {
        await categoryService.updateCategory(editingCategory.id, formData);
        if (window.showToast) {
          window.showToast("Kategori başarıyla güncellendi", "success");
        }
      } else {
        await categoryService.createCategory(formData);
        if (window.showToast) {
          window.showToast("Kategori başarıyla eklendi", "success");
        }
      }

      setShowModal(false);
      setEditingCategory(null);
      setFormData({ name: "", description: "", color: "#3498db" });
      fetchCategories();
    } catch (error) {
      console.error("Kategori kaydedilirken hata:", error);
      if (window.showToast) {
        window.showToast("Kategori kaydedilirken hata oluştu", "error");
      }
    }
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      description: category.description,
      color: category.color || "#3498db",
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bu kategoriyi silmek istediğinizden emin misiniz?")) {
      try {
        await categoryService.deleteCategory(id);
        if (window.showToast) {
          window.showToast("Kategori başarıyla silindi", "success");
        }
        fetchCategories();
      } catch (error) {
        console.error("Kategori silinirken hata:", error);
        if (window.showToast) {
          window.showToast("Kategori silinirken hata oluştu", "error");
        }
      }
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setEditingCategory(null);
    setFormData({ name: "", description: "", color: "#3498db" });
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
              <i className="bi bi-tags me-2"></i>
              Kategoriler
            </h2>
            <button
              className="btn btn-primary"
              onClick={() => setShowModal(true)}
            >
              <i className="bi bi-plus me-1"></i>
              Yeni Kategori Ekle
            </button>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="row">
        {categories.length === 0 ? (
          <div className="col-12">
            <div className="card">
              <div className="card-body text-center py-5">
                <i className="bi bi-tags-fill display-1 text-muted"></i>
                <h4 className="mt-3 text-muted">Henüz kategori eklenmemiş</h4>
                <p className="text-muted">
                  İlk kategorinizi eklemek için yukarıdaki butonu kullanın.
                </p>
              </div>
            </div>
          </div>
        ) : (
          categories.map((category) => (
            <div key={category.id} className="col-md-6 col-lg-4 mb-4">
              <div className="card h-100 border-primary">
                <div
                  className="card-header text-white"
                  style={{ backgroundColor: category.color || "#007bff" }}
                >
                  <h5 className="mb-0">
                    <i className="bi bi-tag me-2"></i>
                    {category.name}
                  </h5>
                </div>
                <div className="card-body">
                  <p className="card-text">{category.description}</p>
                  <div className="text-muted small">
                    <i className="bi bi-hash me-1"></i>
                    ID: {category.id}
                  </div>
                </div>
                <div className="card-footer bg-transparent">
                  <div className="d-flex justify-content-between">
                    <button
                      className="btn btn-outline-primary btn-sm"
                      onClick={() => handleEdit(category)}
                    >
                      <i className="bi bi-pencil me-1"></i>
                      Düzenle
                    </button>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => handleDelete(category.id)}
                    >
                      <i className="bi bi-trash me-1"></i>
                      Sil
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
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
                  {editingCategory ? "Kategori Düzenle" : "Yeni Kategori Ekle"}
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
                      Kategori Adı *
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="Örn: Roman, Bilim Kurgu, Tarih"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                      Açıklama *
                    </label>
                    <textarea
                      className="form-control"
                      id="description"
                      rows="4"
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      placeholder="Kategori hakkında kısa bir açıklama yazın..."
                      required
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="color" className="form-label">
                      Renk
                    </label>
                    <input
                      type="color"
                      className="form-control form-control-color"
                      id="color"
                      value={formData.color}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          color: e.target.value,
                        })
                      }
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
                    {editingCategory ? "Güncelle" : "Ekle"}
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

export default CategoriesPage;

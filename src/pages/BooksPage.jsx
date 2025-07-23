import { useState, useEffect } from "react";
import { bookService } from "../services/bookService";
import { authorService } from "../services/authorService";
import { categoryService } from "../services/categoryService";
import { publisherService } from "../services/publisherService";

function BooksPage() {
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [publishers, setPublishers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    publicationYear: "",
    stock: "",
    author: { id: "" },
    publisher: { id: "" },
    categories: [],
  });

  useEffect(() => {
    fetchAllData();
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
  }, [books]);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      const [booksRes, authorsRes, categoriesRes, publishersRes] =
        await Promise.all([
          bookService.getAllBooks(),
          authorService.getAllAuthors(),
          categoryService.getAllCategories(),
          publisherService.getAllPublishers(),
        ]);

      setBooks(booksRes);
      setAuthors(authorsRes);
      setCategories(categoriesRes);
      setPublishers(publishersRes);
    } catch (error) {
      console.error("Veriler yüklenirken hata:", error);
      if (window.showToast) {
        window.showToast("Veriler yüklenirken hata oluştu", "error");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Form data:", formData); // Debug log
      const dataToSend = {
        title: formData.name,
        publicationYear: parseInt(formData.publicationYear),
        stock: parseInt(formData.stock),
        authorId: parseInt(formData.author.id),
        publisherId: formData.publisher.id
          ? parseInt(formData.publisher.id)
          : null,
        categoryId:
          formData.categories.length > 0
            ? parseInt(formData.categories[0])
            : null,
      };
      console.log("Data to send:", dataToSend); // Debug log

      if (editingBook) {
        await bookService.updateBook(editingBook.id, dataToSend);
        if (window.showToast) {
          window.showToast("Kitap başarıyla güncellendi", "success");
        }
      } else {
        await bookService.createBook(dataToSend);
        if (window.showToast) {
          window.showToast("Kitap başarıyla eklendi", "success");
        }
      }

      setShowModal(false);
      setEditingBook(null);
      resetForm();
      fetchAllData();
    } catch (error) {
      console.error("Kitap kaydedilirken hata:", error);
      if (window.showToast) {
        window.showToast("Kitap kaydedilirken hata oluştu", "error");
      }
    }
  };

  const handleEdit = (book) => {
    setEditingBook(book);
    setFormData({
      name: book.title || book.name,
      publicationYear: book.publicationYear.toString(),
      stock: book.stock.toString(),
      author: { id: book.author?.id?.toString() || "" },
      publisher: { id: book.publisher?.id?.toString() || "" },
      categories: book.categories?.map((cat) => cat.id.toString()) || [],
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bu kitabı silmek istediğinizden emin misiniz?")) {
      try {
        await bookService.deleteBook(id);
        if (window.showToast) {
          window.showToast("Kitap başarıyla silindi", "success");
        }
        fetchAllData();
      } catch (error) {
        console.error("Kitap silinirken hata:", error);
        if (window.showToast) {
          window.showToast("Kitap silinirken hata oluştu", "error");
        }
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      publicationYear: "",
      stock: "",
      author: { id: "" },
      publisher: { id: "" },
      categories: [],
    });
  };

  const handleModalClose = () => {
    setShowModal(false);
    setEditingBook(null);
    resetForm();
  };

  const handleCategoryChange = (categoryId) => {
    const currentCategories = [...formData.categories];
    const index = currentCategories.indexOf(categoryId);

    if (index > -1) {
      currentCategories.splice(index, 1);
    } else {
      currentCategories.push(categoryId);
    }

    setFormData({ ...formData, categories: currentCategories });
  };

  const filteredBooks = books.filter(
    (book) =>
      (book.title || book.name || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (book.author?.name || book.author || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (book.publisher?.name || book.publisher || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

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
              <i className="bi bi-book me-2"></i>
              Kitaplar
            </h2>
            <button
              className="btn btn-primary"
              onClick={() => setShowModal(true)}
            >
              <i className="bi bi-plus me-1"></i>
              Yeni Kitap Ekle
            </button>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="input-group">
            <span className="input-group-text">
              <i className="bi bi-search"></i>
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Kitap, yazar veya yayınevi adına göre ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Books Table */}
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              {filteredBooks.length === 0 ? (
                <div className="text-center py-5">
                  <i className="bi bi-book-fill display-1 text-muted"></i>
                  <h4 className="mt-3 text-muted">
                    {searchTerm
                      ? "Arama kriterlerine uygun kitap bulunamadı"
                      : "Henüz kitap eklenmemiş"}
                  </h4>
                  <p className="text-muted">
                    {searchTerm
                      ? "Farklı anahtar kelimelerle tekrar deneyin."
                      : "İlk kitabınızı eklemek için yukarıdaki butonu kullanın."}
                  </p>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-striped table-hover">
                    <thead className="table-dark">
                      <tr>
                        <th>ID</th>
                        <th>Kitap Adı</th>
                        <th>Yazar</th>
                        <th>Yayınevi</th>
                        <th>Yayın Yılı</th>
                        <th>Stok</th>
                        <th>Kategoriler</th>
                        <th>İşlemler</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredBooks.map((book) => (
                        <tr key={book.id}>
                          <td>{book.id}</td>
                          <td>
                            <i className="bi bi-book me-2"></i>
                            {book.title || book.name}
                          </td>
                          <td>
                            <i className="bi bi-person me-1"></i>
                            {book.author?.name || "Bilinmeyen Yazar"}
                          </td>
                          <td>
                            <i className="bi bi-building me-1"></i>
                            {book.publisher?.name || "Bilinmeyen Yayınevi"}
                          </td>
                          <td>{book.publicationYear}</td>
                          <td>
                            <span
                              className={`badge ${
                                book.stock > 0 ? "bg-success" : "bg-danger"
                              }`}
                            >
                              {book.stock}
                            </span>
                          </td>
                          <td>
                            {book.categories?.map((category) => (
                              <span
                                key={category.id}
                                className="badge bg-secondary me-1"
                              >
                                {category.name}
                              </span>
                            )) || (
                              <span className="text-muted">Kategori Yok</span>
                            )}
                          </td>
                          <td>
                            <div className="d-flex gap-1">
                              <button
                                className="btn btn-sm btn-outline-primary"
                                onClick={() => handleEdit(book)}
                                title="Kitabı düzenle"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                              >
                                <i className="bi bi-pencil"></i>
                              </button>
                              <button
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => handleDelete(book.id)}
                                title="Kitabı sil"
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
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editingBook ? "Kitap Düzenle" : "Yeni Kitap Ekle"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleModalClose}
                ></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="name" className="form-label">
                          Kitap Adı *
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
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="publicationYear" className="form-label">
                          Yayın Yılı *
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          id="publicationYear"
                          min="1000"
                          max={new Date().getFullYear()}
                          value={formData.publicationYear}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              publicationYear: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="author" className="form-label">
                          Yazar *
                        </label>
                        <select
                          className="form-select"
                          id="author"
                          value={formData.author.id}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              author: { id: e.target.value },
                            })
                          }
                          required
                        >
                          <option value="">Yazar Seçin</option>
                          {authors.map((author) => (
                            <option key={author.id} value={author.id}>
                              {author.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="publisher" className="form-label">
                          Yayınevi
                        </label>
                        <select
                          className="form-select"
                          id="publisher"
                          value={formData.publisher.id}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              publisher: { id: e.target.value },
                            })
                          }
                        >
                          <option value="">Yayınevi Seçin</option>
                          {publishers.map((publisher) => (
                            <option key={publisher.id} value={publisher.id}>
                              {publisher.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="stock" className="form-label">
                          Stok Adedi *
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          id="stock"
                          min="0"
                          value={formData.stock}
                          onChange={(e) =>
                            setFormData({ ...formData, stock: e.target.value })
                          }
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Kategoriler</label>
                        <div
                          className="border rounded p-2"
                          style={{ maxHeight: "150px", overflowY: "auto" }}
                        >
                          {categories.map((category) => (
                            <div key={category.id} className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id={`category-${category.id}`}
                                checked={formData.categories.includes(
                                  category.id.toString()
                                )}
                                onChange={() =>
                                  handleCategoryChange(category.id.toString())
                                }
                              />
                              <label
                                className="form-check-label"
                                htmlFor={`category-${category.id}`}
                              >
                                {category.name}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
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
                    {editingBook ? "Güncelle" : "Ekle"}
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

export default BooksPage;

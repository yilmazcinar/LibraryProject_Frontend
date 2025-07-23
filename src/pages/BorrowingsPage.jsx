import { useState, useEffect } from "react";
import { borrowingService } from "../services/borrowingService";
import { bookService } from "../services/bookService";

function BorrowingsPage() {
  const [borrowings, setBorrowings] = useState([]);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingBorrowing, setEditingBorrowing] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all"); // all, active, returned, overdue
  const [formData, setFormData] = useState({
    borrowerName: "",
    borrowerMail: "",
    borrowerPhone: "",
    borrowingDate: "",
    returnDate: "",
    bookForBorrowingRequest: {
      id: "",
      name: "",
      publicationYear: "",
      stock: "",
    },
  });

  useEffect(() => {
    fetchAllData();
  }, []);

  useEffect(() => {
    // Bootstrap tooltip'lerini aktifleştir - güvenli şekilde
    const initializeTooltips = () => {
      const tooltipTriggerList = [].slice.call(
        document.querySelectorAll('[data-bs-toggle="tooltip"]')
      );

      // Bootstrap'ın yüklü olup olmadığını kontrol et
      if (window.bootstrap && window.bootstrap.Tooltip) {
        tooltipTriggerList.map(function (tooltipTriggerEl) {
          return new window.bootstrap.Tooltip(tooltipTriggerEl, {
            delay: { show: 0, hide: 0 }, // Anında görünme ve gizlenme
            trigger: "hover",
          });
        });
      } else {
        console.warn("Bootstrap Tooltip is not available");
      }
    };

    // Tooltip'leri biraz gecikme ile başlat (DOM tamamen yüklendikten sonra)
    const timeoutId = setTimeout(initializeTooltips, 100);

    // Cleanup fonksiyonu - component unmount olduğunda tooltip'leri temizle
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
  }, [borrowings]); // borrowings değiştiğinde tooltip'leri yeniden aktifleştir

  const fetchAllData = async () => {
    try {
      setLoading(true);
      console.log("Fetching borrowings and books..."); // Debug log
      const [borrowingsRes, booksRes] = await Promise.all([
        borrowingService.getAllBorrowings(),
        bookService.getAvailableBooks(),
      ]);

      console.log("Borrowings fetched:", borrowingsRes); // Debug log
      console.log("Books fetched:", booksRes); // Debug log
      setBorrowings(borrowingsRes);
      setBooks(booksRes);
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
      console.log("Borrowing form data:", formData); // Debug log
      if (editingBorrowing) {
        // Update için sadece return date güncellenir
        const updateData = {
          borrowerName: formData.borrowerName,
          borrowingDate: formData.borrowingDate,
          returnDate: formData.returnDate || null,
        };
        console.log("Update data:", updateData); // Debug log
        await borrowingService.updateBorrowing(editingBorrowing.id, updateData);
        if (window.showToast) {
          window.showToast(
            "Ödünç alma işlemi başarıyla güncellendi",
            "success"
          );
        }
      } else {
        // Yeni ödünç alma
        const selectedBook = books.find(
          (book) => book.id === parseInt(formData.bookForBorrowingRequest.id)
        );
        console.log("Selected book:", selectedBook); // Debug log
        const dataToSend = {
          borrowerName: formData.borrowerName,
          borrowerMail: formData.borrowerMail,
          borrowerPhone: formData.borrowerPhone,
          borrowingDate: formData.borrowingDate,
          bookForBorrowingRequest: {
            id: parseInt(formData.bookForBorrowingRequest.id),
            name: selectedBook.title || selectedBook.name,
            publicationYear: selectedBook.publicationYear,
            stock: selectedBook.stock,
          },
        };
        console.log("Borrowing data to send:", dataToSend); // Debug log
        await borrowingService.addBorrowing(dataToSend);
        if (window.showToast) {
          window.showToast("Kitap başarıyla ödünç verildi", "success");
        }
      }

      setShowModal(false);
      setEditingBorrowing(null);
      resetForm();
      fetchAllData();
    } catch (error) {
      console.error("Ödünç alma işlemi kaydedilirken hata:", error);
      if (window.showToast) {
        window.showToast("İşlem sırasında hata oluştu", "error");
      }
    }
  };

  const handleEdit = (borrowing) => {
    setEditingBorrowing(borrowing);
    setFormData({
      borrowerName: borrowing.borrowerName,
      borrowerMail: borrowing.borrowerMail,
      borrowerPhone: borrowing.borrowerPhone || "",
      borrowingDate: borrowing.borrowingDate,
      returnDate: borrowing.returnDate || "",
      bookForBorrowingRequest: {
        id: borrowing.bookForBorrowingRequest?.id?.toString() || "",
        name: borrowing.bookForBorrowingRequest?.name || "",
        publicationYear:
          borrowing.bookForBorrowingRequest?.publicationYear?.toString() || "",
        stock: borrowing.bookForBorrowingRequest?.stock?.toString() || "",
      },
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (
      window.confirm(
        "Bu ödünç alma işlemini silmek istediğinizden emin misiniz?"
      )
    ) {
      try {
        await borrowingService.deleteBorrowing(id);
        if (window.showToast) {
          window.showToast("Ödünç alma işlemi başarıyla silindi", "success");
        }
        fetchAllData();
      } catch (error) {
        console.error("Ödünç alma işlemi silinirken hata:", error);
        if (window.showToast) {
          window.showToast("İşlem silinirken hata oluştu", "error");
        }
      }
    }
  };

  const handleReturn = async (borrowing) => {
    if (window.confirm("Kitabın iade edildiğini onaylıyor musunuz?")) {
      try {
        await borrowingService.returnBook(borrowing.id);
        if (window.showToast) {
          window.showToast("Kitap başarıyla iade edildi", "success");
        }
        fetchAllData();
      } catch (error) {
        console.error("İade işlemi sırasında hata:", error);
        if (window.showToast) {
          window.showToast("İade işlemi sırasında hata oluştu", "error");
        }
      }
    }
  };

  const resetForm = () => {
    setFormData({
      borrowerName: "",
      borrowerMail: "",
      borrowerPhone: "",
      borrowingDate: "",
      returnDate: "",
      bookForBorrowingRequest: {
        id: "",
        name: "",
        publicationYear: "",
        stock: "",
      },
    });
  };

  const handleModalClose = () => {
    setShowModal(false);
    setEditingBorrowing(null);
    resetForm();
  };

  const filteredBorrowings = borrowings.filter((borrowing) => {
    if (filterStatus === "active") return borrowing.status === "active";
    if (filterStatus === "returned") return borrowing.status === "returned";
    if (filterStatus === "overdue") return borrowing.status === "overdue";
    return true;
  });

  const handleBookSelect = (bookId) => {
    const selectedBook = books.find((book) => book.id === parseInt(bookId));
    if (selectedBook) {
      setFormData({
        ...formData,
        bookForBorrowingRequest: {
          id: bookId,
          name: selectedBook.name,
          publicationYear: selectedBook.publicationYear.toString(),
          stock: selectedBook.stock.toString(),
        },
      });
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
      <div className="row mb-4">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center">
            <h2>
              <i className="bi bi-arrow-left-right me-2"></i>
              Ödünç İşlemleri
            </h2>
            <button
              className="btn btn-primary"
              onClick={() => setShowModal(true)}
            >
              <i className="bi bi-plus me-1"></i>
              Yeni Ödünç İşlemi
            </button>
          </div>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="btn-group" role="group">
            <button
              type="button"
              className={`btn ${
                filterStatus === "all" ? "btn-primary" : "btn-outline-primary"
              }`}
              onClick={() => setFilterStatus("all")}
            >
              <i className="bi bi-list me-1"></i>
              Tümü ({borrowings.length})
            </button>
            <button
              type="button"
              className={`btn ${
                filterStatus === "active"
                  ? "btn-warning"
                  : "btn-outline-warning"
              }`}
              onClick={() => setFilterStatus("active")}
            >
              <i className="bi bi-clock me-1"></i>
              Aktif ({borrowings.filter((b) => b.status === "active").length})
            </button>
            <button
              type="button"
              className={`btn ${
                filterStatus === "overdue" ? "btn-danger" : "btn-outline-danger"
              }`}
              onClick={() => setFilterStatus("overdue")}
            >
              <i className="bi bi-exclamation-triangle me-1"></i>
              Vadesi Geçmiş (
              {borrowings.filter((b) => b.status === "overdue").length})
            </button>
            <button
              type="button"
              className={`btn ${
                filterStatus === "returned"
                  ? "btn-success"
                  : "btn-outline-success"
              }`}
              onClick={() => setFilterStatus("returned")}
            >
              <i className="bi bi-check-circle me-1"></i>
              İade Edilenler (
              {borrowings.filter((b) => b.status === "returned").length})
            </button>
          </div>
        </div>
      </div>

      {/* Borrowings Table */}
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              {filteredBorrowings.length === 0 ? (
                <div className="text-center py-5">
                  <i className="bi bi-arrow-left-right display-1 text-muted"></i>
                  <h4 className="mt-3 text-muted">
                    {filterStatus === "all"
                      ? "Henüz ödünç işlemi yapılmamış"
                      : filterStatus === "active"
                      ? "Aktif ödünç işlemi bulunmuyor"
                      : "İade edilmiş kitap bulunmuyor"}
                  </h4>
                  <p className="text-muted">
                    {filterStatus === "all"
                      ? "İlk ödünç işleminizi başlatmak için yukarıdaki butonu kullanın."
                      : "Diğer filtreleri deneyin veya yeni işlem ekleyin."}
                  </p>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-striped table-hover">
                    <thead className="table-dark">
                      <tr>
                        <th>ID</th>
                        <th>Ödünç Alan</th>
                        <th>E-posta</th>
                        <th>Telefon</th>
                        <th>Kitap</th>
                        <th>Ödünç Tarihi</th>
                        <th>İade Tarihi</th>
                        <th>Durum</th>
                        <th>İşlemler</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredBorrowings.map((borrowing) => (
                        <tr key={borrowing.id}>
                          <td>{borrowing.id}</td>
                          <td>
                            <i className="bi bi-person me-2"></i>
                            {borrowing.borrowerName}
                          </td>
                          <td>
                            <i className="bi bi-envelope me-1"></i>
                            {borrowing.borrowerMail}
                          </td>
                          <td>
                            <i className="bi bi-telephone me-1"></i>
                            {borrowing.borrowerPhone || "Belirtilmemiş"}
                          </td>
                          <td>
                            <i className="bi bi-book me-1"></i>
                            {borrowing.bookForBorrowingRequest?.name ||
                              borrowing.bookTitle ||
                              "Bilinmeyen Kitap"}
                          </td>
                          <td>{borrowing.borrowingDate}</td>
                          <td>
                            {borrowing.status === "returned" ? (
                              <span className="text-success">
                                <i className="bi bi-check-circle me-1"></i>
                                {borrowing.actualReturnDate ||
                                  borrowing.returnDate}
                              </span>
                            ) : (
                              <span className="text-warning">
                                <i className="bi bi-clock me-1"></i>
                                Henüz iade edilmedi
                              </span>
                            )}
                          </td>
                          <td>
                            {borrowing.status === "returned" ? (
                              <span className="badge bg-success">
                                İade Edildi
                              </span>
                            ) : borrowing.status === "overdue" ? (
                              <span className="badge bg-danger">
                                Vadesi Geçmiş
                              </span>
                            ) : (
                              <span className="badge bg-warning">Aktif</span>
                            )}
                          </td>
                          <td>
                            <div className="d-flex gap-1">
                              {borrowing.status !== "returned" && (
                                <button
                                  className="btn btn-sm btn-success"
                                  onClick={() => handleReturn(borrowing)}
                                  title="Kitabı iade et"
                                  data-bs-toggle="tooltip"
                                  data-bs-placement="top"
                                >
                                  <i className="bi bi-check-circle"></i>
                                </button>
                              )}
                              <button
                                className="btn btn-sm btn-outline-primary"
                                onClick={() => handleEdit(borrowing)}
                                title="Ödünç işlemini düzenle"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                              >
                                <i className="bi bi-pencil"></i>
                              </button>
                              <button
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => handleDelete(borrowing.id)}
                                title="Ödünç işlemini sil"
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
                  {editingBorrowing
                    ? "Ödünç İşlemi Düzenle"
                    : "Yeni Ödünç İşlemi"}
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
                    <div className="col-md-4">
                      <div className="mb-3">
                        <label htmlFor="borrowerName" className="form-label">
                          Ödünç Alan Kişi *
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="borrowerName"
                          value={formData.borrowerName}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              borrowerName: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="mb-3">
                        <label htmlFor="borrowerMail" className="form-label">
                          E-posta *
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="borrowerMail"
                          value={formData.borrowerMail}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              borrowerMail: e.target.value,
                            })
                          }
                          disabled={editingBorrowing}
                          required={!editingBorrowing}
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="mb-3">
                        <label htmlFor="borrowerPhone" className="form-label">
                          Telefon *
                        </label>
                        <input
                          type="tel"
                          className="form-control"
                          id="borrowerPhone"
                          value={formData.borrowerPhone}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              borrowerPhone: e.target.value,
                            })
                          }
                          placeholder="+90 (555) 000-00-00"
                          disabled={editingBorrowing}
                          required={!editingBorrowing}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="borrowingDate" className="form-label">
                          Ödünç Alma Tarihi *
                        </label>
                        <input
                          type="date"
                          className="form-control"
                          id="borrowingDate"
                          value={formData.borrowingDate}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              borrowingDate: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="returnDate" className="form-label">
                          İade Tarihi
                        </label>
                        <input
                          type="date"
                          className="form-control"
                          id="returnDate"
                          value={formData.returnDate}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              returnDate: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="book" className="form-label">
                      Kitap *
                    </label>
                    <select
                      className="form-select"
                      id="book"
                      value={formData.bookForBorrowingRequest.id}
                      onChange={(e) => handleBookSelect(e.target.value)}
                      disabled={editingBorrowing}
                      required={!editingBorrowing}
                    >
                      <option value="">Kitap Seçin</option>
                      {books
                        .filter((book) => book.stock > 0 || editingBorrowing)
                        .map((book) => (
                          <option key={book.id} value={book.id}>
                            {book.name} - {book.author.name} (Stok: {book.stock}
                            )
                          </option>
                        ))}
                    </select>
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
                    {editingBorrowing ? "Güncelle" : "Ödünç Ver"}
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

export default BorrowingsPage;

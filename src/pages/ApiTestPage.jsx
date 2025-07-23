import { useState } from "react";
import { bookService } from "../services/bookService";
import { authorService } from "../services/authorService";
import { categoryService } from "../services/categoryService";

function ApiTestPage() {
  const [testResults, setTestResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const addResult = (test, success, data = null, error = null) => {
    setTestResults((prev) => [
      ...prev,
      {
        test,
        success,
        data,
        error,
        timestamp: new Date().toLocaleTimeString(),
      },
    ]);
  };

  const testBooks = async () => {
    try {
      const books = await bookService.getAllBooks();
      addResult("Kitapları Getir", true, books);
    } catch (error) {
      addResult("Kitapları Getir", false, null, error.message);
    }
  };

  const testAuthors = async () => {
    try {
      const authors = await authorService.getAllAuthors();
      addResult("Yazarları Getir", true, authors);
    } catch (error) {
      addResult("Yazarları Getir", false, null, error.message);
    }
  };

  const testCategories = async () => {
    try {
      const categories = await categoryService.getAllCategories();
      addResult("Kategorileri Getir", true, categories);
    } catch (error) {
      addResult("Kategorileri Getir", false, null, error.message);
    }
  };

  const runAllTests = async () => {
    setLoading(true);
    setTestResults([]);

    await testBooks();
    await testAuthors();
    await testCategories();

    setLoading(false);
  };

  const clearResults = () => {
    setTestResults([]);
  };

  return (
    <div className="container mb-5 pb-4">
      <div className="row">
        <div className="col-12">
          <h2 className="mb-4">
            <i className="bi bi-gear me-2"></i>
            API Test Sayfası
          </h2>

          <div className="card mb-4">
            <div className="card-header">
              <h5 className="mb-0">API Endpoint Testleri</h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-3 mb-2">
                  <button
                    className="btn btn-primary w-100"
                    onClick={testBooks}
                    disabled={loading}
                  >
                    <i className="bi bi-book me-1"></i>
                    Kitapları Test Et
                  </button>
                </div>
                <div className="col-md-3 mb-2">
                  <button
                    className="btn btn-success w-100"
                    onClick={testAuthors}
                    disabled={loading}
                  >
                    <i className="bi bi-person me-1"></i>
                    Yazarları Test Et
                  </button>
                </div>
                <div className="col-md-3 mb-2">
                  <button
                    className="btn btn-info w-100"
                    onClick={testCategories}
                    disabled={loading}
                  >
                    <i className="bi bi-tags me-1"></i>
                    Kategorileri Test Et
                  </button>
                </div>
                <div className="col-md-3 mb-2">
                  <button
                    className="btn btn-warning w-100"
                    onClick={runAllTests}
                    disabled={loading}
                  >
                    <i className="bi bi-play-circle me-1"></i>
                    Tümünü Test Et
                  </button>
                </div>
              </div>

              <div className="mt-3">
                <button
                  className="btn btn-outline-secondary"
                  onClick={clearResults}
                >
                  <i className="bi bi-trash me-1"></i>
                  Sonuçları Temizle
                </button>
              </div>
            </div>
          </div>

          {/* Test Sonuçları */}
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Test Sonuçları</h5>
              {loading && (
                <div
                  className="spinner-border spinner-border-sm text-primary"
                  role="status"
                >
                  <span className="visually-hidden">Yükleniyor...</span>
                </div>
              )}
            </div>
            <div className="card-body">
              {testResults.length === 0 ? (
                <div className="text-center text-muted py-4">
                  <i className="bi bi-clipboard-data display-4"></i>
                  <p className="mt-2">Henüz test çalıştırılmadı</p>
                </div>
              ) : (
                <div className="list-group">
                  {testResults.map((result, index) => (
                    <div
                      key={index}
                      className={`list-group-item ${
                        result.success
                          ? "list-group-item-success"
                          : "list-group-item-danger"
                      }`}
                    >
                      <div className="d-flex justify-content-between align-items-start">
                        <div>
                          <h6 className="mb-1">
                            <i
                              className={`bi ${
                                result.success
                                  ? "bi-check-circle"
                                  : "bi-x-circle"
                              } me-2`}
                            ></i>
                            {result.test}
                          </h6>
                          {result.success ? (
                            <div>
                              <p className="mb-1 text-success">
                                ✅ Başarılı -{" "}
                                {Array.isArray(result.data)
                                  ? result.data.length
                                  : "1"}{" "}
                                öğe alındı
                              </p>
                              {Array.isArray(result.data) &&
                                result.data.length > 0 && (
                                  <details className="mt-2">
                                    <summary
                                      className="text-muted"
                                      style={{ cursor: "pointer" }}
                                    >
                                      Veri örneği göster
                                    </summary>
                                    <pre
                                      className="mt-2 p-2 bg-light rounded"
                                      style={{ fontSize: "0.8em" }}
                                    >
                                      {JSON.stringify(result.data[0], null, 2)}
                                    </pre>
                                  </details>
                                )}
                            </div>
                          ) : (
                            <p className="mb-1 text-danger">
                              ❌ Hata: {result.error}
                            </p>
                          )}
                        </div>
                        <small className="text-muted">{result.timestamp}</small>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* API Bilgileri */}
          <div className="card mt-4">
            <div className="card-header">
              <h5 className="mb-0">API Endpoint Bilgileri</h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-4">
                  <h6 className="text-primary">Kitap Endpoints</h6>
                  <ul className="list-unstyled small">
                    <li>
                      <code>GET /api/v1/books</code>
                    </li>
                    <li>
                      <code>POST /api/v1/books</code>
                    </li>
                    <li>
                      <code>PUT /api/v1/books/{`{id}`}</code>
                    </li>
                    <li>
                      <code>DELETE /api/v1/books/{`{id}`}</code>
                    </li>
                  </ul>
                </div>
                <div className="col-md-4">
                  <h6 className="text-success">Yazar Endpoints</h6>
                  <ul className="list-unstyled small">
                    <li>
                      <code>GET /api/v1/authors</code>
                    </li>
                    <li>
                      <code>POST /api/v1/authors</code>
                    </li>
                    <li>
                      <code>PUT /api/v1/authors/{`{id}`}</code>
                    </li>
                    <li>
                      <code>DELETE /api/v1/authors/{`{id}`}</code>
                    </li>
                  </ul>
                </div>
                <div className="col-md-4">
                  <h6 className="text-info">Kategori Endpoints</h6>
                  <ul className="list-unstyled small">
                    <li>
                      <code>GET /api/v1/categories</code>
                    </li>
                    <li>
                      <code>POST /api/v1/categories</code>
                    </li>
                    <li>
                      <code>PUT /api/v1/categories/{`{id}`}</code>
                    </li>
                    <li>
                      <code>DELETE /api/v1/categories/{`{id}`}</code>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-3 p-3 bg-light rounded">
                <h6>Backend URL</h6>
                <code>https://libraryproject-backend.onrender.com</code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApiTestPage;

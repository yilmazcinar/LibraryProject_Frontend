import { useState } from "react";

function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form gönderme işlemi burada yapılacak
    console.log("Form data:", formData);
    alert("Mesajınız başarıyla gönderildi!");
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="container py-4 mb-5 pb-4">
      <div className="row">
        <div className="col-lg-8 mx-auto">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold text-primary">
              <i className="bi bi-envelope-heart me-3"></i>
              Bizimle İletişime Geçin
            </h2>
            <p className="lead text-muted">
              Sorularınız, önerileriniz veya geri bildirimleriniz için bizimle
              iletişime geçebilirsiniz.
            </p>
          </div>

          <div className="row g-4">
            {/* Contact Information */}
            <div className="col-lg-5">
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body p-4">
                  <h4 className="card-title text-primary mb-4">
                    <i className="bi bi-info-circle me-2"></i>
                    İletişim Bilgileri
                  </h4>

                  <div className="contact-info-item mb-3">
                    <i className="bi bi-geo-alt-fill text-primary me-3"></i>
                    <div>
                      <strong>Adres:</strong>
                      <br />
                      Demo Mahallesi, Örnek Sokak No:123
                      <br />
                      Test İlçesi, Demo Şehri 00000
                    </div>
                  </div>

                  <div className="contact-info-item mb-3">
                    <i className="bi bi-telephone-fill text-primary me-3"></i>
                    <div>
                      <strong>Telefon:</strong>
                      <br />
                      +90 (000) 000 00 00
                      <br />
                      +90 (000) 000 00 01
                    </div>
                  </div>

                  <div className="contact-info-item mb-3">
                    <i className="bi bi-envelope-fill text-primary me-3"></i>
                    <div>
                      <strong>E-posta:</strong>
                      <br />
                      info@demo-kutuphane.example
                      <br />
                      destek@demo-kutuphane.example
                    </div>
                  </div>

                  <div className="contact-info-item mb-4">
                    <i className="bi bi-clock-fill text-primary me-3"></i>
                    <div>
                      <strong>Çalışma Saatleri:</strong>
                      <br />
                      Pazartesi - Cuma: 09:00 - 18:00
                      <br />
                      Cumartesi: 10:00 - 16:00
                      <br />
                      Pazar: Kapalı
                    </div>
                  </div>

                  <div className="social-media">
                    <h6 className="text-primary mb-3">Sosyal Medya:</h6>
                    <div className="d-flex gap-2">
                      <a href="#" className="btn btn-outline-primary btn-sm">
                        <i className="bi bi-instagram"></i>
                      </a>
                      <a href="#" className="btn btn-outline-info btn-sm">
                        <i className="bi bi-twitter"></i>
                      </a>
                      <a href="#" className="btn btn-outline-danger btn-sm">
                        <i className="bi bi-youtube"></i>
                      </a>
                      <a href="#" className="btn btn-outline-primary btn-sm">
                        <i className="bi bi-linkedin"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="col-lg-7">
              <div className="card shadow-sm border-0">
                <div className="card-body p-4">
                  <h4 className="card-title text-primary mb-4">
                    <i className="bi bi-chat-dots me-2"></i>
                    Mesaj Gönder
                  </h4>

                  <form onSubmit={handleSubmit}>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label htmlFor="name" className="form-label">
                          <i className="bi bi-person me-1"></i>Ad Soyad *
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="Adınızı ve soyadınızı girin"
                        />
                      </div>

                      <div className="col-md-6">
                        <label htmlFor="email" className="form-label">
                          <i className="bi bi-envelope me-1"></i>E-posta *
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="E-posta adresinizi girin"
                        />
                      </div>

                      <div className="col-12">
                        <label htmlFor="subject" className="form-label">
                          <i className="bi bi-tag me-1"></i>Konu *
                        </label>
                        <select
                          className="form-select"
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Konu seçiniz...</option>
                          <option value="genel-bilgi">Genel Bilgi</option>
                          <option value="teknik-destek">Teknik Destek</option>
                          <option value="kitap-onerisi">Kitap Önerisi</option>
                          <option value="uyelik">Üyelik İşlemleri</option>
                          <option value="sikayet">Şikayet</option>
                          <option value="oneriler">Öneriler</option>
                          <option value="diger">Diğer</option>
                        </select>
                      </div>

                      <div className="col-12">
                        <label htmlFor="message" className="form-label">
                          <i className="bi bi-chat-text me-1"></i>Mesaj *
                        </label>
                        <textarea
                          className="form-control"
                          id="message"
                          name="message"
                          rows="5"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          placeholder="Mesajınızı buraya yazın..."
                        ></textarea>
                      </div>

                      <div className="col-12">
                        <div className="form-check mb-3">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="agreement"
                            required
                          />
                          <label
                            className="form-check-label text-muted"
                            htmlFor="agreement"
                          >
                            <small>
                              Kişisel verilerimin işlenmesine onay veriyorum ve
                              <a href="#" className="text-primary ms-1">
                                Gizlilik Politikası
                              </a>
                              'nı kabul ediyorum.
                            </small>
                          </label>
                        </div>

                        <button
                          type="submit"
                          className="btn btn-primary btn-lg w-100"
                        >
                          <i className="bi bi-send me-2"></i>
                          Mesajı Gönder
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="row mt-5">
            <div className="col-12">
              <div className="alert alert-info">
                <h6 className="alert-heading">
                  <i className="bi bi-info-circle me-2"></i>
                  Bilgi:
                </h6>
                <p className="mb-0">
                  Mesajlarınız en geç 24 saat içinde yanıtlanmaktadır. Acil
                  durumlar için lütfen telefon ile iletişime geçiniz. Teknik
                  destek talepleriniz için lütfen mümkün olduğunca detaylı bilgi
                  veriniz.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;

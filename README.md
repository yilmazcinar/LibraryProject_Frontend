# 📚 Library Management System - Frontend

Modern ve kullanıcı dostu bir kütüphane yönetim sistemi frontend uygulaması. React, Vite ve Bootstrap teknolojileri ile geliştirilmiştir.

## 🌐 Canlı Demo

**🚀 [Canlı Uygulamayı Görüntüle](BURAYA_NETLIFY_LINK_GELECEK)**

> Backend API: [Library Management API](https://libraryproject-backend.onrender.com/api/v1)

## 📋 Özellikler

### 📖 Kitap Yönetimi
- ✅ Kitap ekleme, düzenleme ve silme
- 🔍 Kitap arama ve filtreleme
- 📊 Kitap detay görüntüleme
- 📚 Kategori bazlı organizasyon

### 👨‍💼 Yazar Yönetimi
- ✅ Yazar profili oluşturma ve düzenleme
- 📝 Yazar bilgileri ve eserleri
- 🔗 Yazar-kitap ilişkilendirme

### 🏢 Yayınevi Yönetimi
- ✅ Yayınevi bilgilerini yönetme
- 📊 Yayınevi istatistikleri
- 🔗 Yayınevi-kitap ilişkilendirme

### 📂 Kategori Yönetimi
- ✅ Kitap kategorilerini organize etme
- 🏷️ Kategori bazlı filtreleme
- 📈 Kategori istatistikleri

### 📋 Ödünç Alma Sistemi
- ✅ Kitap ödünç alma/verme işlemleri
- ⏰ Teslim tarihi takibi
- 📊 Ödünç alma geçmişi
- 🚨 Gecikme bildirimleri

### 🎨 Kullanıcı Deneyimi
- 📱 Responsive tasarım (mobil uyumlu)
- 🌟 Modern ve sezgisel arayüz
- 🎯 Kolay navigasyon
- 💫 Smooth animasyonlar

## 🛠️ Teknolojiler

### Frontend
- **React 19.1.0** - Modern UI geliştirme
- **Vite 7.0.4** - Hızlı build ve development
- **React Router 7.7.0** - SPA routing
- **Bootstrap 5.3.7** - UI framework
- **Bootstrap Icons** - Icon library
- **Axios** - HTTP client

### Styling
- **Custom CSS** - Özel tema tasarımı
- **Bootstrap Components** - Hazır UI bileşenleri
- **Responsive Design** - Mobil uyumlu tasarım

## 🚀 Kurulum ve Çalıştırma

### Gereksinimler
- Node.js (v18 veya üzeri)
- npm veya yarn

### Local Geliştirme

1. **Repository'yi klonlayın:**
```bash
git clone https://github.com/yilmazcinar/LibraryProject_Frontend.git
cd LibraryProject_Frontend
```

2. **Bağımlılıkları yükleyin:**
```bash
npm install
```

3. **Development server'ı başlatın:**
```bash
npm run dev
```

4. **Uygulamayı görüntüleyin:**
   - Tarayıcınızda `http://localhost:5173` adresine gidin

### Production Build

```bash
# Production build oluştur
npm run build

# Build'i preview et
npm run preview
```

## 📁 Proje Yapısı

```
src/
├── components/          # Yeniden kullanılabilir bileşenler
│   ├── Toast.jsx       # Bildirim bileşeni
│   └── ToastContainer.jsx
├── pages/              # Sayfa bileşenleri
│   ├── HomePage.jsx    # Ana sayfa
│   ├── BooksPage.jsx   # Kitaplar sayfası
│   ├── AuthorsPage.jsx # Yazarlar sayfası
│   ├── PublishersPage.jsx # Yayınevleri sayfası
│   ├── CategoriesPage.jsx # Kategoriler sayfası
│   ├── BorrowingsPage.jsx # Ödünç alma sayfası
│   ├── ContactPage.jsx # İletişim sayfası
│   └── ApiTestPage.jsx # API test sayfası
├── services/           # API servisleri
│   ├── apiService.js   # Genel API servisi
│   ├── bookService.js  # Kitap API'leri
│   ├── authorService.js # Yazar API'leri
│   ├── publisherService.js # Yayınevi API'leri
│   ├── categoryService.js # Kategori API'leri
│   └── borrowingService.js # Ödünç alma API'leri
├── config/
│   └── api.js          # API konfigürasyonu
├── assets/             # Statik dosyalar
└── styles/             # CSS dosyaları
```

## 🔧 Konfigürasyon

### API Endpoint'leri

Uygulama, backend API ile iletişim kurar:

- **Production:** `https://libraryproject-backend.onrender.com/api/v1`
- **Development:** `http://localhost:8080/api/v1`

### Environment Variables

Gerekirse `.env` dosyası oluşturabilirsiniz:

```env
VITE_API_BASE_URL=https://libraryproject-backend.onrender.com/api/v1
```

## 📱 Responsive Tasarım

Uygulama tüm cihazlarda mükemmel çalışır:
- 📱 **Mobil:** 320px - 768px
- 📱 **Tablet:** 768px - 1024px
- 💻 **Desktop:** 1024px+

## 🎨 Tema ve Renk Paleti

- **Ana Renk:** Kahverengi (#654321)
- **Vurgu Rengi:** Altın (#daa520)
- **Arka Plan:** Krem (#f5f5dc)
- **Metin:** Koyu Gri (#333)

## 🚀 Deployment

### Netlify ile Deployment

1. GitHub repository'sini Netlify'e bağlayın
2. Build ayarları:
   - **Build Command:** `npm run build`
   - **Publish Directory:** `dist`
3. Deploy butonuna tıklayın

### Manuel Deployment

```bash
# Production build oluştur
npm run build

# dist/ klasörünü hosting servisine yükle
```

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add amazing feature'`)
4. Branch'i push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için `LICENSE` dosyasına bakın.

## 👨‍💻 Geliştirici

**Çınar Yılmaz**
- GitHub: [@yilmazcinar](https://github.com/yilmazcinar)

## 📞 İletişim

Proje hakkında sorularınız için:
- GitHub Issues kullanın
- Proje sayfasındaki İletişim bölümünden ulaşın

---

⭐ Bu projeyi beğendiyseniz yıldız vermeyi unutmayın!

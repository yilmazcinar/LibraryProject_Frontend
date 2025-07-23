import React from "react";
import { Carousel } from "react-bootstrap";

// Import images
import libraryImage from "../assets/slider/libraryImages/library-background.jpg";
import ahmetUmit from "../assets/slider/authorsImages/Ahmet-UMIT.jpg";
import georgeOrwell from "../assets/slider/authorsImages/George-orwell.jpg";
import tolkien from "../assets/slider/authorsImages/J.R.R.-Tolkien.jpg";
import gunslinger from "../assets/slider/BooksImages/Gunslinger.jpg";
import yuzuklerinEfendisi from "../assets/slider/BooksImages/Yüzüklerin-Efendisi.jpeg";
import yirticiKuslar from "../assets/slider/BooksImages/Yırtıcı-Kuslar-Zamani.jpg";

const HeroCarousel = () => {
  const slides = [
    {
      id: 1,
      image: libraryImage,
      title: "BookHole",
      subtitle:
        "Kitapları, yazarları ve ödünç alma işlemlerini kolayca yönetin",
      description:
        "Kitap koleksiyonunuzu düzenleyin, yazarları takip edin ve ödünç alma işlemlerini kayıt altına alın",
      type: "main",
    },
    {
      id: 2,
      images: [
        { id: "author-1", src: ahmetUmit, alt: "Ahmet Ümit" },
        { id: "author-2", src: georgeOrwell, alt: "George Orwell" },
        { id: "author-3", src: tolkien, alt: "J.R.R. Tolkien" },
      ],
      type: "authors",
    },
    {
      id: 3,
      images: [
        { id: "book-1", src: gunslinger, alt: "Gunslinger" },
        { id: "book-2", src: yuzuklerinEfendisi, alt: "Yüzüklerin Efendisi" },
        { id: "book-3", src: yirticiKuslar, alt: "Yırtıcı Kuşlar Zamanı" },
      ],
      type: "books",
    },
  ];

  const getSlideIcon = (type) => {
    switch (type) {
      case "main":
        return "bi-building";
      case "authors":
        return "bi-person-circle";
      case "books":
        return "bi-book";
      default:
        return "bi-star";
    }
  };

  return (
    <div className="container">
      <div className="hero-carousel-container">
        <Carousel
          fade
          interval={4000}
          controls={true}
          indicators={true}
          className="hero-carousel"
        >
          {slides.map((slide) => (
            <Carousel.Item key={slide.id}>
              <div className="carousel-slide">
                {slide.type === "main" ? (
                  // Ana slide - tek resim + metin
                  <>
                    <div className="carousel-image-container">
                      <img
                        className="carousel-image"
                        src={slide.image}
                        alt={slide.title}
                      />
                      <div className="carousel-overlay"></div>
                    </div>
                    <Carousel.Caption className="carousel-caption-custom">
                      <div className="carousel-content">
                        <div className="carousel-icon">
                          <i className={`bi ${getSlideIcon(slide.type)}`}></i>
                        </div>
                        <h2 className="carousel-title">{slide.title}</h2>
                        <h4 className="carousel-subtitle">{slide.subtitle}</h4>
                        <p className="carousel-description">
                          {slide.description}
                        </p>
                        <div className="carousel-buttons">
                          <button className="btn btn-primary btn-lg me-3">
                            <i className="bi bi-play-circle me-2"></i>
                            Sistemi Keşfet
                          </button>
                          <button className="btn btn-outline-light btn-lg">
                            <i className="bi bi-info-circle me-2"></i>
                            Daha Fazla Bilgi
                          </button>
                        </div>
                      </div>
                    </Carousel.Caption>
                  </>
                ) : (
                  // Yazar/Kitap slide'ları - çoklu resim, metin yok
                  <div
                    className="carousel-grid-container"
                    style={{ backgroundImage: `url(${libraryImage})` }}
                  >
                    <div className="carousel-grid-background-overlay"></div>
                    <div
                      className={`carousel-grid carousel-grid-${slide.type}`}
                    >
                      {slide.images.map((imageObj) => (
                        <div
                          key={imageObj.id}
                          className={`carousel-grid-item carousel-grid-item-${slide.type}`}
                        >
                          <img
                            className="carousel-grid-image"
                            src={imageObj.src}
                            alt={imageObj.alt}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default HeroCarousel;

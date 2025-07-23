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
      subtitle: "Modern teknoloji ile kütüphane işlemlerinizi kolaylaştırın",
      description:
        "Kitap ödünç verme, yazar takibi ve envanter yönetimi tek platformda",
      type: "main",
    },
    {
      id: 2,
      image: ahmetUmit,
      title: "Ahmet Ümit",
      subtitle: "Polisiye ve Edebiyat Ustası",
      description: "Türk polisiye edebiyatının önde gelen ismi",
      type: "author",
    },
    {
      id: 3,
      image: georgeOrwell,
      title: "George Orwell",
      subtitle: "Distopik Edebiyatın Dahisi",
      description: "1984 ve Hayvan Çiftliği'nin yaratıcısı",
      type: "author",
    },
    {
      id: 4,
      image: tolkien,
      title: "J.R.R. Tolkien",
      subtitle: "Fantastik Edebiyatın Babası",
      description: "Yüzüklerin Efendisi ve Hobbit'in yaratıcısı",
      type: "author",
    },
    {
      id: 5,
      image: gunslinger,
      title: "The Dark Tower: Gunslinger",
      subtitle: "Stephen King",
      description: "Kara Kule serisinin başlangıcı",
      type: "book",
    },
    {
      id: 6,
      image: yuzuklerinEfendisi,
      title: "Yüzüklerin Efendisi",
      subtitle: "J.R.R. Tolkien",
      description: "Fantastik edebiyatın şaheseri",
      type: "book",
    },
    {
      id: 7,
      image: yirticiKuslar,
      title: "Yırtıcı Kuşlar Zamanı",
      subtitle: "Ahmet Ümit",
      description: "Gerilim dolu bir polisiye roman",
      type: "book",
    },
  ];

  const getSlideIcon = (type) => {
    switch (type) {
      case "main":
        return "bi-building";
      case "author":
        return "bi-person-circle";
      case "book":
        return "bi-book";
      default:
        return "bi-star";
    }
  };

  return (
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
                  <p className="carousel-description">{slide.description}</p>
                  {slide.type === "main" && (
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
                  )}
                </div>
              </Carousel.Caption>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default HeroCarousel;

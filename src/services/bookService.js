// Mock Book Service
class BookService {
  constructor() {
    this.books = [
      {
        id: 1,
        title: "Suç ve Ceza",
        name: "Suç ve Ceza",
        publicationYear: 1866,
        stock: 2,
        author: { id: 1, name: "Fyodor Dostoyevski" },
        publisher: { id: 1, name: "Can Yayınları" },
        categories: [{ id: 1, name: "Klasik Edebiyat" }],
        isbn: "978-975-07-1234-5",
        pageCount: 720,
        description: "Rus edebiyatının en önemli eserlerinden biri.",
        available: true,
        totalCopies: 3,
        availableCopies: 2,
      },
      {
        id: 2,
        title: "1984",
        name: "1984",
        publicationYear: 1949,
        stock: 4,
        author: { id: 2, name: "George Orwell" },
        publisher: { id: 2, name: "İş Bankası Kültür Yayınları" },
        categories: [{ id: 2, name: "Distopya" }],
        isbn: "978-975-458-123-4",
        pageCount: 352,
        description:
          "Totaliter rejimin korkunç tablosunu çizen distopik roman.",
        available: true,
        totalCopies: 5,
        availableCopies: 4,
      },
      {
        id: 3,
        title: "Simyacı",
        name: "Simyacı",
        publicationYear: 1988,
        stock: 0,
        author: { id: 3, name: "Paulo Coelho" },
        publisher: { id: 3, name: "Doğan Kitap" },
        categories: [{ id: 3, name: "Felsefe" }],
        isbn: "978-605-09-1234-5",
        pageCount: 176,
        description: "Kişisel efsaneyi keşfetme yolculuğu.",
        available: false,
        totalCopies: 2,
        availableCopies: 0,
      },
      {
        id: 4,
        title: "Beyaz Zambaklar Ülkesinde",
        name: "Beyaz Zambaklar Ülkesinde",
        publicationYear: 1903,
        stock: 3,
        author: { id: 4, name: "Grigory Petrov" },
        publisher: { id: 4, name: "Everest Yayınları" },
        categories: [{ id: 4, name: "Tarih" }],
        isbn: "978-975-289-123-4",
        pageCount: 240,
        description: "Finlandiya'nın eğitim sistemini anlatan önemli eser.",
        available: true,
        totalCopies: 4,
        availableCopies: 3,
      },
      {
        id: 5,
        title: "Çalıkuşu",
        name: "Çalıkuşu",
        publicationYear: 1922,
        stock: 5,
        author: { id: 5, name: "Reşat Nuri Güntekin" },
        publisher: { id: 5, name: "Türkiye İş Bankası Yayınları" },
        categories: [{ id: 5, name: "Türk Edebiyatı" }],
        isbn: "978-975-596-123-4",
        pageCount: 384,
        description: "Türk edebiyatının sevilen klasik romanı.",
        available: true,
        totalCopies: 6,
        availableCopies: 5,
      },
    ];
  }

  // Get all books
  async getAllBooks() {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...this.books]), 300);
    });
  }

  // Get book by ID
  async getBookById(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const book = this.books.find((b) => b.id === parseInt(id));
        if (book) {
          resolve(book);
        } else {
          reject(new Error("Kitap bulunamadı"));
        }
      }, 300);
    });
  }

  // Add new book
  async createBook(bookData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newBook = {
          id: Math.max(...this.books.map((b) => b.id)) + 1,
          title: bookData.title,
          name: bookData.title,
          publicationYear: bookData.publicationYear,
          stock: bookData.stock,
          author: { id: bookData.authorId, name: "Yeni Yazar" }, // Gerçek uygulamada author servisinden alınmalı
          publisher: bookData.publisherId
            ? { id: bookData.publisherId, name: "Yeni Yayınevi" }
            : null,
          categories: bookData.categoryId
            ? [{ id: bookData.categoryId, name: "Yeni Kategori" }]
            : [],
          available: bookData.stock > 0,
          totalCopies: bookData.stock,
          availableCopies: bookData.stock,
        };
        this.books.push(newBook);
        resolve(newBook);
      }, 300);
    });
  }

  // Update book
  async updateBook(id, bookData) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = this.books.findIndex((b) => b.id === parseInt(id));
        if (index !== -1) {
          const existingBook = this.books[index];
          this.books[index] = {
            ...existingBook,
            id: parseInt(id),
            title: bookData.title,
            name: bookData.title,
            publicationYear: bookData.publicationYear,
            stock: bookData.stock,
            author: {
              id: bookData.authorId,
              name: existingBook.author?.name || "Yazar",
            },
            publisher: bookData.publisherId
              ? {
                  id: bookData.publisherId,
                  name: existingBook.publisher?.name || "Yayınevi",
                }
              : null,
            categories: bookData.categoryId
              ? [{ id: bookData.categoryId, name: "Kategori" }]
              : [],
            available: bookData.stock > 0,
            totalCopies: bookData.stock,
            availableCopies: bookData.stock,
          };
          resolve(this.books[index]);
        } else {
          reject(new Error("Kitap bulunamadı"));
        }
      }, 300);
    });
  }

  // Delete book
  async deleteBook(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = this.books.findIndex((b) => b.id === parseInt(id));
        if (index !== -1) {
          const deletedBook = this.books.splice(index, 1)[0];
          resolve(deletedBook);
        } else {
          reject(new Error("Kitap bulunamadı"));
        }
      }, 300);
    });
  }

  // Search books
  async searchBooks(searchTerm) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const filtered = this.books.filter(
          (book) =>
            book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (book.author?.name || "")
              .toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            book.isbn.includes(searchTerm) ||
            (book.categories?.[0]?.name || "")
              .toLowerCase()
              .includes(searchTerm.toLowerCase())
        );
        resolve(filtered);
      }, 300);
    });
  }

  // Get available books
  async getAvailableBooks() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const available = this.books.filter(
          (book) => book.available && book.stock > 0
        );
        resolve(available);
      }, 300);
    });
  }
}

export const bookService = new BookService();

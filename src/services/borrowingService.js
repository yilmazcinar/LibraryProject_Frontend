// Mock Borrowing Service
class BorrowingService {
  constructor() {
    this.borrowings = [
      {
        id: 1,
        bookId: 1,
        bookTitle: "Suç ve Ceza",
        borrowerName: "Ahmet Yılmaz",
        borrowerMail: "ahmet@example.com",
        borrowerPhone: "+90 (555) 000-00-01",
        borrowingDate: "2025-01-15",
        returnDate: "2025-02-15",
        actualReturnDate: null,
        status: "active", // active, returned, overdue
        notes: "İlk ödünç alma",
        bookForBorrowingRequest: {
          id: 1,
          name: "Suç ve Ceza",
          publicationYear: 1866,
          stock: 2,
        },
      },
      {
        id: 2,
        bookId: 2,
        bookTitle: "1984",
        borrowerName: "Fatma Kaya",
        borrowerMail: "fatma@example.com",
        borrowerPhone: "+90 (555) 000-00-02",
        borrowingDate: "2025-01-10",
        returnDate: "2025-02-10",
        actualReturnDate: "2025-02-08",
        status: "returned",
        notes: "Zamanında iade edildi",
        bookForBorrowingRequest: {
          id: 2,
          name: "1984",
          publicationYear: 1949,
          stock: 4,
        },
      },
      {
        id: 3,
        bookId: 3,
        bookTitle: "Simyacı",
        borrowerName: "Mehmet Demir",
        borrowerMail: "mehmet@example.com",
        borrowerPhone: "+90 (555) 000-00-03",
        borrowingDate: "2024-12-20",
        returnDate: "2025-01-20",
        actualReturnDate: null,
        status: "overdue",
        notes: "Gecikmiş iade",
        bookForBorrowingRequest: {
          id: 3,
          name: "Simyacı",
          publicationYear: 1988,
          stock: 0,
        },
      },
      {
        id: 4,
        bookId: 4,
        bookTitle: "Beyaz Zambaklar Ülkesinde",
        borrowerName: "Ayşe Özkan",
        borrowerMail: "ayse@example.com",
        borrowerPhone: "+90 (555) 000-00-04",
        borrowingDate: "2025-01-20",
        returnDate: "2025-02-20",
        actualReturnDate: null,
        status: "active",
        notes: "Düzenli okuyucu",
        bookForBorrowingRequest: {
          id: 4,
          name: "Beyaz Zambaklar Ülkesinde",
          publicationYear: 1903,
          stock: 3,
        },
      },
      {
        id: 5,
        bookId: 5,
        bookTitle: "Çalıkuşu",
        borrowerName: "Ali Şahin",
        borrowerMail: "ali@example.com",
        borrowerPhone: "+90 (555) 000-00-05",
        borrowingDate: "2025-01-18",
        returnDate: "2025-02-18",
        actualReturnDate: "2025-01-25",
        status: "returned",
        notes: "Erken iade",
        bookForBorrowingRequest: {
          id: 5,
          name: "Çalıkuşu",
          publicationYear: 1922,
          stock: 5,
        },
      },
    ];
  }

  // Get all borrowings
  async getAllBorrowings() {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...this.borrowings]), 300);
    });
  }

  // Get borrowing by ID
  async getBorrowingById(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const borrowing = this.borrowings.find((b) => b.id === parseInt(id));
        if (borrowing) {
          resolve(borrowing);
        } else {
          reject(new Error("Ödünç kaydı bulunamadı"));
        }
      }, 300);
    });
  }

  // Add new borrowing
  async addBorrowing(borrowingData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newBorrowing = {
          id: Math.max(...this.borrowings.map((b) => b.id)) + 1,
          bookId: borrowingData.bookForBorrowingRequest.id,
          bookTitle: borrowingData.bookForBorrowingRequest.name,
          borrowerName: borrowingData.borrowerName,
          borrowerMail: borrowingData.borrowerMail,
          borrowingDate: borrowingData.borrowingDate,
          returnDate: borrowingData.returnDate || null,
          actualReturnDate: null,
          status: "active",
          notes: "",
          bookForBorrowingRequest: borrowingData.bookForBorrowingRequest,
        };
        this.borrowings.push(newBorrowing);
        resolve(newBorrowing);
      }, 300);
    });
  }

  // Update borrowing
  async updateBorrowing(id, borrowingData) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = this.borrowings.findIndex((b) => b.id === parseInt(id));
        if (index !== -1) {
          this.borrowings[index] = {
            ...this.borrowings[index],
            id: parseInt(id),
            borrowerName: borrowingData.borrowerName,
            borrowingDate: borrowingData.borrowingDate,
            returnDate: borrowingData.returnDate,
          };
          resolve(this.borrowings[index]);
        } else {
          reject(new Error("Ödünç kaydı bulunamadı"));
        }
      }, 300);
    });
  }

  // Delete borrowing
  async deleteBorrowing(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = this.borrowings.findIndex((b) => b.id === parseInt(id));
        if (index !== -1) {
          const deletedBorrowing = this.borrowings.splice(index, 1)[0];
          resolve(deletedBorrowing);
        } else {
          reject(new Error("Ödünç kaydı bulunamadı"));
        }
      }, 300);
    });
  }

  // Return book
  async returnBook(id, returnDate = new Date().toISOString().split("T")[0]) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = this.borrowings.findIndex((b) => b.id === parseInt(id));
        if (index !== -1) {
          this.borrowings[index].actualReturnDate = returnDate;
          this.borrowings[index].status = "returned";
          resolve(this.borrowings[index]);
        } else {
          reject(new Error("Ödünç kaydı bulunamadı"));
        }
      }, 300);
    });
  }

  // Get active borrowings
  async getActiveBorrowings() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const active = this.borrowings.filter(
          (b) => b.status === "active" || b.status === "overdue"
        );
        resolve(active);
      }, 300);
    });
  }

  // Get overdue borrowings
  async getOverdueBorrowings() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const today = new Date().toISOString().split("T")[0];
        const overdue = this.borrowings.filter(
          (b) => b.status === "active" && b.returnDate < today
        );
        resolve(overdue);
      }, 300);
    });
  }
}

export const borrowingService = new BorrowingService();

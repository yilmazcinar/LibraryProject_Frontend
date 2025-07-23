// Mock Author Service
class AuthorService {
  constructor() {
    this.authors = [
      {
        id: 1,
        name: "Fyodor Dostoyevski",
        biography:
          "Rus romancı ve kısa öykü yazarı. 19. yüzyıl dünya edebiyatının en büyük yazarlarından biri.",
        birthDate: "1821-11-11",
        deathDate: "1881-02-09",
        nationality: "Rus",
        email: "info@dostoyevski.com",
        bookCount: 12,
        famousWorks: ["Suç ve Ceza", "Karamazov Kardeşler", "Budala"],
      },
      {
        id: 2,
        name: "George Orwell",
        biography: "İngiliz yazar ve gazeteci. Distopik romanları ile tanınır.",
        birthDate: "1903-06-25",
        deathDate: "1950-01-21",
        nationality: "İngiliz",
        email: "info@orwell.com",
        bookCount: 8,
        famousWorks: ["1984", "Hayvan Çiftliği", "Katalonya'ya Selam"],
      },
      {
        id: 3,
        name: "Paulo Coelho",
        biography:
          "Brezilyalı yazar. Eserleri dünya çapında milyonlarca okuyucuya ulaşmıştır.",
        birthDate: "1947-08-24",
        deathDate: null,
        nationality: "Brezilyalı",
        email: "info@paulocoelho.com",
        bookCount: 15,
        famousWorks: ["Simyacı", "Veronika Ölmeye Karar Verdi", "Zahir"],
      },
      {
        id: 4,
        name: "Grigory Petrov",
        biography:
          "Rus din adamı ve eğitimci. Finlandiya eğitim sistemi hakkında yazdı.",
        birthDate: "1868-01-01",
        deathDate: "1925-12-31",
        nationality: "Rus",
        email: "info@petrov.com",
        bookCount: 5,
        famousWorks: ["Beyaz Zambaklar Ülkesinde", "Eğitim ve Yaşam"],
      },
      {
        id: 5,
        name: "Reşat Nuri Güntekin",
        biography:
          "Türk yazar ve eğitimci. Türk edebiyatının önde gelen isimlerinden.",
        birthDate: "1889-11-25",
        deathDate: "1956-12-07",
        nationality: "Türk",
        email: "info@resatnuri.com",
        bookCount: 18,
        famousWorks: ["Çalıkuşu", "Yeşil Gece", "Acımak"],
      },
    ];
  }

  // Get all authors
  async getAllAuthors() {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...this.authors]), 300);
    });
  }

  // Get author by ID
  async getAuthorById(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const author = this.authors.find((a) => a.id === parseInt(id));
        if (author) {
          resolve(author);
        } else {
          reject(new Error("Yazar bulunamadı"));
        }
      }, 300);
    });
  }

  // Add new author
  async createAuthor(authorData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newAuthor = {
          id: Math.max(...this.authors.map((a) => a.id)) + 1,
          ...authorData,
          bookCount: 0,
          famousWorks: [],
        };
        this.authors.push(newAuthor);
        resolve(newAuthor);
      }, 300);
    });
  }

  // Update author
  async updateAuthor(id, authorData) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = this.authors.findIndex((a) => a.id === parseInt(id));
        if (index !== -1) {
          this.authors[index] = { id: parseInt(id), ...authorData };
          resolve(this.authors[index]);
        } else {
          reject(new Error("Yazar bulunamadı"));
        }
      }, 300);
    });
  }

  // Delete author
  async deleteAuthor(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = this.authors.findIndex((a) => a.id === parseInt(id));
        if (index !== -1) {
          const deletedAuthor = this.authors.splice(index, 1)[0];
          resolve(deletedAuthor);
        } else {
          reject(new Error("Yazar bulunamadı"));
        }
      }, 300);
    });
  }

  // Get author's books
  async getAuthorBooks(authorId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        // This would typically come from bookService filtered by authorId
        // For now returning empty array, could be implemented later
        console.log(`Getting books for author ID: ${authorId}`);
        resolve([]);
      }, 300);
    });
  }
}

export const authorService = new AuthorService();

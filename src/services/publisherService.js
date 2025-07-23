// Mock Publisher Service
class PublisherService {
  constructor() {
    this.publishers = [
      {
        id: 1,
        name: "Can Yayınları",
        address: "Demo Şehri, Test Ülkesi",
        phone: "+90 (000) 000-00-11",
        email: "info@demo-can.example",
        establishedYear: 1980,
      },
      {
        id: 2,
        name: "İş Bankası Kültür Yayınları",
        address: "Örnek Şehri, Test Ülkesi",
        phone: "+90 (000) 000-00-12",
        email: "kultur@demo-isbank.example",
        establishedYear: 1945,
      },
      {
        id: 3,
        name: "Doğan Kitap",
        address: "Demo İlçesi, Test Ülkesi",
        phone: "+90 (000) 000-00-13",
        email: "info@demo-dogan.example",
        establishedYear: 1995,
      },
      {
        id: 4,
        name: "Everest Yayınları",
        address: "Test Mahallesi, Demo Ülkesi",
        phone: "+90 (000) 000-00-14",
        email: "info@demo-everest.example",
        establishedYear: 1985,
      },
      {
        id: 5,
        name: "Türkiye İş Bankası Yayınları",
        address: "Örnek Mahallesi, Test Ülkesi",
        phone: "+90 (000) 000-00-15",
        email: "yayin@demo-isbank.example",
        establishedYear: 1924,
      },
    ];
  }

  // Get all publishers
  async getAllPublishers() {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...this.publishers]), 300);
    });
  }

  // Get publisher by ID
  async getPublisherById(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const publisher = this.publishers.find((p) => p.id === parseInt(id));
        if (publisher) {
          resolve(publisher);
        } else {
          reject(new Error("Yayınevi bulunamadı"));
        }
      }, 300);
    });
  }

  // Add new publisher
  async addPublisher(publisherData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newPublisher = {
          id: Math.max(...this.publishers.map((p) => p.id)) + 1,
          ...publisherData,
        };
        this.publishers.push(newPublisher);
        resolve(newPublisher);
      }, 300);
    });
  }

  // Update publisher
  async updatePublisher(id, publisherData) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = this.publishers.findIndex((p) => p.id === parseInt(id));
        if (index !== -1) {
          this.publishers[index] = { id: parseInt(id), ...publisherData };
          resolve(this.publishers[index]);
        } else {
          reject(new Error("Yayınevi bulunamadı"));
        }
      }, 300);
    });
  }

  // Delete publisher
  async deletePublisher(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = this.publishers.findIndex((p) => p.id === parseInt(id));
        if (index !== -1) {
          const deletedPublisher = this.publishers.splice(index, 1)[0];
          resolve(deletedPublisher);
        } else {
          reject(new Error("Yayınevi bulunamadı"));
        }
      }, 300);
    });
  }
}

export const publisherService = new PublisherService();

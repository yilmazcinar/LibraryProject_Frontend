// Mock Category Service
class CategoryService {
  constructor() {
    this.categories = [
      {
        id: 1,
        name: "Klasik Edebiyat",
        description: "Dünya edebiyatının klasik eserleri",
        color: "#e74c3c",
        bookCount: 25,
        isActive: true,
      },
      {
        id: 2,
        name: "Distopya",
        description: "Gelecek kurgusu ve toplumsal eleştiri içeren eserler",
        color: "#34495e",
        bookCount: 12,
        isActive: true,
      },
      {
        id: 3,
        name: "Felsefe",
        description: "Felsefi düşünce ve yaşam felsefesi eserleri",
        color: "#9b59b6",
        bookCount: 18,
        isActive: true,
      },
      {
        id: 4,
        name: "Tarih",
        description: "Tarihsel olaylar ve kişilikler hakkında eserler",
        color: "#f39c12",
        bookCount: 22,
        isActive: true,
      },
      {
        id: 5,
        name: "Türk Edebiyatı",
        description: "Türk yazarların kaleme aldığı edebi eserler",
        color: "#27ae60",
        bookCount: 35,
        isActive: true,
      },
    ];
  }

  // Get all categories
  async getAllCategories() {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...this.categories]), 300);
    });
  }

  // Get category by ID
  async getCategoryById(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const category = this.categories.find((c) => c.id === parseInt(id));
        if (category) {
          resolve(category);
        } else {
          reject(new Error("Kategori bulunamadı"));
        }
      }, 300);
    });
  }

  // Add new category
  async createCategory(categoryData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newCategory = {
          id: Math.max(...this.categories.map((c) => c.id)) + 1,
          ...categoryData,
          bookCount: 0,
          isActive: true,
          color: categoryData.color || "#3498db",
        };
        this.categories.push(newCategory);
        resolve(newCategory);
      }, 300);
    });
  }

  // Update category
  async updateCategory(id, categoryData) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = this.categories.findIndex((c) => c.id === parseInt(id));
        if (index !== -1) {
          this.categories[index] = { id: parseInt(id), ...categoryData };
          resolve(this.categories[index]);
        } else {
          reject(new Error("Kategori bulunamadı"));
        }
      }, 300);
    });
  }

  // Delete category
  async deleteCategory(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = this.categories.findIndex((c) => c.id === parseInt(id));
        if (index !== -1) {
          const deletedCategory = this.categories.splice(index, 1)[0];
          resolve(deletedCategory);
        } else {
          reject(new Error("Kategori bulunamadı"));
        }
      }, 300);
    });
  }

  // Get category's books
  async getCategoryBooks(categoryId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        // This would typically come from bookService filtered by categoryId
        console.log(`Getting books for category ID: ${categoryId}`);
        resolve([]);
      }, 300);
    });
  }

  // Get active categories
  async getActiveCategories() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const active = this.categories.filter((c) => c.isActive);
        resolve(active);
      }, 300);
    });
  }
}

export const categoryService = new CategoryService();

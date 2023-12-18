class Pagination {
  constructor({ quantity, page }) {
    this.quantity = quantity || 20;
    this.page = page <= 0 ? 1 : page;
  }

  queryPagination() {
    const quantity = this.quantity <= 0 ? 20 : this.quantity;

    return {
      skip: (this.page - 1) * quantity,
      limit: quantity,
    };
  }
}

module.exports = Pagination;

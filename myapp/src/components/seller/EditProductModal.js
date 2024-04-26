import React, { useState } from 'react';

function EditProductModal({ product, isOpen, onClose, onUpdateProduct }) {
  const [editedProduct, setEditedProduct] = useState(null);

  // Check if product is null
  if (!product) {
    return null;
  }

  const { proName, proDesc, proPrice, image, proStatus } = product;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct({ ...editedProduct, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateProduct(editedProduct);
    onClose();
  };

  return (
    <div className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 ${isOpen ? '' : 'hidden'}`}>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Edit Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="proName" className="block text-gray-700 text-sm font-bold mb-2">Name</label>
            <input
              type="text"
              id="proName"
              name="proName"
              value={editedProduct ? editedProduct.proName : proName}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Enter product name"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="proDesc" className="block text-gray-700 text-sm font-bold mb-2">Description</label>
            <textarea
              id="proDesc"
              name="proDesc"
              value={editedProduct ? editedProduct.proDesc : proDesc}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 resize-none"
              rows="4"
              placeholder="Enter product description"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="proPrice" className="block text-gray-700 text-sm font-bold mb-2">Price</label>
            <input
              type="number"
              id="proPrice"
              name="proPrice"
              value={editedProduct ? editedProduct.proPrice : proPrice}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Enter product price"
              required
            />
          </div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg">
            Update
          </button>
          <button onClick={onClose} className="ml-2 text-gray-500 hover:text-gray-600 font-bold py-2 px-4 rounded-lg">
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditProductModal;

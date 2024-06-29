import React, { useState } from 'react';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { DeleteProduct } from '../../api';

function EditProductModal({ product, onSave, onCancel }) {
  const [editedProduct, setEditedProduct] = useState(product);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct(prevProduct => ({
      ...prevProduct,
      [name]: value
    }));
  };

  const handleSave = () => {
    onSave(editedProduct);
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-lg w-full max-w-md mx-2 sm:p-8">
        <h2 className="text-lg font-bold mb-4">Edit Product</h2>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input type="text" id="name" name="proName" value={editedProduct.proName} onChange={handleChange} className="mt-1 p-2 border rounded-lg w-full" />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
          <input type="number" id="price" name="proPrice" value={editedProduct.proPrice} onChange={handleChange} className="mt-1 p-2 border rounded-lg w-full" />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea id="description" name="proDesc" value={editedProduct.proDesc} onChange={handleChange} className="mt-1 p-2 border rounded-lg w-full"></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image</label>
          <input type="file" id="image" name="imageFile" value={editedProduct.imageFile} onChange={handleChange} className="mt-1 p-2 border rounded-lg w-full" />
        </div>
        <div className="flex justify-end">
          <button onClick={handleSave} className="bg-blue-500 text-white font-semibold px-4 py-2 mr-2 rounded-lg hover:bg-blue-600">Save</button>
          <button onClick={onCancel} className="bg-gray-300 text-gray-800 font-semibold px-4 py-2 rounded-lg hover:bg-gray-400">Cancel</button>
        </div>
      </div>
    </div>
  );
}

const truncateString = (str, num) => {
  if (str.length > num) {
    return str.slice(0, num) + '...';
  } else {
    return str;
  }
};

const deleteProduct = (productId, product) => {
  // Perform delete logic here
  console.log("Product to Delete: ", product);
  console.log(`Delete product with ID: ${productId}`);

  DeleteProduct(product);
  alert("Product Deleted Successfully!!!");
  window.location.reload();
};

function ProductList({ allProducts }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [editingProduct, setEditingProduct] = useState(null);
  const productsPerPage = 8;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = allProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const editProduct = (product) => {
    setEditingProduct(product);
  };

  const saveEditedProduct = (editedProduct) => {
    // Perform save logic here
    console.log('Saving edited product:', editedProduct);
    setEditingProduct(null);
  };

  const cancelEdit = () => {
    setEditingProduct(null);
  };

  // Pagination JSX
  const paginationJSX = (
    <div className="mt-6 flex justify-between items-center">
      {allProducts.length > productsPerPage && (
        <>
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="text-gray-600 hover:text-gray-800 disabled:opacity-50 flex items-center"
          >
            <BsChevronLeft className="h-6 w-6 mr-1" />
            Previous
          </button>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={indexOfLastProduct >= allProducts.length}
            className="text-gray-600 hover:text-gray-800 disabled:opacity-50 flex items-center"
          >
            Next
            <BsChevronRight className="h-6 w-6 ml-1" />
          </button>
        </>
      )}
    </div>
  );

  return (
    <div className="overflow-x-auto">
      {/* Product Table */}
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Image
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Price
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Description
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {currentProducts.map((product) => (
            <tr key={product.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <img src={product.imageFile} alt="" className="w-12 h-12 object-cover rounded-lg" />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{truncateString(product.proName, 30)}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">$ {product.proPrice}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{truncateString(product.proDesc, 30)}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className={`text-sm font-bold px-2 py-1 rounded ${product.proStatus === 'approved' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                  {product.proStatus === 'approved' ? 'Approved' : 'Pending'}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <button onClick={() => deleteProduct(product.id, product)} className="text-red-600 hover:text-red-900">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {paginationJSX}

      {/* Edit Product Modal */}
      {editingProduct && <EditProductModal product={editingProduct} onSave={saveEditedProduct} onCancel={cancelEdit} />}
    </div>
  );
}

export default ProductList;

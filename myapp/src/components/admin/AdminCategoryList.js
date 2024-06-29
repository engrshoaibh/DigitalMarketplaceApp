import React, { useState, useEffect } from 'react';
import { GetCategories, AddCategory, DeleteCategory } from '../../api';

const AddCategoryList = () => {
  const [categoryName, setCategoryName] = useState('');
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const fetchedData = await GetCategories();
      console.log("Category Data: ", fetchedData);
      setCategories(fetchedData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleChange = (event) => {
    setCategoryName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (categoryName.trim() === '') {
      alert("Please enter a category name to add a category");
      return;
    }

    try {
      await AddCategory({ category: categoryName });
      setCategoryName('');
      fetchCategories();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (categoryToDelete) => {
    try {
      await DeleteCategory(categoryToDelete._id);
      fetchCategories();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="categoryName" className="block text-gray-700 text-sm font-bold mb-2">Category Name</label>
            <input
              type="text"
              id="categoryName"
              value={categoryName}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Enter category name"
              required
            />
          </div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg">
            Add Category
          </button>
        </form>
      </div>
      <div className="border border-gray-300 rounded-md p-4 m-4">
        <h2 className="text-lg font-bold text-center mb-4 text-blue-500">Added Categories</h2>
        <hr className="w-full mb-4" />
        <div className="flex flex-wrap justify-center">
          {categories.map((currentCategory, index) => (
            <div key={index} className="bg-blue-100 rounded-full px-3 py-1 m-2 flex items-center">
              <h3 className="text-blue-800">{currentCategory.category}</h3>
              <button
                onClick={() => handleDelete(currentCategory)}
                className="ml-2 text-red-500 hover:text-red-700"
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AddCategoryList;

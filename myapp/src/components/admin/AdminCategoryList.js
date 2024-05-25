import React, { useState, useEffect } from 'react';
import { GetCategories, AddCategory } from '../../api';

const AddCategoryList = () => {
  const [categoryName, setCategoryName] = useState('');
  const [category, setCategory] = useState([])
  const fetchCategories = () =>{
    try {
      let fetchedData = GetCategories(setCategory);
      console.log("Fetched Data  ", fetchedData);
      setCategory(fetchedData);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchCategories();
    console.log("Categories : ", category);
    setCategory(category);
  }, [category]);

  const handleChange = (event) => {
    setCategoryName(event.target.value);
  };

  const handleSubmit = async (event) => {
    if (categoryName.trim() === '') {
      alert("Please Enter Category Name to add a category")
      return;
    }
    
    const newCategory = AddCategory({category : categoryName})
    await newCategory.save;

    setCategoryName('');

    fetchCategories();
    console.log("Categories : ", category);
    setCategory(category);

    window.location.reload();

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
      <h2 className="text-lg font-bold text-center mb-4 text-blue-500">Added Categories are Given Below</h2>
      <hr className="w-full mb-4" />
      <div className="flex flex-wrap justify-center">
        {category?.map((currentCategory, index) => (
          <div key={index} className="bg-blue-100 rounded-full px-3 py-1 m-2">
            <h3 className="text-blue-800">{currentCategory.category}</h3>
          </div>
        ))}
      </div>
</div>


    </>
  );
};

export default AddCategoryList;

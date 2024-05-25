import React, { useState, useEffect } from 'react';
import { createNewProduct, GetCategories } from '../../api';
import Select from "react-select";
import Toast from '../Toast';

const europeanCountries = [
  { value: 'austria', label: 'Austria' },
  { value: 'belgium', label: 'Belgium' },
  { value: 'bulgaria', label: 'Bulgaria' },
  { value: 'croatia', label: 'Croatia' },
  { value: 'cyprus', label: 'Cyprus' },
  { value: 'czech-republic', label: 'Czech Republic' },
  { value: 'denmark', label: 'Denmark' },
  { value: 'estonia', label: 'Estonia' },
  { value: 'finland', label: 'Finland' },
  { value: 'france', label: 'France' },
  { value: 'germany', label: 'Germany' },
  { value: 'greece', label: 'Greece' },
  { value: 'hungary', label: 'Hungary' },
  { value: 'ireland', label: 'Ireland' },
  { value: 'italy', label: 'Italy' },
  { value: 'latvia', label: 'Latvia' },
  { value: 'lithuania', label: 'Lithuania' },
  { value: 'luxembourg', label: 'Luxembourg' },
  { value: 'malta', label: 'Malta' },
  { value: 'netherlands', label: 'Netherlands' },
  { value: 'poland', label: 'Poland' },
  { value: 'portugal', label: 'Portugal' },
  { value: 'romania', label: 'Romania' },
  { value: 'slovakia', label: 'Slovakia' },
  { value: 'slovenia', label: 'Slovenia' },
  { value: 'spain', label: 'Spain' },
  { value: 'sweden', label: 'Sweden' },
  { value: 'united-kingdom', label: 'United Kingdom' },
  { value: 'switzerland', label: 'Switzerland' },
];

function AddProductForm() {
  const [toastMessage, setToastMessage] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [proName, setProName] = useState('');
  const [proDesc, setProDesc] = useState('');
  const [proPrice, setProPrice] = useState('');
  const [selectedFile, setSelectedFile] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [category, setCategory] = useState([]);

  const fetchCategories = async () => {
    try {
      const fetchedData = await GetCategories(setCategory);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [category]);

  const handleCategoryChange = (selectedOption) => {
    console.log('Selected category:', selectedOption);
    setSelectedCategory(selectedOption);
  };

  const handleLocationChange = (selectedOption) => {
    console.log('Selected location:', selectedOption);
    setSelectedLocation(selectedOption);
  };

  const handleFileChange = (e) => {
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setSelectedFile(reader.result);
    };
    reader.onerror = (error) => {
      console.log(error);
    };
  };

  const handleAddProduct = () => {
    setShowForm(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (proName === "" || proDesc === "" || proPrice === "" || !selectedLocation || !selectedCategory || !selectedFile) {
      return alert("Fill all the fields! You cannot register with empty fields!");
    }

    const newProduct = {
      proName: proName,
      proDesc: proDesc,
      proPrice: proPrice,
      proLocation: selectedLocation.value,
      proStatus: 'Pending',
      imageFile: selectedFile,
      productCategory: selectedCategory.value
    };

    try {
      const newProductAdded = await createNewProduct(newProduct);
      if (newProductAdded) {
        setToastMessage('Product added successfully');
      }
    } catch (error) {
      console.log(error);
      setToastMessage('Failed to add product');
    }

    setProName("");
    setProDesc("");
    setProPrice("");
    setSelectedLocation(null);
    setSelectedCategory(null);
    setSelectedFile("");
  };

  return (
    <div className="max-w-md mx-auto bg-gray-100 p-8 rounded-md shadow-md mt-6 mb-6">
      <h1 className='text-center text-3xl font-extrabold text-gray-900 mb-8'>Add Product</h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name</label>
          <input
            type="text"
            id="name"
            value={proName}
            onChange={(e) => setProName(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Enter product name"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Description</label>
          <textarea
            id="description"
            value={proDesc}
            onChange={(e) => setProDesc(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 resize-none"
            rows="4"
            placeholder="Enter product description"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2">Price</label>
          <input
            type="number"
            id="price"
            value={proPrice}
            onChange={(e) => setProPrice(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Enter product price"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="location" className="block text-gray-700 text-sm font-bold mb-2">Location</label>
          <Select
            value={selectedLocation}
            onChange={handleLocationChange}
            options={europeanCountries}
            placeholder="Select product location"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block text-gray-700 text-sm font-bold mb-2">Image</label>
          <input
            type="file"
            id="image"
            onChange={handleFileChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            accept="image/*"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="category" className="block text-gray-700 text-sm font-bold mb-2">Select the Product Category</label>
          <Select
            value={selectedCategory}
            onChange={handleCategoryChange}
            options={category.map(item => ({ value: item.category.toLowerCase(), label: item.category }))}
            placeholder="Select product category"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg">
          Submit
        </button>
      </form>
      {toastMessage && (
        <div className="mt-4 bg-gray-600 text-white font-bold py-2 px-4 rounded-lg">{toastMessage}</div>
      )}
    </div>
  );
}

export default AddProductForm;

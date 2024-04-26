
import React, { useState, useEffect } from 'react';
import { createNewProduct,GetCategories } from '../../api';
import Select from "react-select";

function AddProductForm() {
  const [toastMessage, setToastMessage] = useState("")
  const [showForm, setShowForm] = useState(false);
  const [proName, setproName] = useState('');
  const [proDesc, setproDesc] = useState('');
  const [proPrice, setproPrice] = useState('');
  const [selectedFile, setSelectedFile] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
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
  }, []);

  const handleSelectChange = (selectedOption) => {
    console.log('Selected option:', selectedOption.value);
    setSelectedOption(selectedOption.value);
  };

  const handleFileChange = (e) => {
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0])
    reader.onload = () => {
        //console.log(reader.result)
        setSelectedFile(reader.result)
    }

    reader.onerror = (error) => {
        console.log(error)
    }
};

  const handleAddProduct = () => {
    setShowForm(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if(proName === "" || proDesc === "" || proPrice === ""){
      return alert("Fill All the fields!!! \nYou cannot register with empty fields!")
  }

    const newProduct = {
      proName : proName,
      proDesc : proDesc,
      proPrice : proPrice,
      proStatus: 'Pending',
      imageFile : selectedFile,
      productCategory : selectedOption
    };
    
    const newProductAdded = createNewProduct(newProduct);
    await newProductAdded.save

    if(newProductAdded){
      console.log('Product added successfully')
    }
    alert("Product has been added.")

    setproName("")
    setproDesc("")
    setproPrice("")
    setSelectedOption("")
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
            onChange={(e) => setproName(e.target.value)}
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
            onChange={(e) => setproDesc(e.target.value)}
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
            onChange={(e) => setproPrice(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Enter product price"
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
          {/* <Select
            value={selectedOption}
            onChange={handleSelectChange}
            options={category}
          /> */}
          <Select
            value={selectedOption}
            onChange={handleSelectChange}
            options={category.map(item => ({ value: item.category.toLowerCase(), label: item.category }))}
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

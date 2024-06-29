import axios from "axios";

const urlProd = "http://localhost:3001/products"
const urlUser = "http://localhost:3001/users"

const createNewProduct = async (newPro) => {
    await axios.post(urlProd + "/addProduct", newPro)
}

const FetchAllProducts = async (setProducts) => {
    try {
        const res = await axios.get(urlProd + "/getProducts");
        setProducts(res.data);
    } catch (err) {
        console.log(err);
    }
};

const DeleteProduct = async (product) => {
    console.log("Product Data In API", product)
    await axios.delete(urlProd + "/deleteProduct", {data : product})
    .then((res) => {
        console.log("Product Data Deleted!!!")
    }).catch((err) => {
        console.log("Error While Fetching Products Data!!!")
    })

    // window.location.reload()
}

const FetchAllUsers = async () => {
    try {
      const response = await axios.get(urlUser + "/getUsers");
      return response.data;
    } catch (error) {
      console.error("Error while fetching users:", error);
      throw error; // Throw the error to be caught by the caller
    }
  };
  

const RegisterUser = async (newUser) => {
    await axios.post(urlUser + "/registerUser", newUser)
}

const LoginUser = async (userData) => {
    try {
        console.log("User Data", userData);
        
        const response = await axios.post(urlUser + "/loginUser", userData);
       
       
        if(response.data.user && response.data.user.userStatus === "approved"){
            return response.data.user;
        }
        return false;

    } catch (error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            console.error("Server Error:", error.response.data);
        } else if (error.request) {
            // The request was made but no response was received
            console.error("No Response from Server:", error.request);
        } else {
            // Something happened in setting up the request that triggered an error
            console.error("Request Error:", error.message);
        }
        console.error("Error While Fetching User Data:", error); // Log general error
    }
};

const UpdateProductStatus = async (product) => {
    console.log("Product .... ", product);
    await axios.patch(urlProd + "/updateProduct", product);
    window.location.reload(true)
}

const UpdateUserStatus = async (user) => {
    console.log("User .... ", user);
    await axios.patch(urlUser + "/updateUser", user);
    window.location.reload(true)
}

const GetCategories = async () => {
    try {
        const response = await axios.get(urlProd + "/getCategory")
        
        return response.data;
      } catch (error) {
        console.error("Error while fetching users:", error);
        throw error; // Throw the error to be caught by the caller
      }
}

const AddCategory = async (category) => {
    await axios.post(urlProd + "/addCategory", category)
    window.location.reload(true)
}
const DeleteCategory = async (id) => {
    
    await axios.delete(urlProd + `/deleteCategory/${id}`)
    window.location.reload(true)
}

const SearchProducts = async (searchQuery) => {
    try {
     
        const response = await axios.get(`${urlProd}/search?proName=${searchQuery}`);
        console.log("Search Products",response.data)
        return response.data;

    } catch (error) {
        console.error("Error while searching products:", error);
        throw error;
    }
};
const ForgotPassword = async(email,userType) =>{
    console.log(email);
    await axios.post(`${urlUser}/forgot-password`, {email,userType}).then((res)=> {
        console.log("New password sent to your email successfully")
        return res.data.message
    }).catch((error) => {
        console.log("Email not send", error);
        return error.message
    })
}

export {createNewProduct, FetchAllProducts, RegisterUser, LoginUser, UpdateProductStatus, UpdateUserStatus, FetchAllUsers, GetCategories, AddCategory, DeleteProduct,SearchProducts,DeleteCategory,ForgotPassword}


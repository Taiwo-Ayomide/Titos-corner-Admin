import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import UserList from "./pages/userList/UserList";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import BlogList from "./pages/blogList/BlogList";
import RecipeList from "./pages/recipeList/RecipeList";
import Login from "./pages/login/Login";
import NewProduct from "./pages/newProduct/NewProduct";
import NewBlog from "./pages/newBlog/NewBlog";
import NewRecipe from "./pages/newRecipe/NewRecipe";
import NewBook from "./pages/newBook/NewBook";
import BookList from "./pages/bookList/BookList";
import { useSelector } from "react-redux";
import Layout from "./components/Layout"; // Adjust path as necessary

function App() {
  const currentUser = useSelector((state) => state.user?.currentUser);
  const admin = currentUser?.isAdmin;

  return (
    <Router>
      <Routes>
        {!currentUser ? (
          <Route path="*" element={<Login />} />
        ) : (
          <>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              {admin && (
                <>
                  <Route path="/users" element={<UserList />} />
                  <Route path="/newuser" element={<NewUser />} />
                  <Route path="/newblogs" element={<NewBlog />} />
                  <Route path="/newrecipes" element={<NewRecipe />} />
                  <Route path="/products" element={<ProductList />} />
                  <Route path="/newproduct" element={<NewProduct />} />
                  <Route path="/newbook" element={<NewBook />} />
                  <Route path="/blogs" element={<BlogList />} />
                  <Route path="/recipes" element={<RecipeList />} />
                  <Route path="/books" element={<BookList />} />
                </>
              )}
            </Route>
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;

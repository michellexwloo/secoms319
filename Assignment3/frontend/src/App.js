import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

function App() {
  const [ProductsCategory, setProductsCategory] = useState([]);
  const [oneProduct, setOneProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [OneFound, setOneFound] = useState(false);

  useEffect(() => {
    getAllProducts();
  }, []);

  function getAllProducts() {
    setIsLoading(true);
    fetch("http://localhost:8081/listProducts")
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        setProductsCategory(res);
        setIsLoading(false);
      });
  }

  function getOneProducts(id) {
    setIsLoading(true);
    setOneFound(false);
    fetch("http://localhost:8081/listProducts/" + id)
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        setOneProduct(res);
        setIsLoading(false);
        setOneFound(true);
      })
      .catch((err) => {
        console.log("Product does not exist");
        setIsLoading(false);
        setOneProduct("Id does not exist");
        setOneFound(true);
      });
  }

  const listProducts = ProductsCategory.map((el) => (
    <div key={el.id} className="col">
      <div style={{ backgroundColor: "#ECECEC" }} className="card shadow-sm">
        Product Id: {el.id}
        <img className="imgnew" src={el.image} width={200} /> <br />
        <div className="card-body" id="cardtoo">
          <p className="title">
            {el.title} <br />
          </p>
          {el.description} <br />
          <br />
          <span className="price">
            Price:
            {" $"}
            {el.price}
            <br />
          </span>
          Category: {el.category} <br />
          Rating: {el.rating.rate} <br />
          Count: {el.rating.count}
          <br />
        </div>
      </div>
    </div>
  ));

  function showOne() {
    if (oneProduct === "Id does not exist") {
      return <div>Product ID does not exist</div>;
    } else if (oneProduct === null) {
      return <div></div>;
    } else {
      return (
        <div>
          <hr></hr>
          Id: {oneProduct.id} <br />
          Title: {oneProduct.title}
          <br />
          Description: {oneProduct.description}
          <br />
          Category: {oneProduct.category}
          <br />
          Price: {oneProduct.price}
          <br />
          Rating: {oneProduct.rating && oneProduct.rating.rate}
          <br />
          Count: {oneProduct.rating && oneProduct.rating.count}
          {DeleteProduct && (
            <div>
              <hr></hr>
              <button className="btn btn-primary my-2" onClick={deleteProducts}>
                Delete Product
              </button>
            </div>
          )}
          {UpdateProduct && (
            <div>
              <hr></hr>
              <h5>New Price: </h5>
              <input
                className="inputcreateboxes"
                type="Price"
                onChange={PriceChange}
              />
              <p></p>
              <button className="btn btn-primary my-2" onClick={updateProducts}>
                Update Product
              </button>
            </div>
          )}
        </div>
      );
    }
  }

  // Find product by id
  const [queryID, setQueryID] = useState("");

  const FindQueryID = (e) => {
    setQueryID(e.target.value);
  };

  function SelectButton() {
    getOneProducts(queryID);
    console.log(queryID);
  }

  //Displays
  const [ListProduct, setListProduct] = useState(true);
  const [UpdateProduct, setUpdateProduct] = useState(false);
  const [AddProduct, setAddProduct] = useState(false);
  const [DeleteProduct, setDeleteProduct] = useState(false);
  const [About, setAbout] = useState(false);

  function ShowList() {
    setListProduct(true);
    setUpdateProduct(false);
    setAddProduct(false);
    setDeleteProduct(false);
    setAbout(false);
  }

  function ShowUpdate() {
    setListProduct(false);
    setUpdateProduct(true);
    setAddProduct(false);
    setDeleteProduct(false);
    setAbout(false);
    setQueryID("");
    setOneFound(null);
    showOne();
  }

  function ShowAdd() {
    setListProduct(false);
    setUpdateProduct(false);
    setAddProduct(true);
    setDeleteProduct(false);
    setAbout(false);
  }

  function ShowDelete() {
    setListProduct(false);
    setUpdateProduct(false);
    setAddProduct(false);
    setDeleteProduct(true);
    setAbout(false);
    setQueryID("");
    setOneFound(null);
    showOne();
  }

  function ShowAbout() {
    setListProduct(false);
    setUpdateProduct(false);
    setAddProduct(false);
    setDeleteProduct(false);
    setAbout(true);
  }

  function addProducts() {
    postMethod();
  }

  // Add product
  function postMethod() {
    fetch("http://localhost:8081/addProducts", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        id: Id,
        title: Title,
        price: Price,
        description: Description,
        category: Category,
        imageUrl: Image,
        rating: Rate,
        counting: Count,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
    window.location.reload();
  }

  function deleteProducts() {
    deleteMethod(oneProduct.id);
  }

  // Delete product
  function deleteMethod(id) {
    fetch("http://localhost:8081/deleteProducts", {
      method: "DELETE",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        id: id,
      }),
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      // Reload the page only after the delete operation is successful
      window.location.reload();
    })
    .catch((err) => console.log("Error:" + err));
  }

  // Update product
  function updateProducts() {
    updateMethod(oneProduct.id);
  }

  function updateMethod(id) {
    fetch("http://localhost:8081/updateProducts", {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        id: id,
        price: Price,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log("Errror:" + err));
    window.location.reload();
  }

  const [Id, setId] = useState();
  const [Title, setTitle] = useState("");
  const [Price, setPrice] = useState();
  const [Description, setDescription] = useState("");
  const [Category, setCategory] = useState("");
  const [Image, setImage] = useState("");
  const [Rate, setRate] = useState();
  const [Count, setCount] = useState();

  const IdChange = (e) => {
    setId(parseFloat(e.target.value));
  };

  const TitleChange = (e) => {
    setTitle(e.target.value);
  };

  const PriceChange = (e) => {
    setPrice(parseFloat(e.target.value));
  };

  const DescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const CategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const ImageChange = (e) => {
    setImage(e.target.value);
  };

  const RateChange = (e) => {
    setRate(parseFloat(e.target.value));
  };

  const CountChange = (e) => {
    setCount(parseFloat(e.target.value));
  };

  return (
    <>
      <header className="navbar sticky-top bg-dark flex-md-nowrap p-0 shadow">
        <div className="container-fluid d-flex align-items-center">
          <h2 className="d-flex align-items-center fs-4 text-white mb-0">
            Assignment 3: Store Management
          </h2>
          <br />
          <div>
            <button className="btn btn-primary my-2" onClick={ShowList}>
              List Products
            </button>
            .
            <button className="btn btn-primary my-2" onClick={ShowAdd}>
              Create
            </button>
            .
            <button className="btn btn-primary my-2" onClick={ShowUpdate}>
              Update
            </button>
            .
            <button className="btn btn-primary my-2" onClick={ShowDelete}>
              Delete
            </button>
            .
            <button className="btn btn-primary my-2" onClick={ShowAbout}>
              About Us
            </button>
          </div>
        </div>
      </header>

      <div className="separation"></div>

      {/* About Us */}
      {About && (
        <div id="content">
          <h2>
            <u>About Us</u>
          </h2>

          <h1>SE/COM S 319: Construction of User Interface</h1>
          <h2>Created by: </h2>
          <section id="creator">
            <h4 id="team">Team 24</h4>
            <div class="container-sm text-left">
              <div class="row">
                <div class="col student">
                  <p>
                    <strong>Name: </strong>Chris Smith | &nbsp;
                    <strong>Email: </strong>clsmith3@iastate.edu
                  </p>
                </div>
              </div>
              <div class="row">
                <div class="col student">
                  <p>
                    <strong>Name: </strong>Xuan Wen Loo | &nbsp;
                    <strong>Email: </strong>xuanwen@iastate.edu
                  </p>
                </div>
              </div>
            </div>
          </section>
          <h5>Date: 9 December 2023</h5>
          <h4>Professor: Dr. Abraham Aldaco</h4>
          <br></br>
          <h4>Project description: </h4>
          <p>
            This is a departmental store management web application where
            employees can effortlessly oversee the store's product inventory.
            This user-friendly app enables seamless product viewing, addition of
            new product, deletion of discontinued products, and price updates
            for existing products. It is ideal for efficient and streamlined
            management of a diverse range of products within the store.
          </p>
        </div>
      )}

      {/* Get */}
      {ListProduct && (
        <div>
          <div className="container">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 ">
              {listProducts}
            </div>
          </div>
        </div>
      )}

      {/* Add */}
      {AddProduct && (
        <div style={{ marginLeft: "8px" }}>
          <h4>Fill in the information of the new product</h4>
          <h5>ID: </h5>
          <input className="inputcreateboxes" type="Id" onChange={IdChange} />
          <h5>Title: </h5>
          <input
            className="inputcreateboxes"
            type="Title"
            onChange={TitleChange}
          />
          <h5>Price: </h5>
          <input
            className="inputcreateboxes"
            type="Price"
            onChange={PriceChange}
          />
          <h5>Description: </h5>
          <input
            className="inputcreateboxes"
            type="Description"
            onChange={DescriptionChange}
          />
          <h5>Category: </h5>
          <input
            className="inputcreateboxes"
            type="Category"
            onChange={CategoryChange}
          />
          <h5>Image: </h5>
          <input
            className="inputcreateboxes"
            type="Images"
            onChange={ImageChange}
          />
          <h5>Rating: </h5>
          <input
            className="inputcreateboxes"
            type="Rate"
            onChange={RateChange}
          />
          <h5>Count: </h5>
          <input
            className="inputcreateboxes"
            type="Count"
            onChange={CountChange}
          />
          <hr></hr>
          <button className="btn btn-primary my-2" onClick={addProducts}>
            Create Product
          </button>
        </div>
      )}

      {/* Update */}
      {UpdateProduct && (
        <div style={{ marginLeft: "8px" }}>
          <h4>Input product id to update its price</h4>

          <input
            className="inputcreateboxes"
            type="search"
            value={queryID}
            onChange={FindQueryID}
          />
          <p></p>
          <button className="btn btn-primary my-2" onClick={SelectButton}>
            Search
          </button>
          {OneFound && <div>{showOne()}</div>}
        </div>
      )}

      {/* Delete */}
      {DeleteProduct && (
        <div style={{ marginLeft: "8px" }}>
          <h4>Input product id to delete the product</h4>
          <input
            className="inputcreateboxes"
            type="search"
            value={queryID}
            onChange={FindQueryID}
          />
          <p></p>
          <button className="btn btn-primary my-2" onClick={SelectButton}>
            Search
          </button>
          {OneFound && <div>{showOne()}</div>}
        </div>
      )}

      <footer>
        <div class="container">
          <p class="float-end mb-2">
            <a href="#">Back to top</a>
          </p>
          <p class="mb-6">&copy;Team 24. Assignment 3</p>
        </div>
      </footer>
    </>
  );
}

export default App;

import Product from "../models/Product.js";
//function to get all products from the DB. (Not: there is no token resteiction)
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find(); // search all item in Product model in the DB
    res.json(products); // to send them what it found to the frontend so developer can manage it
  } catch (error) {
    // if any error occur, this code block can execute
    // to send request failed to the frontend
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

// function to get the specific item
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    // it used one of the method of mongo atlas to find the specific item by number. in this case id of pruduct taken by using params method. Params method takes the info from URL not the frontend like body method does

    // the stuation not to find specific item, run this if block
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    //if everything goes well, sent the item that found to the frontend as a respond
    res.json(product);
    //if there is any error, run this block of code
  } catch (error) {
    console.error(error);
    // to send respond to the frontend
    res.status(500).json({ message: "Error fetching product" });
  }
};

// to add a new product in the Product model in the DB
export const createProduct = async (req, res) => {
  console.log(req + "rq");

  try {
    // to set the pattern of the new product that is going to save by admin.
    const product = new Product({
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
      description: req.body.description,
      image: req.file.path,
    });

    // to save the new product in the db (this is also asychronous run, await has to applied)
    const savedProduct = await product.save();
    //// to send to the frontend what it saved as a JSON
    res.json(savedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create product" });
  }
};

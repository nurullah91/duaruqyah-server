const express = require("express");
const port = process.env.PORT || 5000;
const cors = require("cors");
const app = express();

// Data
const dua = require("./duas.json");
const categories = require("./categories.json");
const sub_category = require("./sub_category.json");

// middleware
app.use(express.json());
app.use(cors());

// JSON data

// Home
app.get("/", (req, res) => {
  res.send("Dua zone is running...");
});

// API's
// Category api
app.get("/api/categories", (req, res) => {
  res.send(categories);
});

// Sub category api
app.get("/api/subcategories", (req, res) => {
    res.send(sub_category);
});

// Sub category api with category id
app.get("/api/subcategories/:categoryId", (req, res) => {
    const categoryId = req.params.categoryId;
   
    const selectedSubcategory = sub_category.filter((subCat)=>subCat.cat_id === +categoryId);

    res.send(selectedSubcategory);
});

// Dua Api
app.get("/api/dua", (req, res) => {
    res.send(dua);
});

app.get("/api/dua/:categoryId", (req, res) => {
  const categoryId = req.params.categoryId;

  const selectedDuas = dua.filter((item) => item.cat_id === +categoryId); //this + convert category id string to number

  res.send(selectedDuas);
});

app.get("/api/dua/subcategory/:subcategoryId", (req, res) => {
  const subcategoryId = req.params.subcategoryId;
  const selectedDua = dua.filter((item) => item.subcat_id === +subcategoryId);

  res.send(selectedDua);
});

app.listen(port, () => {
  console.log(`Duaruqyah server is running on the port ${port}`);
});

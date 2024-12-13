const router = require("express").Router();
const Cat = require("../models/category");

// Add Category
router.post("/add-category", async (req, res) => {
  try {
    const { categoryName } = req.body;

    // Check if category already exists
    const existingCategory = await Cat.findOne({ categoryName });
    if (existingCategory) {
      return res.status(400).json({ message: "Category already exists" });
    }

    // Create and save the new category
    const cat = new Cat({ categoryName });
    await cat.save();

    return res.status(201).json({ message: "Category added successfully", data: cat });
  } catch (error) {
    console.error("Error adding category:", error);
    return res.status(500).json({ message: "Failed to add category" });
  }
});

module.exports = router;

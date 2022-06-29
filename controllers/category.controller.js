const Category = require("../models/Category");

export const renderCategories = async (req, res) => {
    try {
        const categories = await Category.find().lean();
        res.render("index", {
            categories,
        });
    } catch (error) {
        console.log({ error });
        return res.json({ errorMessage: error.message });
    }
};

export const createCategory = async (req, res, next) => {
    try {
        const category = new Category(req.body);
        await category.save();
        res.redirect("/");
    } catch (error) {
        return res.json({ errorMessage: error.message });
    }
};

//   export const taskToggleDone = async (req, res, next) => {
//     let { id } = req.params;
//     const task = await Task.findById(id);
//     task.done = !task.done;
//     await task.save();
//     res.redirect("/");
//   };

export const renderCategoryEdit = async (req, res, next) => {
    const category = await Category.findById(req.params.id).lean();
    res.render("edit", { category });
};

export const editCategory = async (req, res, next) => {
    const { id } = req.params;
    await Category.updateOne({ _id: id }, req.body);
    res.redirect("/");
};

export const deleteCategory = async (req, res, next) => {
    let { id } = req.params;
    await Category.remove({ _id: id });
    res.redirect("/");
};

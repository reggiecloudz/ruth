import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  renderCategories,
  renderCategoryEdit,
  editCategory,
} from "../controllers/category.controller";

const router = Router();

// Render all tasks
router.get("/", renderCategories);

router.post("/add", createCategory);

router.get("/:id/edit", renderCategoryEdit);

router.post("/:id/edit", editCategory);

router.get("/:id/delete", deleteCategory);

export default router;
import TransactionType from "../../constants/TransactionType";
import styles from "./CategoriesModal.module.css";
import { useEffect, useState } from "react";
import { CategoryItem } from "./CategoryItem/CategoryItem";
import CategoryActionType from "../../constants/CategoryActionType";
import { useDispatch, useSelector } from "react-redux";
import {
  createCategoryThunk,
  deleteCategoryThunk,
  fetchCategoriesThunk,
  updateCategoryThunk,
} from "@/redux/categories/operations";
import { selectExpenses, selectIncomes } from "@/redux/categories/slice";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import clsx from "clsx";
import { toast } from "react-toastify";

export const CategoriesModal = ({
  transactionType = TransactionType.Expense,
  approveCategory,
  removeCategory,
  onEditCategory,
}) => {
  const dispatch = useDispatch();

  const categories = useSelector(
    transactionType === TransactionType.Expense ? selectExpenses : selectIncomes
  );

  const schema = yup.object({
    newCategory: yup
      .string()
      .transform((value, originalValue) => {
        return originalValue.trim() === "" ? undefined : value;
      })
      .required("This field can't be empty")
      .min(2, "This field value must be at least 2 characters")
      .max(16, "This field value must be at most 16 characters"),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [formActionType, setFormActionType] = useState(CategoryActionType.Add);
  const [activeCategory, setActiveCategory] = useState({});
  const [isBeingEdited, setIsBeingEdited] = useState(false);

  const handleAddCategoryFormOnSubmit = (data) => {
    const newCategoryName = data.newCategory;

    if (formActionType === CategoryActionType.Add) {
      dispatch(
        createCategoryThunk({
          type: transactionType + "s",
          categoryName: newCategoryName,
        })
      );
      setValue("newCategory", "");
    } else if (formActionType === CategoryActionType.Edit) {
      setIsBeingEdited(false);
      setFormActionType(CategoryActionType.Add);

      if (newCategoryName !== activeCategory.name) {
        dispatch(
          updateCategoryThunk({
            id: activeCategory.id,
            newName: newCategoryName,
            type: transactionType + "s",
          })
        )
          .unwrap()
          .then(() =>
            onEditCategory(activeCategory, {
              id: activeCategory.id,
              name: newCategoryName,
            })
          );
      }

      setActiveCategory({});
      setValue("newCategory", "");
    }
  };

  const editCategory = (category) => {
    setIsBeingEdited(true);
    setFormActionType(CategoryActionType.Edit);
    setActiveCategory(category);
    setValue("newCategory", category.name);

    const editCategoryName_TextBox = document.querySelector(
      `.${styles.addCategoryInput}`
    );
    editCategoryName_TextBox.focus();
  };

  const deleteCategory = (id) => {
    dispatch(deleteCategoryThunk({ id, type: transactionType + "s" }))
      .unwrap()
      .then((response) => {
        removeCategory(id);
      })
      .catch((error) => {
        console.log(
          error,
          "\nCan`t remove! Some transactions depend on this category"
        );
        toast.error("Can`t remove! Some transactions depend on this category");
      });
  };

  useEffect(() => {
    dispatch(fetchCategoriesThunk());
    // .unwrap()
    // .then((data) => console.log(data));
  }, [dispatch]);

  return (
    <div className={styles.categoryModalContainer}>
      <h3 className={styles.modalTitle}>{transactionType + "s"}</h3>
      <p className={styles.allCategoryLabel}>All category</p>
      {(categories.length > 0 && (
        <ul className={styles.categoriesList}>
          {categories.map(({ _id: id, categoryName: name }) => (
            <CategoryItem
              key={id}
              id={id}
              name={name}
              approve={approveCategory}
              edit={editCategory}
              remove={deleteCategory}
              isBeingEdited={isBeingEdited}
            />
          ))}
        </ul>
      )) || <p className={styles.emptyLabel}>Empty</p>}
      <form
        className={styles.addCategoryForm}
        onSubmit={handleSubmit(handleAddCategoryFormOnSubmit)}
      >
        <label className={styles.addCategoryLabel}>
          <span className={styles.addCategorySpan}>
            {formActionType === CategoryActionType.Add
              ? "New category"
              : "Edit category"}
          </span>
          <div className={styles.addInputContainer}>
            <input
              className={clsx(styles.addCategoryInput, {
                [styles.errorBorder]: errors.newCategory,
              })}
              type="text"
              placeholder="Enter the text"
              autoComplete="off"
              {...register("newCategory")}
            />
            <button
              className={styles.addCategoryButton}
              disabled={errors.newCategory}
            >
              {formActionType}
            </button>

            {/* Category name field validation error */}
            {errors.newCategory && (
              <>
                <p className={styles.error}>{errors.newCategory?.message}</p>
              </>
            )}
          </div>
        </label>
      </form>
    </div>
  );
};

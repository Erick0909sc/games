import { useState } from "react";

const useFilter = (initialCategories) => {
  const [selectedCategories, setSelectedCategories] =
    useState(initialCategories);

  const handleCategoryChange = (category, resetPage) => {
    const selectedCount =
      Object.values(selectedCategories).filter(Boolean).length;
    if (selectedCount === 1 && selectedCategories[category]) {
      alert("Debes seleccionar al menos una opción para filtrar.");
      return;
    }

    // Actualizar las categorías seleccionadas
    setSelectedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));

    // Reiniciar la página actual si se proporciona la función resetPage
    if (resetPage) {
      resetPage();
    }
  };

  const filterItems = (items) => {
    const selected = Object.keys(selectedCategories).filter(
      (category) => selectedCategories[category]
    );

    if (selected.includes("todos")) {
      return items;
    } else {
      return items.filter((item) =>
        selected.includes(item.category.toLowerCase())
      );
    }
  };

  return {
    selectedCategories,
    handleCategoryChange,
    filterItems,
  };
};

export default useFilter;

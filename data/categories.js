export const categories = [
  { id: "milk", name: "Milk", icon: "🥛", description: "Fresh & toned dairy milk" },
  { id: "curd", name: "Curd", icon: "🍶", description: "Creamy set & stirred curd" },
  { id: "paneer", name: "Paneer", icon: "🧀", description: "Soft cottage cheese blocks" },
  { id: "butter", name: "Butter", icon: "🧈", description: "Salted & unsalted butter" },
  { id: "ghee", name: "Ghee", icon: "✨", description: "Pure clarified butter" },
  { id: "cheese", name: "Cheese", icon: "🧀", description: "Processed & artisan cheese" },
];

export function getCategoryName(id) {
  return categories.find((c) => c.id === id)?.name ?? id;
}

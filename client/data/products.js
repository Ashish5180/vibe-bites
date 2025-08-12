export const products = [
  {
    id: "makhana01",
    name: "Peri Peri Makhana",
    description: "Spicy and tangy roasted makhanas with peri peri seasoning. Perfect healthy snack for spice lovers.",
    category: "Makhana",
    image: "/images/hero-snack-1.jpg",
    sizes: [
      { size: "50g", price: 40 },
      { size: "100g", price: 75 },
      { size: "200g", price: 140 }
    ],
    ingredients: "Makhana (Fox Nuts), Peri Peri Seasoning, Salt, Spices",
    nutrition: {
      calories: "120 kcal",
      protein: "4g",
      carbs: "20g",
      fat: "2g",
      fiber: "3g"
    },
    featured: true
  },
  {
    id: "makhana02",
    name: "Masala Makhana",
    description: "Traditional Indian masala roasted makhanas with aromatic spices. A guilt-free crunchy snack.",
    category: "Makhana",
    image: "/images/hero-snack-2.jpg",
    sizes: [
      { size: "50g", price: 35 },
      { size: "100g", price: 65 },
      { size: "200g", price: 120 }
    ],
    ingredients: "Makhana (Fox Nuts), Traditional Masala, Salt, Turmeric, Spices",
    nutrition: {
      calories: "110 kcal",
      protein: "4g",
      carbs: "18g",
      fat: "1.5g",
      fiber: "3g"
    },
    featured: true
  },
  {
    id: "chips01",
    name: "Baked Potato Chips",
    description: "Crispy baked potato chips with sea salt. All the crunch without the guilt.",
    category: "Chips",
    image: "/images/hero-snack-3.jpg",
    sizes: [
      { size: "50g", price: 45 },
      { size: "100g", price: 85 },
      { size: "200g", price: 160 }
    ],
    ingredients: "Potatoes, Sea Salt, Olive Oil, Natural Seasonings",
    nutrition: {
      calories: "130 kcal",
      protein: "2g",
      carbs: "25g",
      fat: "3g",
      fiber: "2g"
    },
    featured: true
  },
  {
    id: "chips02",
    name: "Multigrain Chips",
    description: "Nutritious multigrain chips with herbs and spices. Packed with whole grains and fiber.",
    category: "Chips",
    image: "/images/hero-snack-1.jpg",
    sizes: [
      { size: "50g", price: 50 },
      { size: "100g", price: 95 },
      { size: "200g", price: 180 }
    ],
    ingredients: "Whole Wheat, Quinoa, Oats, Herbs, Sea Salt, Olive Oil",
    nutrition: {
      calories: "140 kcal",
      protein: "4g",
      carbs: "22g",
      fat: "4g",
      fiber: "4g"
    },
    featured: false
  },
  {
    id: "bites01",
    name: "Protein Energy Bites",
    description: "Nutritious energy bites packed with protein, dates, and nuts. Perfect pre-workout snack.",
    category: "Bites",
    image: "/images/hero-snack-2.jpg",
    sizes: [
      { size: "50g", price: 60 },
      { size: "100g", price: 110 },
      { size: "200g", price: 200 }
    ],
    ingredients: "Dates, Almonds, Protein Powder, Chia Seeds, Coconut, Honey",
    nutrition: {
      calories: "180 kcal",
      protein: "8g",
      carbs: "25g",
      fat: "6g",
      fiber: "5g"
    },
    featured: true
  },
  {
    id: "bites02",
    name: "Chocolate Energy Bites",
    description: "Delicious chocolate energy bites with dark chocolate and nuts. Sweet treat with health benefits.",
    category: "Bites",
    image: "/images/hero-snack-3.jpg",
    sizes: [
      { size: "50g", price: 55 },
      { size: "100g", price: 100 },
      { size: "200g", price: 180 }
    ],
    ingredients: "Dark Chocolate, Almonds, Dates, Cocoa Powder, Coconut, Honey",
    nutrition: {
      calories: "160 kcal",
      protein: "5g",
      carbs: "20g",
      fat: "8g",
      fiber: "4g"
    },
    featured: false
  },
  {
    id: "makhana03",
    name: "Cheese Makhana",
    description: "Cheesy roasted makhanas with a rich, savory flavor. Perfect for cheese lovers.",
    category: "Makhana",
    image: "/images/hero-snack-1.jpg",
    sizes: [
      { size: "50g", price: 45 },
      { size: "100g", price: 85 },
      { size: "200g", price: 160 }
    ],
    ingredients: "Makhana (Fox Nuts), Cheese Powder, Salt, Spices, Natural Flavors",
    nutrition: {
      calories: "125 kcal",
      protein: "5g",
      carbs: "18g",
      fat: "3g",
      fiber: "2.5g"
    },
    featured: false
  },
  {
    id: "chips03",
    name: "Sweet Potato Chips",
    description: "Naturally sweet baked sweet potato chips. Rich in vitamins and minerals.",
    category: "Chips",
    image: "/images/hero-snack-2.jpg",
    sizes: [
      { size: "50g", price: 50 },
      { size: "100g", price: 90 },
      { size: "200g", price: 170 }
    ],
    ingredients: "Sweet Potatoes, Sea Salt, Olive Oil, Natural Seasonings",
    nutrition: {
      calories: "120 kcal",
      protein: "2g",
      carbs: "24g",
      fat: "2.5g",
      fiber: "3g"
    },
    featured: false
  }
]

export const categories = [
  {
    id: "makhana",
    name: "Makhana",
    description: "Roasted fox nuts in various flavors",
    image: "/images/hero-snack-1.jpg"
  },
  {
    id: "chips",
    name: "Chips",
    description: "Baked and multigrain chips",
    image: "/images/hero-snack-2.jpg"
  },
  {
    id: "bites",
    name: "Energy Bites",
    description: "Protein and energy-packed bites",
    image: "/images/hero-snack-3.jpg"
  }
]

export const getProductById = (id) => {
  return products.find(product => product.id === id)
}

export const getProductsByCategory = (category) => {
  return products.filter(product => product.category.toLowerCase() === category.toLowerCase())
}

export const getFeaturedProducts = () => {
  return products.filter(product => product.featured)
} 
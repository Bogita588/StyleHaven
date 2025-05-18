const fs = require('fs');
const path = require('path');

// Define your folder and file structure
const structure = {
  src: {
    assets: [],
    components: {
      Header: ['Header.jsx', 'Header.css'],
      ProductCard: ['ProductCard.jsx', 'ProductCard.css'],
      CartItem: ['CartItem.jsx', 'CartItem.css'],
      // add more components here if needed
    },
    pages: {
      Home: ['Home.jsx', 'Home.css'],
      Shop: ['Shop.jsx', 'Shop.css'],
      ProductDetails: ['ProductDetails.jsx', 'ProductDetails.css'],
      Cart: ['Cart.jsx', 'Cart.css'],
      Checkout: ['Checkout.jsx', 'Checkout.css'],
      Wishlist: ['Wishlist.jsx', 'Wishlist.css'],
      Confirmation: ['Confirmation.jsx', 'Confirmation.css'],
      AdminDashboard: ['AdminDashboard.jsx', 'AdminDashboard.css'],
      ManageProducts: ['ManageProducts.jsx', 'ManageProducts.css'],
      Analytics: ['Analytics.jsx', 'Analytics.css'],
    },
    redux: ['store.js', 'cartSlice.js', 'productSlice.js', 'wishlistSlice.js', 'adminSlice.js', 'themeSlice.js'],
    data: ['products.json', 'categories.json'],
    logic: ['formatPrice.js', 'outfitRecommender.js', 'api.js', 'validateForm.js'],
    styles: ['variables.css', 'global.css', 'theme.js'],
  },
};

// Helper function to create folders and files recursively
function createStructure(basePath, obj) {
  for (const key in obj) {
    const currentPath = path.join(basePath, key);
    if (Array.isArray(obj[key])) {
      // Create folder
      if (!fs.existsSync(currentPath)) {
        fs.mkdirSync(currentPath, { recursive: true });
        console.log(`Created folder: ${currentPath}`);
      }
      // Create files inside folder
      obj[key].forEach((file) => {
        const filePath = path.join(currentPath, file);
        if (!fs.existsSync(filePath)) {
          fs.writeFileSync(filePath, '', 'utf8');
          console.log(`Created file: ${filePath}`);
        }
      });
    } else {
      // obj[key] is another object, so create folder and recurse
      if (!fs.existsSync(currentPath)) {
        fs.mkdirSync(currentPath, { recursive: true });
        console.log(`Created folder: ${currentPath}`);
      }
      createStructure(currentPath, obj[key]);
    }
  }
}

// Run the creation starting from the current directory
createStructure(process.cwd(), structure);

console.log('Folder structure creation complete!');

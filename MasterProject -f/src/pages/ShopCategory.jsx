import React, { useContext, useState } from 'react';
import './ShopCategory.css';
import { ShopContext } from '../context/ShopContext';
import dropdown_icon from '../assets/dropdown_icon.png';
import Item from '../components/Item';

const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext);
  const [productsPerPage] = useState(12); 
  const [sortOption, setSortOption] = useState(''); 

  // Filter products based on the category
  let filteredProducts = all_product.filter(product => product.category === props.category);

  // Sort products based on the selected sorting option
  if (sortOption === 'price') {
    filteredProducts = filteredProducts.sort((a, b) => a.new_price - b.new_price); // Sort by price (ascending)
  } else if (sortOption === 'date') {
    filteredProducts = filteredProducts.sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by date (newest first)
  }

  // Get total products in the shop (all products)
  const totalProducts = all_product.length;

  // Get the number of products shown for the current category
  const totalProductsInCategory = filteredProducts.length;

  // Handle sort option change
  const handleSortChange = (option) => {
    setSortOption(option);  // Update sorting option based on user selection
  };

  return (
    <div className='shop-category'>
      <div className="shopcategory-indexSort">
        <p>
          Prikazuju se: {totalProductsInCategory > productsPerPage ? productsPerPage : totalProductsInCategory} od {totalProducts} proizvoda
        </p>
        <div className="shopcategory-sort">
          <span>Sortiraj po</span> <img src={dropdown_icon} alt="" />
          <div className="shopcategory-sort-dropdown">
            <button onClick={() => handleSortChange('price')}>Ceni</button>
            <button onClick={() => handleSortChange('date')}>Najnovijem</button>
          </div>
        </div>
      </div>
      <div className="shopcategory-products">
        {filteredProducts.slice(0, productsPerPage).map((item, i) => (
          <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} />
        ))}
      </div>
      {totalProductsInCategory > productsPerPage && (
        <div className="shopcategory-loadmore">
          Istraži još
        </div>
      )}
    </div>
  );
}

export default ShopCategory;

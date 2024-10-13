import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import { useParams } from 'react-router-dom';
import Breadcrum from '../components/Breadcrum';
import ProductDisplay from '../components/ProductDisplay';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {
    const { all_product } = useContext(ShopContext);
    const { productId } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        if (all_product && all_product.length > 0) {
            const foundProduct = all_product.find((e) => e.id === Number(productId));
            setProduct(foundProduct);
        }
    }, [all_product, productId]);

    if (!product) return <div>Loading...</div>;

    return (
      <div>
        <Breadcrum product={product} />
        <ProductDisplay product={product} />
        {product.category && (
          <RelatedProducts category={product.category} />  
        )}
      </div>
    );
}

export default Product;

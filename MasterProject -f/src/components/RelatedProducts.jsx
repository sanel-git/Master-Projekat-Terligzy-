import React, { useState, useEffect } from 'react';
import './RelatedProducts.css';
import Item from './Item';

const RelatedProducts = ({ category }) => {
    const [related, setRelated] = useState([]);

    useEffect(() => {
        if (category) {
            fetch('http://localhost:4000/relatedproducts', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ category }),
            })
                .then((res) => res.json())
                .then((data) => setRelated(data))
                .catch((error) => console.error('Error fetching related products:', error));
        }
    }, [category]);

    return (
        <div className="relatedproducts">
            <h1>Pogledajte i</h1>
            <hr />
            <div className="relatedproducts-item">
                {related.map((item, i) => (
                    <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} />
                ))}
            </div>
        </div>
    );
};

export default RelatedProducts;

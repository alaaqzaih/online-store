import React, { useEffect, useState } from 'react';
import { FetchData } from '../../Utils/ApiUtils';
import './category.scss'
import { mappCategory } from './utils';
import { Link, useLoaderData } from 'react-router-dom';

function Category() {

    const [categories, setCategories] = useState([]);
    const _categories = useLoaderData()

    useEffect(() => {
        setCategories(_categories)
    }, [])


    return (
        <div className="product-categories">
            {categories.map((category, idx) => {
                return (
                    <Link to={`/product?category=${category.name}`} key={idx}

                        className={"card container my-5"}
                    >
                        <img
                            src={category.image}
                            alt={category.name} />
                        <div
                            className='card-img-overlay 
                        custom-img-overlay 
                        d-flex justify-content-center
                         align-items-center'>
                            <h1>{category.label}</h1>
                        </div>
                    </Link>
                )
            })}

        </div>

    )
}

export default Category;
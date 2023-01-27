import React, { useState, useEffect, useContext } from 'react';
import { FetchData } from '../../Utils/ApiUtils'
import ProductsCard from './SubComp/ProductsCard';
import "./products.scss";
import { useLocation, useSearchParams } from 'react-router-dom';

import SearchFilter from './SubComp/SearchFilter';
import { GlobalContext } from '../../Utils/Contexts';
import ProductDetailsModal from './SubComp/ProductDetailsModal';


function Products() {

    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const context = useContext(GlobalContext);
    const [queryString, setQueryString] = useSearchParams();

    // const [category, setCategory] = useState(_category);
    const location = useLocation();

    // useEffect(() => {
    //     getProducts();
    // }, [])

    useEffect(() => {
        getProducts();
    }, [location])


    async function getProducts() {
        const category = queryString.get('category');

        let resp = ''
        if (!category) {
            resp = await FetchData('https://fakestoreapi.com/products', 'GET');

        } else {
            resp = await FetchData(`https://fakestoreapi.com/products/category/${category}`, 'GET')
        }

        if (resp.status === 200) {
            // this.setState({ products: resp.data, filteredProducts: resp.data })
            setProducts(resp.data);
            setFilteredProducts(resp.data)
        } else {
            console.warn("sorry this api failed");
            //@TODO: we will handle it later 
        }

    }

    function onSearchFilterChangeed(searchText, filterBy) {
        const _filteredProducts = products.filter((item) => {
            const upperCaseTitle = item.title.toUpperCase();
            const upperCaseDesc = item.description.toUpperCase();
            const upperCaseSearchTxt = searchText.toUpperCase();

            if (filterBy === "title") {
                return upperCaseTitle.includes(upperCaseSearchTxt)
            } else if (filterBy === "desc") {
                return upperCaseDesc.includes(upperCaseSearchTxt)
            }
            return upperCaseTitle.includes(upperCaseSearchTxt) || upperCaseDesc.includes(upperCaseSearchTxt)
        })

        // this.setState({ filteredProducts: _filteredProducts })
        setFilteredProducts(_filteredProducts)
    }

    function onCardClicked(product) {
        context.showModal({
            body: <ProductDetailsModal product={product} />,
            title: <span>{product.title}</span>
        });
    }



    return (
        <div>
            <SearchFilter onChange={onSearchFilterChangeed} />
            <div className="row ms-5 me-5">
                {filteredProducts.map((item, idx) => {

                    return (
                        <div className="col-lg-2 col-md-3" key={idx}>
                            <ProductsCard
                                onClick={() => onCardClicked(item)}
                                product={item} />
                        </div>

                    )
                })}
            </div>
        </div>
    )

}

export default Products; 
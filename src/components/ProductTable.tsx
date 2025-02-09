import React, { useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { deleteProduct } from "../redux/productSlice";
import EditModal from "./EditModal";

interface Products {
    name: string;
    category: string;
    value: string;
    quantity: string | number;
    price: string;
}

const ProductTable = () => {
    const [selectedProduct, setSelectedProduct] = useState<Products | null>(null);
    const [disabledProducts, setDisabledProducts] = useState<string[]>([]);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const productsSummary = useSelector((state: RootState) => state.product);
    const isUser = useSelector((state: RootState) => state.role).isUser;
    const dispatch = useDispatch<AppDispatch>();

    const handleModalClose = () => {
        setIsEditing(!isEditing)
    }

    return (
        <div className={`product-list ${isUser ? "disabled" : ""}`}>
            <div className="product-list__header">
                <div className="product-list__title flex-2"><span>Name</span></div>
                <div className="product-list__title"><span>Category</span></div>
                <div className="product-list__title"><span>Price</span></div>
                <div className="product-list__title"><span>Quantity</span></div>
                <div className="product-list__title"><span>Value</span></div>
                <div className="product-list__title"><span>ACTIONS</span></div>
            </div>
            {productsSummary.products.length ?
                productsSummary.products.map((product, index) => (
                    <div className={`product-list__body ${disabledProducts.includes(product.name) ? "admin-disabled" : ""}`} key={product.name + index}>
                        <div className="product-list__value flex-2"><span>{product.name}</span></div>
                        <div className="product-list__value"><span>{product.category}</span></div>
                        <div className="product-list__value"><span>{product.price}</span></div>
                        <div className="product-list__value"><span>{product.quantity}</span></div>
                        <div className="product-list__value"><span>{product.value}</span></div>
                        <div className="product-list__value actions">
                            <EditIcon onClick={() => {
                                if (!isUser && !disabledProducts.includes(product.name)) {
                                    setSelectedProduct(product);
                                    setIsEditing(true);
                                }
                            }} color="success" />
                            {disabledProducts.includes(product.name) ?
                                <VisibilityOffIcon onClick={() => !isUser && setDisabledProducts(disabledProducts.filter(prod => prod !== product.name))} color="primary" /> :
                                <VisibilityIcon onClick={() => !isUser && setDisabledProducts((prev) => [...prev, product.name])} color="primary" />
                            }
                            <DeleteIcon onClick={() => {
                                if (!isUser) {
                                    dispatch(deleteProduct(product));
                                    setDisabledProducts(disabledProducts.filter(prod => prod !== product.name));
                                }
                            }} color="error" />
                        </div>
                    </div>
                )) : <div className="product-list__empty">No data to show</div>}
            {selectedProduct && <EditModal product={selectedProduct} isOpen={isEditing} handleModalClose={handleModalClose} />}
        </div>
    )
}

export default ProductTable
import React, { ChangeEvent, useState, useEffect } from "react";
import Modal from '@mui/material/Modal';
import ClearIcon from '@mui/icons-material/Clear';
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { editProduct } from "../redux/productSlice";

type Products = {
    name: string;
    category: string;
    value: string;
    quantity: string | number;
    price: string;
}

interface ModalProps {
    product: Products;
    isOpen: boolean;
    handleModalClose: () => void;
}

const EditModal: React.FC<ModalProps> = ({ product, isOpen, handleModalClose }) => {
    const [formValue, setFormValue] = useState<Products>({
        name: product.name,
        category: product.category,
        price: product.price.replace("$", ""),
        quantity: product.quantity,
        value: product.value.replace("$", "")
    });
    const [formError, setFormError] = useState<Partial<Products>>({});
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        setFormValue({
            name: product.name,
            category: product.category,
            price: product.price.replace("$", ""),
            quantity: product.quantity,
            value: product.value.replace("$", "")
        });
    }, [product])

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (Object.keys(formError).length) {
            validateForm();
        }
        setFormValue((prev) => ({
            ...prev,
            [name]: value
        }));

    }

    const handleSaveProduct = () => {
        if (!validateForm()) {
            dispatch(editProduct(formValue));
            handleModalClose();
        }
    }

    const validateForm = () => {
        let errors: Partial<Products> = {};

        if (!formValue.category) errors.category = "Category is required";
        if (!formValue.price) errors.price = "Price is required";
        if (!formValue.quantity) errors.quantity = "Quantity is required";
        if (!formValue.value) errors.value = "Value is required";
        setFormError(errors);

        if (Object.keys(errors).length) return true;
        return false;
    }

    return (
        <Modal
            open={isOpen}
            onClose={() => handleModalClose()}
            aria-labelledby="child-modal-title"
            aria-describedby="child-modal-description"
        >
            <div className="edit-modal">
                <div className="edit-modal__header">
                    <h1>Edit Product</h1>
                    <ClearIcon onClick={() => handleModalClose()} />
                </div>
                <span className="edit-modal__product-name">Samsung</span>
                <div className="edit-modal__form">
                    <div>
                        <label>category</label>
                        <input type="text" name="category" value={formValue.category} onChange={handleInputChange} />
                        {formError.category && <span>{formError.category}</span>}
                    </div>
                    <div>
                        <label>price</label>
                        <input type="number" name="price" value={formValue.price} onChange={handleInputChange} />
                        {formError.price && <span>{formError.price}</span>}
                    </div>
                    <div>
                        <label>quantity</label>
                        <input type="number" name="quantity" value={formValue.quantity} onChange={handleInputChange} />
                        {formError.quantity && <span>{formError.quantity}</span>}
                    </div>
                    <div>
                        <label>value</label>
                        <input type="number" name="value" value={formValue.value} onChange={handleInputChange} />
                        {formError.value && <span>{formError.value}</span>}
                    </div>
                </div>
                <div className="edit-modal__footer">
                    <button onClick={() => handleModalClose()}>Cancel</button>
                    <button className="contained" onClick={() => handleSaveProduct()}>Save</button>
                </div>
            </div>
        </Modal>
    )
}

export default EditModal;
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Product {
    name: string;
    category: string;
    value: string;
    quantity: string | number;
    price: string;
}

interface ProductsSummary {
    products: Product[];
    totalProducts: number;
    totalValue: number;
    outOfStock: number;
    categories: string[];
    status: string;
    error: string | null | Product;
}

const initialState: ProductsSummary = {
    products: [],
    totalProducts: 0,
    totalValue: 0,
    outOfStock: 0,
    categories: [],
    status: "loading",
    error: null
};

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setProducts: (state, action: PayloadAction<Product[]>) => {
            state.products = action.payload;
            state.status = "ok";
            state.totalProducts = action.payload.length;
            state.totalValue = action.payload.reduce(
                (acc, item) => acc + (Number(item.price.replace("$", "")) * Number(item.quantity)),
                0
            );
            state.outOfStock = action.payload.filter(
                (item: Product) => item.quantity === 0
            ).length;
            state.categories = Array.from(new Set(action.payload.map((p) => p.category)));
        },
        editProduct: (state, action: PayloadAction<Product>) => {
            const index = state.products.findIndex(
                (p) => p.name === action.payload.name
            );
            if (index !== -1) {
                state.products[index] = action.payload;
                state.products[index].value = String(Number(action.payload.price.replace("$", "")) * Number(action.payload.quantity))
            }
            productSlice.caseReducers.setProducts(state, { payload: state.products } as any);
        },
        deleteProduct: (state, action: PayloadAction<Product>) => {
            state.products = state.products.filter(
                (p) => p.name !== action.payload.name
            );
            productSlice.caseReducers.setProducts(state, { payload: state.products } as any);
        },
        setError: (state, action: PayloadAction<string>) => {
            state.status = "error";
            state.error = action.payload;
        }
    },
});

export const { setProducts, editProduct, deleteProduct, setError } = productSlice.actions;
export default productSlice.reducer;

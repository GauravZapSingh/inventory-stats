import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import Header from "../components/Header";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import CategoryIcon from '@mui/icons-material/Category';
import Card from "../components/Card";
import { setError, setProducts } from "../redux/productSlice";
import ProductTable from "../components/ProductTable";
import SkeletonLoader from "../components/SkeletonLoader";

const Dashboard = () => {
    const productsSummary = useSelector((state: RootState) => state.product);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        let isMounted = true;
        const fetchProducts = async () => {
            try {
                const response = await fetch("https://dev-0tf0hinghgjl39z.api.raw-labs.com/inventory");
                const data = await response.json();
                if (isMounted) {
                    dispatch(setProducts(data));
                }

            } catch (error: any) {
                if (isMounted) {
                    dispatch(setError(error.message));
                }
            }
        }

        fetchProducts();
        return () => {
            isMounted = false;
        };
    }, [dispatch])

    const renderError = () => (
        <h1>Something Went Wrong!</h1>
    )

    return (
        <div>
            <Header />
            <div className="container">
                <h1 className="section-header">Inventory stats</h1>
                {productsSummary.status === "loading" && <SkeletonLoader />}
                {productsSummary.status === "error" && renderError()}
                {productsSummary.status === "ok" && (
                    <>
                        <div className="row">
                            <Card icon={<ShoppingCartIcon fontSize="large" />} title="Total products" value={productsSummary.totalProducts} />
                            <Card icon={<CurrencyExchangeIcon fontSize="large" />} title="Total store value" value={productsSummary.totalValue} />
                            <Card icon={<RemoveShoppingCartIcon fontSize="large" />} title="Out of stocks" value={productsSummary.outOfStock} />
                            <Card icon={<CategoryIcon fontSize="large" />} title="No of Category" value={productsSummary.categories.length} />
                        </div>
                        <ProductTable />
                    </>
                )}
            </div>
        </div>
    )
}

export default Dashboard;
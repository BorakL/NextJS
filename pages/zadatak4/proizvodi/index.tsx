import { getData } from "@/utils/utils";
import Link from "next/link";

interface Product {
    pid: "string",
    title: "string"
}

const ProductsPage = (props: {products: Product[]}) => {
    const {products} = props;
    return(
        <>
            <h1>Products</h1>
            <ul>
                {products.map(product =>  <div key={product.pid}> <Link href={`proizvodi/${product.pid}`}> {product.title} </Link> </div> )}
            </ul>
        </>
    )
}

export default ProductsPage;

export async function getStaticProps(){
    const data = await getData();
    return {
        props: {
            products: data.products
        }
    }
}
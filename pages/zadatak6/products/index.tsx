import { getData } from "@/utils/utils";
import Link from "next/link";

interface Product {
    id: string,
    title: string
}

const ProductsPage = (props: {products: Product[]}) => {
    const products = props.products;    
    return(
        <ul>
        {
            products.map(product => <li key={product.id}> <Link href={`/zadatak6/products/${product.id}`}>{product.title}</Link> </li> )
        }
        </ul>
    )
}

export default ProductsPage;


export async function getStaticProps(){
    const data = await getData();
    return(
        {
            props: {
                products: data.products
            }
        }
    )
}
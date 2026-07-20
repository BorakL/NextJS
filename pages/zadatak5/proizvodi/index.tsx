import { getData } from "@/utils/utils";
import Link from "next/link";

interface Product {
    pid: string,
    title: string
}

const ProizvodPage = (props: {products:Product[]}) => {
    const {products} = props;
    return(
        <>
        <ul>
            {products.map((product:Product) => <li key={product.pid}>
                <Link href={`proizvodi/${product.pid}`}>{product.title}</Link>
            </li>)}
        </ul>
        </>
    )
}

export default ProizvodPage;

export async function getStaticProps(){
    const data = await getData();
    return({
        props:{
            products: data.products
        }
    })
}
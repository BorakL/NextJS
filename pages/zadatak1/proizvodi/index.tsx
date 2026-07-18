import { readFile } from "fs/promises";
import Link from "next/link";
import path from "path";

interface Product {
    pid: string,
    title: string
}

const HomePage = (props: {products:Product[]}) => {
    const {products} = props;
    return(
        <>
        <h1>Proizvodi</h1>
        <ul>
            {products.map((product:Product) => <li key={product.pid}>
               <Link href={`proizvodi/${product.pid}`}>{product.title}</Link>            
            </li>)}
        </ul>
        </>
    )
}

export default HomePage;

export async function getStaticProps(){
    const filePath = path.join(process.cwd(), "data", "dummy-backend.json")
    const dataJson = await readFile(filePath, "utf-8")
    const data = JSON.parse(dataJson)
    return(
        {
            props: {
                products: data.products
            }
        }
    )
}
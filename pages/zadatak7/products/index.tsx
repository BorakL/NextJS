import path from "path"
import { readFile } from "fs/promises"
import Link from "next/link"

interface Product {
    pid: string,
    title: string
}
const getData = async() => {
    try{
        const dataPath = path.join(process.cwd(), "data", "dummy-backend.json")
        const dataJson = await readFile(dataPath, "utf-8")
        const data = JSON.parse(dataJson)
        return data;
    }catch(error){
        console.error("Došlo je do greške prilikom čitanja podataka", error)
    }
}

const ProductsPage = (props: {products: Product[] }) => {
    
    return(
        <ul>
        {props.products.map((product:Product) => 
                                                <Link key={product.pid} href={`/zadatak7/products/${product.pid}`}>
                                                    <li>{product.title}</li>
                                                </Link>
        )}
        </ul>
    )
}

export default ProductsPage;


export const getStaticProps = async function(){
    const data = await getData();
    return ({
        props: {
            products: data.products
        }
    })
}

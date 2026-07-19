import { getData } from "@/utils/utils";
import Link from "next/link";

 interface Product {
    pid: "string",
    title: "string"
 }

const ProizvodiPage = (props: {products: Product[]}) => {
    const {products} = props;
    return(
        <ul>
            {products.map((p:Product) => <li key={p.pid}><Link href={`proizvodi/${p.pid}`}>{p.title}</Link></li>)}
        </ul>
    )
}

export default ProizvodiPage


export async function getStaticProps(){
    const data = await getData();
    return(
        {
            props: data
        }
    )
}
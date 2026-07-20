import { getData } from "@/utils/utils";
import { GetStaticPropsContext } from "next";

interface Product {
    pid: string,
    title: string
}

const ProizvodPage = (props:{product:Product}) => {
    const {product} = props
    return(
        <>
        <h1>{product.title}</h1>
        </>
    )
}

export default ProizvodPage;


export async function getStaticPaths(){
    const data = await getData();
    const paths = data.products.map((product:Product) => ({params: {pid:product.pid}}))
    return {
        paths,
        fallback:true
    }
}

export async function getStaticProps(context:GetStaticPropsContext){
    const {params} = context;
    const pid = params?.pid as string;
    const data = await getData();
    const product = data.products.find((product:Product) => product.pid===pid)
    return {
        props: {
            product: product
        }
    }
}
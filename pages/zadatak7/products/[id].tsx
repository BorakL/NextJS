import { getData } from "@/utils/utils";
import { GetStaticPropsContext } from "next";

interface Product {
    pid: string,
    title: string
}

const ProductPage = (props: {product:Product}) => {
    const title = props.product.title;
    return(
        <>
        {title}
        </>
    )
}

export default ProductPage;

export async function getStaticPaths(){
    const data = await getData();
    const paths = data.products?.map( (p:Product) => ({params: {id: String(p.pid)}}))
    return {
        paths,
        fallback: true
    } 
}

export async function getStaticProps(context:GetStaticPropsContext){
    const {params} = context;
    const id = params?.id as string;
    const data = await getData();
    const product = data?.products?.find((p:Product) => p.pid===id )
    return {
        props: {
                product
            }
    }
}
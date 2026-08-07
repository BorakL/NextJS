import { getData } from "@/utils/utils";
import { GetStaticPropsContext } from "next";

interface Product {
    id: string,
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
    const paths = data.products.map((product:Product) => ({params: {id: String(product.id)}}))
    return{
        paths,
        fallback: true
    }
}

export async function getStaticProps(context:GetStaticPropsContext){
    const {params} = context;
    const id = params?.pid as string 
    const data = await getData();
    const product = data?.products?.find((p:Product) => p.id===id )
    return ({
            props: {
                product: product
            }
        })
    
}
// export async function getStaticProps(context: GetStaticPropsContext) {
//     const {params} = context;
//     const pid = params?.pid as string 
//     const data = await getData();
//     const product = data.products.find((product:Product) => product.pid === pid)
//     return {
//         props: {
//             product: product
//         }
//     }
// }
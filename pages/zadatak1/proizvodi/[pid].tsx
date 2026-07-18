import { readFile } from "fs/promises";
import { GetStaticPropsContext } from "next";
import { useRouter } from "next/router"
import path from "path";

interface Product {
    pid: string,
    title: string
}

const ProizvodPage = () => {
    const router = useRouter();
    const {pid} = router.query
    return(
        <>
            <h1>Proizvod - {pid}</h1>
        </>
    )
}

export default ProizvodPage

export async function getStaticPaths(){
    return {
        paths: [
            {params:{pid:"p1"}},
            {params:{pid:"p2"}},
            {params:{pid:"p3"}} 
        ],
        fallback: false
    }
}

export async function getStaticProps(context:GetStaticPropsContext){
    const {params} = context;

    const productId = params?.pid as string;
    const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json')
    const jsonData = await readFile(filePath, "utf-8");
    const data = JSON.parse(jsonData)
    const product = data.products.find((product:Product) => product.pid === productId)
    return {
        props: {
            loadedProduct: product || null
        }
    }
}
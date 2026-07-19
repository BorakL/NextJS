import { GetStaticPropsContext } from "next";
import { getData } from ".";

interface Product {
    pid: string,
    title: string
}

const ProizvodPage = (props: {loadedProduct: Product}) => {
    const {loadedProduct} = props;
    // 
    // const router = useRouter();
    // const {pid} = router.query
    // console.log("pid",pid)

    // Može se desiti da Next.js nema unapred pripremljen path (recimo neki item u bazi kojeg niko već dugo ne traži, a mi smo fečovali samo svežije)
    // U tom slučaju, Next.js će ga sam izgenerisati na serveru, ako je u getStaticPaths returnovan fallback: true. (fallback-rezerva)
    // Tada obavezno moramo imati loader, jer to zahteva neko vreme 
    if(!loadedProduct){
        return <p>Loading...</p>
    }
    return(
        <>
            <h1>{loadedProduct.title}</h1>
        </>
    )
}

export default ProizvodPage

export async function getStaticPaths(){
    const data = await getData();
    const paths = data.products.map((product:Product) => ({pid:product.pid}))
    return {
        paths,
        fallback: true
    }
}

export async function getStaticProps(context:GetStaticPropsContext){
    const {params} = context;

    const productId = params?.pid as string;
    const data = await getData();
    const product = data.products.find((product:Product) => product.pid === productId)
    if(!product){
        return {notFound: true}
    }
    return {
        props: {
            loadedProduct: product || null
        }
    }
}
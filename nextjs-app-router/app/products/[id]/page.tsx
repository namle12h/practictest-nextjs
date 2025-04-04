export default async function ProductDetail(
    {params}:{
        params: Promise<{id:number}>
    }
){
    const {id} = await params;
    return(
        <div>ProductDetail - {id}</div>
    )
}
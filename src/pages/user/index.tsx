import { useContext, useEffect, useState } from "react"
import Bar from "../components/bar"
import Loading from "../components/loading"
import { AuthContext } from "../contexts/AuthContexts"
import {BiTrash} from "react-icons/bi"


export function ProductForm() {
    const [img, setImageSrc] = useState<any>()
    const [product, setProduct] = useState<String[] | any>()
    const { isLoading, setIsLoading } = useContext(AuthContext)
    const endpoint = '/api/product'


    // OUTHER FUNCTION
    function readFile(input: any) {

        let file = input.target.files[0];

        let reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onload = function () {
            setImageSrc(reader.result)
            console.log(reader.result);
        };

        reader.onerror = function () {
            console.log(reader.error);
        };

    }
    function price(value: string) {
        return value.replace(',', '.')
    }
    function promotion(value: string) {
        if (value === "true") {
            return true
        } else {
            return false
        }
    }


    // LIST PRODUCT
    useEffect(() => {
        async function ListProduct() {
            try {
                const options = {
                    method: 'GET'
                }
                const response = await fetch(endpoint, options)
                const result = await response.json()
                setProduct(result)
            } catch (error) {
                console.log(error)
            }
        }
        ListProduct()
    }, [isLoading])

    // ADD PRODUCT
    async function addProduct(event: any) {
        event.preventDefault()
        setIsLoading(true)
        const data = {
            name: event.target.name.value,
            category: event.target.category.value,
            price: price(event.target.price.value),
            promotion: promotion(event.target.promotion.value),
            img: img
        }
        const JSONdata = JSON.stringify(data)
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSONdata,
        }
        const response = await fetch(endpoint, options)
        const result = await response.json()
        setIsLoading(false)
    }


    // DELETE PRODUCT
    async function DeleteProduct(id:string){
        setIsLoading(true)
        try {
            const data = {
                id
            }
            const JSONdata = JSON.stringify(data)
            const options = {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSONdata
            }
            const response = await fetch(endpoint, options)
            const result = await response.json()
            console.log(result)
        } catch (error) {
            console.log(error)
        }
        setIsLoading(false)
    }

    return (
        <>
            <form className="flex flex-col w-[80%] m-auto bg-c_gray rounded text-c_white p-8 mt-8 mb-8" onSubmit={addProduct}>
                <label htmlFor="name">Nome do Produto</label>
                <input type="text" id="name" name="name" className="text-[#000] p-1 rounded" />
                <label htmlFor="category">Categoria</label>
                <input type="text" id="category" name="category" className="text-[#000] p-1 rounded" />
                <label htmlFor="price">Preço</label>
                <input type="text" id="price" name="price" className="text-[#000] p-1 rounded" />
                <label >Promoçao</label>
                <div className="flex items-center gap-2">
                    <label htmlFor="yes">Sim</label>
                    <input type="radio" id="yes" name="promotion" value="true" />
                    <label htmlFor="no">Não</label>
                    <input type="radio" id="no" name="promotion" value="false" />
                </div>
                <label htmlFor="img">Inser Image</label>
                <div className="flex justify-between items-center border p-1 rounded">
                    <input type="file" id="img" name="img" onChange={readFile} className="border w-[50%] p-1 rounded" />
                    {img ? <img src={img} alt="Upload Image" className="w-[150px] h-[100px]" /> : null}
                </div>
                <button type="submit" className="border w-[50%] m-auto p-2 mt-4 rounded hover:bg-c_lorange hover:text-c_gray flex justify-center">
                    {isLoading ? <Loading /> : "Adicionar Produto"}
                </button>
            </form>
            <Bar />
            <div className="flex justify-center">
                <div className="grid grid-cols-3 mt-8 mb-8 gap-2">
                    {product?.map((item: ItemProps) => {
                        return (
                            <div key={item.id} className="w-[300px] border rounded">
                                <div className="flex items-center p-1 gap-2 relative text-[12px]">
                                    <img src={item.img} alt={`Burguer ${item.name}`} className="w-[100px] h-[100px] border border-c_gray rounded" />
                                    <div >
                                        <li>{item.name}</li>
                                        <li>{item.category}</li>
                                        <li> R$ {item.price}</li>
                                        <li>{item.promotion === true && "Em Promoção"}</li>
                                    </div>
                                    <button  className="absolute top-2 right-2"  onClick={()=>{DeleteProduct(`${item.id}`)}}>{isLoading ? <Loading /> : <BiTrash />}</button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

        </>
    )
}

type ItemProps = {
    id: string
    name: string
    category: string
    price: string
    promotion: boolean
    img: string

}
export default ProductForm
import { useContext, useEffect, useState } from "react"
import Bar from "../../components/bar"
import Loading from "../../components/loading"
import { AuthContext } from "../contexts/AuthContexts"
import { BiTrash } from "react-icons/bi"


export function ProductForm() {
    const [img, setImageSrc] = useState<any>()
    const { isLoading, setIsLoading, AddProduct, DeleteProduct, ListProduct, setMsg, msg, delLoading, product, idProduct } = useContext(AuthContext)

    useEffect(() => {
        ListProduct()
    }, [isLoading, delLoading])

    // OUTHER FUNCTION
    function readFile(input: any) {
        const file = input.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            setImageSrc(reader.result)
        };
        reader.onerror = function () {
            console.log(reader.error);
        };
    }

    async function HandleSubmit(event: any) {
        event.preventDefault();
        setIsLoading(true)
        setMsg("Adcionando o Hambuguer . . .")
        try {
            const form = event.currentTarget;
            const fileInput: any = Array.from(form.elements).find(({ name }: any) => name === 'img');
            const formData = new FormData();
            for (const file of fileInput.files) {
                formData.append('file', file);
            }
            formData.append('upload_preset', 'my-uploads');
            const imgUp = await fetch('https://api.cloudinary.com/v1_1/acosx/image/upload', {
                method: 'POST',
                body: formData
            }).then(r => r.json());

            const data = {
                name: event.target.name.value,
                category: event.target.category.value,
                price: event.target.price.value,
                promotion: true,
                description: event.target.description.value,
                img: imgUp.secure_url
            }
            setMsg("Adcionando o Hambuguer 50%")
            AddProduct(data)

        } catch (error) {
            console.log(error)
        }


    }

    return (
        <>
            <form className="flex flex-col w-[80%] m-auto bg-c_gray rounded text-c_white p-8 mt-8 mb-8" onSubmit={HandleSubmit}>
                <label htmlFor="name">Nome do Produto</label>
                <input type="text" id="name" name="name" className="text-[#000] p-1 rounded" />
                <label htmlFor="category">Categoria</label>
                <input type="text" id="category" name="category" className="text-[#000] p-1 rounded" />
                <label htmlFor="price">Preço</label>
                <input type="text" id="price" name="price" className="text-[#000] p-1 rounded" />
                <label htmlFor="price">Descrição</label>
                <input type="text" id="description" name="description" className="text-[#000] p-1 rounded" placeholder="Opcional" />
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
            {msg && (
                <>
                    <Bar />
                    <div className="flex justify-center py-4 text-[12px]">
                        {msg}
                    </div>
                </>
            )}
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
                                    <button className="absolute top-2 right-2" onClick={() => { DeleteProduct(`${item.id}`) }}>{delLoading && item.id === idProduct ? <Loading /> : <BiTrash />}</button>
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
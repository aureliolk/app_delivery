import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import Headers from "../../components/headers"
import jwt from 'jsonwebtoken';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';


import ProductForm from "../product/_index";
import { useState } from "react";
import FormAddProduct from "../product";


export default function Admin({ firstName }: any) {
    const [isProduct, setIsProduct] = useState("buttonSlect")



    return (
        <div className="w-[80%] m-auto">
            <Headers user={firstName} />
            <Tabs>
                <TabList >
                    <Tab>Produtos</Tab>
                    <Tab>Usuarios</Tab>
                    <Tab>Configurações</Tab>
                </TabList>
                <TabPanel>
                    <FormAddProduct />
                </TabPanel>
                <TabPanel></TabPanel>
                <TabPanel></TabPanel>
            </Tabs>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { 'c.token': token } = parseCookies(ctx)
    if (!token) {
        return {
            props: {}
        }
    }

    const decode: any = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET as string);
    console.log(decode)
    const firstName = decode.firstName

    return {
        props: { firstName }
    }
}
import React from 'react'
import { useEffect,useState } from "react";
import {Sugar} from 'react-preloaders';
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useRouter } from 'next/router'
import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import Head from "next/head";
import index from '../shop';
export default function category({ products, craousal, logo, categories }){
   console.log(products)

   const router = useRouter()
      const { category } = router.query
  const client = createClient({
    projectId: "b5hbcmsc",
    dataset: "production",
    useCdn: false,
  });
  let nav = [];
  categories.map((item, index) => {
    let x = item.name;
    let y = item._id;
    nav.push({ x, y });
  });

  const builder = imageUrlBuilder(client);
  function urlFor(source) {
    return builder.image(source);
  }
  const [loading, setLoading] = useState(false)
  const delay = 3
  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, delay * 1000)
  }, [])
  return  !loading ?(
    <div>
    <Navbar logo={logo[0].logoimage} cats={nav} />
       {
        categories.map((item,index)=>{
           if(item._id==category){
            return(
              <div>
               {item.name}
               <br />
               {item.content}
              </div>
            );
           }
        })
       }
       <div className="grid grid-flow-row lg:grid-cols-3 sm:grid-cols-1  align-middle lg:first-letter:w-5/6 lg:ml-20 sm:mx-2 sm:px-4  m-auto mt-20">
       {products.map((item, index) => {
        if(item?.cat?._ref==category){
        return (
          <Link href={"/shop/" + item._id}>
            <div className="mt-8 lg:w-[400px]  shadow-lg ">
              <img
                className="lg:h-[300px]  h-[250px] w-screen"
                src={urlFor(item.productimage).url()}
              />
              <div className="py-4 px-4 lg:w-full w-screen space-y-4">
                <h1 className="font-light text-2xl">{item.name}</h1>
                <h1 className="font-light text-xl">PRICE:${item.price}</h1>
                <p className="font-light text-xl truncate">
                  {item.content}
                </p>
              </div>
            </div>
          </Link>
        );
        }
      })}
      </div>
      <Footer/>
    </div>
  ):(
     <div>
    <Head>
    <title>Medical Export</title>
    </Head>
    <Sugar/>
    </div>
  )
}

export async function getServerSideProps(context) {
  const client = createClient({
    projectId: "b5hbcmsc",
    dataset: "production",
    useCdn: false,
  });
  const query = `*[_type == "product"]`;
  const query2 = `*[_type == "craousal"]`;
  const query3 = `*[_type == "logo"]`;
  const products = await client.fetch(query);
  const craousal = await client.fetch(query2);
  const logo = await client.fetch(query3);
  const query4 = `*[_type == "catergory"]`;
  const categories = await client.fetch(query4);

  return {
    props: {
      products,
      craousal,
      logo,
      categories,
    },
  };
}
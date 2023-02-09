import React from 'react'
import { useEffect, useState } from "react";
import { Sugar } from 'react-preloaders';
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useRouter } from 'next/router'
import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import Head from "next/head";
import index from '../shop';
import { Rings } from 'react-loader-spinner'

export default function category({ products, craousal, logo, categories, subcategories }) {


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
  return !loading ? (
    <div>
      <Navbar logo={logo[0].logoimage} cats={nav} />
      <Head>
        {
          categories.map((item, ind) => {
            if (item._id == category) {
              return (
                <title>{item.name}</title>
              );
            }
          })
        }
      </Head>
      <div className='lg:w-[80%] sm:w-full sm:px-2 lg:px-0 m-auto'>
        <div className='mt-20'>
          {
            categories.map((item, index) => {
              if (item._id == category) {
                return (
                  <div>
                    <h1 className='text-3xl mb-3 font-semibold'>{item.name}</h1>
                    <br />
                    <p>{item.content}</p>
                  </div>
                );
              }
            })
          }
          <div className='mt-10'>
            {
              subcategories.map((item, index) => {
                if (item?.cat?._ref == category) {
                  return (
                    <Link href={"/subcategory/" + item._id} key={index} className="bg-gray-100 p-3 text-xl font-semibold mx-3">{item.name}</Link>
                  );
                }
              })
            }
          </div>
          <br/>
          <br/>
          <hr></hr>

        </div>
        {
          subcategories.map((it, ind) => {
            if (it?.cat?._ref == category) {
              return (
                <div key={ind}>
                <div className="lg:flex  mt-10 sm:block justify-between">
                <h1 className="text-2xl font-semibold my-4">{it.name}</h1>
                <Link href={"/subcategory/" + it._id} className="hover:underline font-semibold">View all</Link>
                 </div>
                 <div className="grid grid-flow-row lg:grid-cols-4 sm:grid-cols-1">
                  {products.map((item, index) => {
                    if (item?.subcat?._ref == it._id) {
                      return (
                        <Link href={"/shop/" + item._id} key={index} className="mx-2 overflow-x-hidden ">
                          <div className="mt-8 lg:w-[350px] mx-2  shadow-lg ">
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
                  })
                  }
                  </div>
                </div>
              );
            }
          })
        }
      </div>
      <Footer />
    </div>
  ) : (
    <div>
      <Head>
        {
          categories.map((item, ind) => {
            if (item._id == category) {
              return (
                <title>{item.name}</title>
              );
            }
          })
        }
      </Head>
      <div className="flex w-screen justify-center items-center mt-[20%]">
        <div >
          <Rings
            className="block"
            height="120"
            width="120"
            color="#000000"
            radius="12"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="rings-loading"
          />
        </div>
      </div>
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
  const query5 = `*[_type == "subcatergory"]`;
  const products = await client.fetch(query);
  const craousal = await client.fetch(query2);
  const logo = await client.fetch(query3);
  const query4 = `*[_type == "catergory"]`;
  const categories = await client.fetch(query4);
  const subcategories = await client.fetch(query5);

  return {
    props: {
      products,
      craousal,
      logo,
      categories,
      subcategories
    },
  };
}

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React from "react";
import { Inter } from "@next/font/google";
import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import Link from "next/link";
import Head from "next/head";
import PortableText from "react-portable-text";
import { useEffect,useState } from "react";
import {Sugar} from 'react-preloaders';

export default function index({ shop, product, logo, category }) {

  const client = createClient({
    projectId: "b5hbcmsc",
    dataset: "production",
    useCdn: false,
  });
  const builder = imageUrlBuilder(client);

  function urlFor(source) {
    return builder.image(source);
  }

  let nav = [];
  category.map((item, index) => {
    let x = item.name;
    let y = item._id;
    nav.push({ x, y });
  });

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
        <title>Medical Export | Shop</title>
      </Head>
      <div className="">
        <h1 className="text-center mt-10 font-normal text-5xl block px-4">
          {shop[0].title}
        </h1>
        <hr className=" mt-10 mb-10 w-9/12  m-auto" />
        <div className="w-9/12  m-auto">
          <PortableText
            className="m-auto"
            // Pass in block content straight from Sanity.io
            content={shop[0].content}
            projectId="b5hbcmsc"
            dataset="production"
            // Optionally override marks, decorators, blocks, etc. in a flat
            // structure without doing any gymnastics
            serializers={{
              h1: (props) => <h1 style={{ color: "red" }} {...props} />,
              li: ({ children }) => (
                <li className="special-list-item">{children}</li>
              ),
            }}
          />
        </div>
        <div className="grid grid-flow-row lg:grid-cols-3 sm:grid-cols-1  align-middle lg:first-letter:w-5/6 lg:ml-20 sm:mx-2 sm:px-4  m-auto mt-20">
          {product.map((item, index) => {
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
          })}
        </div>
      </div>
      <Footer />
    </div>
  ) :(
    <div>
    <Head>
    <title>Medical Export | Shop</title>
    </Head>
    <Sugar/>
    </div>
  );
}
export async function getServerSideProps(context) {
  const client = createClient({
    projectId: "b5hbcmsc",
    dataset: "production",
    useCdn: false,
  });
  const query = `*[_type == "shop"]`;
  const query2 = `*[_type == "product"]`;
  const query3 = `*[_type == "logo"]`;
  const shop = await client.fetch(query);
  const product = await client.fetch(query2);
  const logo = await client.fetch(query3);
  const query4 = `*[_type == "catergory"]`;
  const category = await client.fetch(query4);

  return {
    props: {
      shop,
      product,
      logo,
      category,
    },
  };
}

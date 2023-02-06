import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React from "react";
import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import Link from "next/link";
import Head from "next/head";
import PortableText from "react-portable-text";
import { Rings } from 'react-loader-spinner'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useState,useEffect } from "react";

export default function index({ shop, product, logo, category }) {
  console.log(product)
  const client = createClient({
    projectId: "b5hbcmsc",
    dataset: "production",
    useCdn: false,
  });
  const builder = imageUrlBuilder(client);

  function urlFor(source) {
    return builder.image(source);
  }
  let x = 0
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

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };
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
        <div className="lg:w-[80%] sm:w-full m-auto mt-20">
          <div className="mb-10 ">
            <h1 className="font-semibold text-2xl" >Browse Categories</h1>
            <div className="mt-10 ">
              {
                category.map((item, index) => {
                  return (
                    <Link href={"/category/" + item._id} key={index} className="bg-gray-100 p-3 text-xl font-semibold mx-3">{item.name}</Link>
                  );
                })
              }
            </div>
          </div>
          <hr />
          <div className="mt-10">
            {
              category.map((it, ind) => {
                return (
                  <div key={ind} className="">
                    <div className="lg:flex  mt-10 sm:block justify-between">
                      <h1 className="text-2xl font-semibold my-4">{it.name}</h1>
                      <Link href={"/category/" + it._id} className="hover:underline font-semibold">View all</Link>
                    </div>
                    <h3 className="font-light">{it.content}</h3>
                    <Carousel
                    className="my-20"
                      swipeable={true}
                      draggable={true}
                      showDots={false}
                      responsive={responsive}
                      ssr={true} // means to render carousel on server-side.
                      infinite={true}
                      autoPlay={true}
                      autoPlaySpeed={2000}
                      keyBoardControl={true}
                      customTransition="all .5"
                      transitionDuration={500}
                      containerClass="carousel-container"
                      removeArrowOnDeviceType={[]}
                      dotListClass="custom-dot-list-style"
                      itemClass="carousel-item-padding-40-px"
                    >
                      {
                        product.map((item, index) => {
                          if (item?.cat?._ref == it._id) {
                            x = 1
                          }
                        })
                      }
                      {
                        !x ?
                          <div className="h-[100px] ">
                            <h1 className="font-semibold">No products yet</h1>
                          </div>
                          :
                          product.map((item, index) => {
                            if (item?.cat?._ref == it._id) {
                              return (
                                <Link href={"/shop/" + item._id}>
                                  <div className="mt-8  lg:w-[400px]  shadow-lg ">
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

                    </Carousel>
                    <hr />
                  </div>
                );
              })
            }
          </div>
        </div>
      </div>
      <Footer />
    </div>
  ) : (
    <div >
      <Head>
        <title>Medical Export | Shop</title>
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

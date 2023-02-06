import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

import Footer from "../components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect,useState } from "react";
import {Sugar} from 'react-preloaders';
import { Rings } from  'react-loader-spinner'

const inter = Inter({ subsets: ["latin"] });

export default function Home({ products, craousal, logo, category }) {
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
      <Head>
        <title>Medical Export</title>
      </Head>
      <Navbar logo={logo[0].logoimage} cats={nav} />
      <div>
        <Swiper
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          loop={true}
          modules={[Pagination, Autoplay]}
        >
          {craousal.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <div>
                  <img
                    className=" brightness-50  lg:h-[600px] h-60 w-full"
                    src={urlFor(item.image).url()}
                  />
                  <p className="text-white font-semibold brightness-75  font-mono lg:text-8xl sm:text-3xl tracking-widest	 text-center sm:w-full mx-auto -translate-y-56  lg:-translate-y-96  ">
                    {item.title}
                  </p>
                  <p className="text-white font-light brightness-75  font-serif lg:text-5xl sm:text-3xl tracking-widest	 text-center sm:w-full m-auto -translate-y-52  lg:-translate-y-80 ">
                    {item.content}
                  </p>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
      <h1 className="px-10 text-5xl font-mono font-bold mx-10 my-20">
        Products
      </h1>

      <div className="w-[87%] px-10 m-auto h-[350px]  mt-2 grid grid-flow-row lg:grid-cols-5 sm:grid-cols-1 overflow-y-hidden  overflow-x-auto scrollbar-hide ">
        {products.map((item, index) => {
          return (
            <Link

              href={"/shop/" + item._id}
              className=" scrollbar-hide hover:scale-105 transition duration-500"
            >
              <div key={index} className="h-[400px] w-[300px]">
                <img className="h-[300px] " src={urlFor(item.productimage).url()}/>
                <div>
                 <h1>{item.name}</h1>
                 <h1>${item.price}</h1>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <Footer />
    </div>
  ):(
    <div>
    <Head>
    <title>Medical Export</title>
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
  const query = `*[_type == "product"][0...5]`;
  const query2 = `*[_type == "craousal"]`;
  const query3 = `*[_type == "logo"]`;
  const products = await client.fetch(query);
  const craousal = await client.fetch(query2);
  const logo = await client.fetch(query3);
  const query4 = `*[_type == "catergory"]`;
  const category = await client.fetch(query4);

  return {
    props: {
      products,
      craousal,
      logo,
      category,
    },
  };
}

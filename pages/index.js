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

      <div className="w-[95%] m-auto h-[350px]  mt-2 flex  overflow-x-auto scrollbar-hide ">
        {products.map((item, index) => {
          return (
            <Link
              href={"/shop/" + item._id}
              className="scrollbar-hide hover:scale-105 transition duration-500"
            >
              <div
                key={index}
                className="flex-none lg:w-[250px] lg:h-[250px] w-[270px] h-[200px]   mx-10 md:pb-4"
              >
                <img
                  className="lg:w-[250px] lg:h-[250px] w-[270px] h-[200px]"
                  src={urlFor(item.productimage).url()}
                />
                <div className="w-full flex py-4 justify-between">
                  <h1 className="font-light text-xl">{item.name}</h1>
                  <h1 className="font-light text-xl">${item.price}</h1>
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
  const query = `*[_type == "product"]`;
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

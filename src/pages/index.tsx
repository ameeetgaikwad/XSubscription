import Image from "next/image";
import { Inter } from "next/font/google";
import Head from "next/head";
import Layout from "@/components/Layout/Layout";
import Home from "@/components/Home/Home";
const inter = Inter({ subsets: ["latin"] });

export default function Landing() {
  return (
    <main className="">
      <Head>
        <title>XSubscriptions</title>
      </Head>
      <Layout>
        <Home />
      </Layout>
    </main>
  );
}

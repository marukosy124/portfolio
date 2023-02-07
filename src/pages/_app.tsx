import { useRouter } from "next/router"
import useStore from "@/helpers/store"
import { useEffect } from "react"
import Header from "@/config"
import "@/styles/global.scss"
import Container from "@/components/Container"
import Navbar from "@/components/Navbar"
import dynamic from "next/dynamic"
import matter from "gray-matter"
import path from "path"
import fs from "fs"

const Cursor = dynamic(() => import("../components/Cursor"), { ssr: false })

function App({ Component, pageProps = { title: "index" } }) {
  const router = useRouter()

  useEffect(() => {
    useStore.setState({ router })
  }, [router])

  return (
    <>
      <Header title={pageProps.title} />
      <Cursor />
      <Navbar />
      <Container>
        <Component {...pageProps} />
      </Container>
    </>
  )
}

export default App

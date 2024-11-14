import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Providers from "@/src/utils/Providers"
import "./global.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "planetary-go",
  description: "planetary-go is a web application that allows you to explore the planets of the star wars.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="planetary-go">
      <body className={inter.className}>
        <div >
          <Providers>
            {children}
          </Providers>
        </div>
      </body>
    </html>
  )
}
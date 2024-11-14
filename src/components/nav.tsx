import { Lobster_Two } from "next/font/google"
const lobster = Lobster_Two({ subsets: ["latin"], weight: ["400"] })

export default async function Nav() {

  return (
    <nav className={lobster.className}>
      <ul className="flex py-8 justify-between items-center">
      </ul>
    </nav>
  )
}
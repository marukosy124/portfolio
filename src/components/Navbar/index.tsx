import { useEffect, useState } from "react"
import MenuButton from "../MenuButton"
import styles from "./index.module.scss"
import { useRouter } from "next/router"
import Image from "next/image"
import useViewport from "@/hooks/useViewport"

const MENU_ITEMS = [
  {
    title: "Home",
    route: "/",
  },
  {
    title: "About",
    route: "/about",
  },
  {
    title: "Experience",
    route: "/experience",
  },
  {
    title: "Projects",
    route: "/projects",
  },
  {
    title: "Contact",
    route: "/contact",
  },
]

const Navbar: React.FC = () => {
  const router = useRouter()
  const { isMobile } = useViewport()
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false)

  useEffect(() => {
    if (!isMobile) {
      setShowMobileMenu(false)
    }
  }, [isMobile])

  const handleMenuItemOnClick = (route: string) => {
    setShowMobileMenu(false)
    router.push(route)
  }

  return (
    <div className={styles.NavContainer}>
      <nav
        className={styles.Navbar}
        style={{
          background:
            (router.pathname === "/" || router.pathname === "/home") &&
            !showMobileMenu
              ? "transparent"
              : "black",
          flexDirection: showMobileMenu ? "column" : "row",
          height: showMobileMenu ? 320 : 60,
        }}
      >
        <div className={styles.topbar}>
          <Image
            src='/assets/icons/logo.png'
            width={40}
            height={40}
            alt='logo'
          />
          {isMobile && (
            <div>
              <MenuButton
                isExpanded={showMobileMenu}
                onClick={() => setShowMobileMenu(!showMobileMenu)}
              />
            </div>
          )}
        </div>
        <div className={styles.MenuItemContainer}>
          {MENU_ITEMS.map((item, index) => (
            <div
              className={`${styles.MenuItem} ${
                router.pathname === item.route ? styles.on : ""
              }`}
              onClick={() => handleMenuItemOnClick(item.route)}
              key={index}
            >
              <span
                className={`${styles.navTitle} ${
                  router.pathname === item.route ? styles.on : ""
                }`}
              >
                {item.title}
              </span>
            </div>
          ))}
        </div>
      </nav>
    </div>
  )
}

export default Navbar

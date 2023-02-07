import styles from "./index.module.scss"
import { useRouter } from "next/router"
import { HiUser, HiChatAlt } from "react-icons/hi"
import Button from "@/components/Button"
import Circle from "@/components/Circle"

const Page = () => {
  const router = useRouter()

  return (
    <div className={styles.HomePage}>
      <div className={styles.container}>
        <div className={styles.name}>
          <div className={styles.glitch} data-text='SONIA YEUNG'>
            SONIA YEUNG
          </div>
          <div className={styles.glow}>SONIA YEUNG</div>
        </div>
        <p className={styles.subtitle}>
          Software Engineer | Frontend Developer
        </p>
        <div className={styles.ButtonContainer}>
          <Button
            startIcon={<HiUser />}
            label='View My Profile'
            onClick={() => router.push("/about")}
          />
          <Button
            startIcon={<HiChatAlt />}
            label='Contact Me'
            onClick={() => router.push("/contact")}
          />
        </div>
      </div>
      <Circle />
    </div>
  )
}

export default Page

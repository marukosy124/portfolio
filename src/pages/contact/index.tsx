import styles from "./index.module.scss"
import { BsLinkedin, BsFillFileEarmarkTextFill } from "react-icons/bs"
import { RiMailSendFill } from "react-icons/ri"
import { MdEmail } from "react-icons/md"
import { useEffect, useRef, useState } from "react"
import emailjs from "@emailjs/browser"
import { FaGithub } from "react-icons/fa"
import {
  FRAME_TRANSITIONS,
  FRAME_VARIANTS,
  SNACKBAR_TIMEOUT,
} from "@/helpers/constants"
import { motion } from "framer-motion"
import Button from "@/components/Button"
import Snackbar from "@/components/Snackbar"
import TextField from "@/components/TextField"
import { isEmailValid } from "@/helpers/validation"
import matter from "gray-matter"
import path from "path"
import fs from "fs"

const INITIAL_SNACKBAR = {
  message: "",
  type: "",
}

const INITIAL_INPUTS = {
  from_name: "",
  from_email: "",
  message: "",
}

const Contract = ({ data }) => {
  const form = useRef()
  const [snackbar, setSnackbar] = useState(INITIAL_SNACKBAR)
  const snackbarRef = useRef(null)
  const [disabled, setDisabled] = useState<boolean>(false)
  const [inputs, setInputs] = useState(INITIAL_INPUTS)
  const [errors, setErrors] = useState(INITIAL_INPUTS)

  useEffect(() => {
    if (snackbar.message) {
      snackbarRef.current.show()
      setTimeout(() => {
        setSnackbar(INITIAL_SNACKBAR)
      }, SNACKBAR_TIMEOUT)
    }
  }, [snackbar])

  const handleInputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.currentTarget.name
    const value = e.currentTarget.value
    setInputs({ ...inputs, [name]: value })
    let newErrors = {
      ...errors,
      [name]: "",
    }
    if (name === "from_email" && !isEmailValid(value) && value) {
      newErrors = { ...newErrors, [name]: "Please provide a valid email" }
    }
    setErrors(newErrors)
  }

  const copyEmail = () => {
    setSnackbar({ message: "Copied!", type: "" })
    navigator.clipboard.writeText(data.email)
  }

  const sendEmail = (e) => {
    e.preventDefault()
    let newErrors = {
      ...errors,
    }
    Object.keys(inputs).forEach((key) => {
      if (!errors[key]) {
        newErrors = {
          ...newErrors,
          [key]: inputs[key] ? "" : "Please fill in the required field",
        }
      }
    })
    setErrors(newErrors)

    if (Object.keys(newErrors).every((key) => !newErrors[key])) {
      setDisabled(true)
      emailjs
        .sendForm(
          process.env.EMAILJS_SERVICE_ID,
          process.env.EMAILJS_TEMPLATE_ID,
          form.current,
          process.env.EMAILJS_API_KEY
        )
        .then(
          (result) => {
            setSnackbar({
              message: "Received! Thank you for your message!",
              type: "",
            })
          },
          (error) => {
            // console.error(error.text)
            setSnackbar({
              message: `Failed to send the message :( Please try again.`,
              type: "error",
            })
          }
        )
        .catch((error) => {
          // console.error(error)
          setSnackbar({
            message: `Failed to send the message :( Please try again.`,
            type: "error",
          })
        })
        .finally(() => setDisabled(false))
    }
  }

  return (
    <motion.main
      variants={FRAME_VARIANTS}
      initial='hidden'
      animate='enter'
      exit='exit'
      transition={FRAME_TRANSITIONS}
    >
      <div className={styles.ContactPage}>
        <div>
          <div className={styles.title}>Know more about me by...</div>
          <div className={styles.container}>
            <Button
              startIcon={<BsLinkedin />}
              label='LinkedIn'
              onClick={() => window.open(data.linkedIn, "_blank")}
              className={styles.social}
            />
            <Button
              startIcon={<FaGithub />}
              label='GitHub'
              onClick={() => window.open(data.github, "_blank")}
              className={styles.social}
            />
            <Button
              startIcon={<MdEmail />}
              label='Email'
              onClick={copyEmail}
              className={styles.social}
            />
            <Button
              startIcon={<BsFillFileEarmarkTextFill />}
              label='Resume'
              onClick={() =>
                window.open(path.join("/Sonia_Yeung_Resume.pdf"), "_blank")
              }
              className={styles.social}
            />
          </div>
        </div>
        <div>
          <h2>Or drop me a direct message!</h2>
          <form ref={form} onSubmit={sendEmail}>
            <TextField
              className={styles.input}
              placeholder='Name'
              name='from_name'
              disabled={disabled}
              value={inputs.from_name}
              onChange={handleInputOnChange}
              error={Boolean(errors.from_name)}
              helperText={errors.from_name}
            />
            <TextField
              className={styles.input}
              placeholder='Email'
              name='from_email'
              disabled={disabled}
              value={inputs.from_email}
              onChange={handleInputOnChange}
              error={Boolean(errors.from_email)}
              helperText={errors.from_email}
            />
            <TextField
              className={styles.input}
              placeholder='Message'
              textarea
              name='message'
              disabled={disabled}
              value={inputs.message}
              onChange={handleInputOnChange}
              error={Boolean(errors.message)}
              helperText={errors.message}
            />
            <Button
              startIcon={<RiMailSendFill />}
              label={disabled ? "Sending..." : "Send"}
              className={styles.send}
              type='submit'
              disabled={disabled}
            />
          </form>
        </div>
      </div>
      <Snackbar
        ref={snackbarRef}
        message={snackbar.message}
        type={snackbar.type}
      />
    </motion.main>
  )
}

export default Contract

export async function getStaticProps() {
  const file = fs.readFileSync(path.join("content/contact.md"), "utf-8")
  const { data } = matter(file)
  return {
    props: {
      data,
    },
  }
}

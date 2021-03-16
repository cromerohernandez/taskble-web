import { useState } from "react"

const useModal = () => {
  const [show, setShow] = useState(false)

  const showModal = () => setShow(true)

  const hideModal = () => setShow(false)

  return {
    show,
    showModal,
    hideModal
  }
}

export default useModal
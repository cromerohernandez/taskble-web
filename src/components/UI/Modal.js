import '../../stylesheets/UI/modal.css'

const Modal = ({ handleClose, show, children }) => {
  const modalClassName = show ? 'modal display-block' : 'modal display-none'

  return (
    <div className={modalClassName}>
      <section className='modal-main'>
        {children}
        <button type="button" onClick={handleClose}>
          Close
        </button>
      </section>
    </div>
  )
}

export default Modal
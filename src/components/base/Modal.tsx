type PropTypes = {
    title?: string, 
    content?: any,
    onConfirm?: () => void
    onClose?: () => void
}

export default function Modal({title, content, onConfirm, onClose} : PropTypes) {
  return (
    <div className="overlay">
      <div className="modal-custom">
        <div className="modal-title">
          <h4>{title ? title : "Xác nhận"}</h4>
          <i className="fa-solid fa-xmark" onClick={onClose} />
        </div>
        <div className="modal-body-custom">
          <span>{content}</span>
        </div>
        <div className="modal-footer-custom">
          <button className="btn btn-light" onClick={onClose}>
            Hủy
          </button>
          <button className="btn btn-danger" onClick={onConfirm}>
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
}

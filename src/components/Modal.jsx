import React, { useState } from "react";

const Modal = ({ btnText, id_modal, children }) => {
  const [isVisible, setIsVisible] = useState(false);

  const openModal = () => {
    setIsVisible(true);
  };

  const closeModal = () => {
    setIsVisible(false);
  };

  const childrenWithProps = React.Children.map(children, (child) => {
    return React.cloneElement(child, { closeModal });
  });

  return (
    <div>
      <label htmlFor={id_modal} className="block" onClick={openModal}>
        <button>
          {btnText}
        </button>
      </label>

      <input
        type="checkbox"
        id={id_modal}
        className="modal-toggle"
        checked={isVisible}
      />
      <div className={`modal ${isVisible ? "visible" : ""}`} role="dialog">
        <div className="modal-box">{childrenWithProps}</div>
        <label
          className="modal-backdrop"
          htmlFor={id_modal}
          onClick={closeModal}
        >
          Close
        </label>
      </div>
    </div>
  );
};

export default Modal;

import { useState, useEffect } from "react";

const Toast = ({ message, type = "info", onClose, duration = 3000 }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setShow(false);
        setTimeout(onClose, 300); // Animation duration
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const getToastClass = () => {
    const baseClass = "toast fade";
    const typeClass = {
      success: "bg-success",
      error: "bg-danger",
      warning: "bg-warning",
      info: "bg-info",
    };
    return `${baseClass} ${show ? "show" : ""} ${
      typeClass[type] || typeClass.info
    }`;
  };

  return (
    <div className={getToastClass()} role="alert" style={{ minWidth: "250px" }}>
      <div className="toast-header">
        <strong className="me-auto text-white">
          {type === "success" && <i className="bi bi-check-circle me-2"></i>}
          {type === "error" && (
            <i className="bi bi-exclamation-circle me-2"></i>
          )}
          {type === "warning" && (
            <i className="bi bi-exclamation-triangle me-2"></i>
          )}
          {type === "info" && <i className="bi bi-info-circle me-2"></i>}
          {type === "success"
            ? "Başarılı"
            : type === "error"
            ? "Hata"
            : type === "warning"
            ? "Uyarı"
            : "Bilgi"}
        </strong>
        <button
          type="button"
          className="btn-close btn-close-white"
          onClick={() => {
            setShow(false);
            setTimeout(onClose, 300);
          }}
        ></button>
      </div>
      <div className="toast-body text-white">{message}</div>
    </div>
  );
};

export default Toast;

import { useEffect, useState } from "react";

function ToastModal({ onClose, duration = 2000 }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setVisible(false), duration);
    const unmountTimer = setTimeout(onClose, duration + 500);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(unmountTimer);
    };
  }, [duration, onClose]);

  return (
    <div className={`toast_modal_container ${visible ? "" : "fade-out"}`}>
      <span>링크가 복사되었습니다.</span>
    </div>
  );
}

export default ToastModal;

import { useRef } from 'react';
import useScrollLock from '../../hooks/useScrollLock';

function ZoomModal({ children, onClose }) {
  const containerRef = useRef(null);
  useScrollLock();

  return (
    <div className='zoom_modal_overlay' onClick={onClose} ref={containerRef}>
      <div className='zoom_modal_container' onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}

export default ZoomModal;

import { useState, useRef, useEffect } from 'react';
import { MarkdownRenderer } from '../../utils/MarkdownRenderer';
import { ReactComponent as CancelSvg } from '../../../assets/svg/modal_cancel.svg';
import { useModalStore } from '../../store/useModalStore';
import useScrollLock from '../../hooks/useScrollLock';

function InfoModal({ infoModalData }) {
  const { isOpen, setModal } = useModalStore();
  const contentKeys = Object.keys(infoModalData);
  const [selectedKey, setSelectedKey] = useState(contentKeys[0] || '');
  const containerRef = useRef(null);
  useScrollLock();

  return (
    <div className='modal_info_overlay' onClick={() => setModal('infoModal', false)}>
      <div
        className={`modal_info_container ${isOpen ? 'open' : 'closing'}`}
        ref={containerRef}
        onClick={e => e.stopPropagation()}>
        <div className='modal_info_header'>
          {contentKeys.map(key => (
            <button
              key={key}
              className={`tab_button ${selectedKey === key ? 'active' : ''}`}
              onClick={() => setSelectedKey(key)}>
              {key}
            </button>
          ))}
        </div>
        <button className='modal_info_close_button' onClick={() => setModal('infoModal', false)}>
          <CancelSvg />
        </button>
        <div className='modal_info_content'>
          <div className='modal_info_content_inner'>
            <MarkdownRenderer markdown={infoModalData[selectedKey]} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoModal;

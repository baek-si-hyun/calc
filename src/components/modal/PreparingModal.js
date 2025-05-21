import { ReactComponent as CancelSvg } from '../../assets/svg/modal_cancel.svg';
import useScrollLock from '../../hooks/useScrollLock';

function PreparingModal({ onClose }) {
  useScrollLock();

  return (
    <div className='rate_detail_modal_overlay' onClick={onClose}>
      <div className='preparing_modal_container' onClick={e => e.stopPropagation()}>
        <button className='preparing_modal_cancel_btn' onClick={onClose}>
          <CancelSvg />
        </button>

        <div className='preparing_modal_content'>
          <span>
            서비스 <span className='preparing_text'>준비중</span> 입니다
          </span>
          <p>빠른 시일 내에 준비하여 찾아뵙겠습니다</p>
        </div>
        <button className='preparing_modal_confirm_btn' onClick={onClose}>
          <span>닫기</span>
        </button>
      </div>
    </div>
  );
}

export default PreparingModal;

import { useRef } from 'react';
import { ReactComponent as CancelSvg } from '../../../assets/svg/modal_cancel.svg';
import useScrollLock from '../../hooks/useScrollLock';
import { useModalStore } from '../../store/useModalStore';
import Image from 'next/image';

function DepositRateDetailModal({ data, setDetailModal }) {
  const containerRef = useRef(null);
  const { setModal } = useModalStore();
  useScrollLock();

  const detailModalHandle = () => {
    setDetailModal(null);
  };

  return (
    <div
      className='rate_detail_modal_overlay'
      onClick={() => {
        setModal('bankSelectModal', false);
        setDetailModal(null);
      }}>
      <div
        className='rate_detail_modal_cantainer'
        ref={containerRef}
        onClick={e => e.stopPropagation()}>
        <div className='rate_detail_modal_header'>
          <div className='rate_detail_modal_header_content'>
            <div className='rate_detail_modal_img_box'>
              <Image src={data.img} alt={data.bank} width={24} height={24} />
            </div>
            <div className='rate_detail_modal_header_title'>
              <span>{data.prd}</span>
            </div>
            <div className='rate_detail_modal_header_bank'>
              <span>{data.bank}</span>
            </div>
          </div>
          <button className='rate_retail_modal_cancel_btn' onClick={detailModalHandle}>
            <CancelSvg />
          </button>
        </div>
        <div className='rate_detail_modal_rate_box'>
          <div className='rate_detail_modal_rate_inner'>
            <div className='rate_detail_modal_rate_section'>
              <span>최고금리</span>
              <span>{data.std_ir ? data.high_ir + '%' : '-'}</span>
            </div>
            <span className='rate_detail_modal_rate_line'></span>
            <div className='rate_detail_modal_rate_section'>
              <span>기본금리</span>
              <span>{data.std_ir ? data.std_ir + '%' : '-'}</span>
            </div>
          </div>
        </div>
        <div className='rate_detail_modal_content_box'>
          <div className='rate_detail_modal_content_item'>
            <span className='rate_detail_modal_content_title'>만기</span>
            <span className='rate_detail_modal_content'>{data.maturity}</span>
          </div>
          <div className='rate_detail_modal_content_item'>
            <span className='rate_detail_modal_content_title'>이자 방식</span>
            <span className='rate_detail_modal_content'>{data.ir_calc_mthd}</span>
          </div>
          <div className='rate_detail_modal_content_item'>
            <span className='rate_detail_modal_content_title'>은행 최종 제공일</span>
            <span className='rate_detail_modal_content'>{data.bk_last_ofr_dt}</span>
          </div>
          <div className='rate_detail_modal_content_item'>
            <span className='rate_detail_modal_content_title'>전월취급 평균금리</span>
            <span className='rate_detail_modal_content'>{data.avg_ir_prev_mnth}</span>
          </div>
          <div className='rate_detail_modal_content_item'>
            <span className='rate_detail_modal_content_title'>가입 방법</span>
            <span className='rate_detail_modal_content'>{data.signup}</span>
          </div>
          <div className='rate_detail_modal_content_item'>
            <span className='rate_detail_modal_content_title'>우대 조건</span>
            <span className='rate_detail_modal_content line-height-150'>{data.prfrntl_cndtns}</span>
          </div>
          <div className='rate_detail_modal_content_item'>
            <span className='rate_detail_modal_content_title'>제한 사항</span>
            <span className='rate_detail_modal_content'>{data.sub_restr}</span>
          </div>
          <div className='rate_detail_modal_content_item'>
            <span className='rate_detail_modal_content_title'>대상</span>
            <span className='rate_detail_modal_content'>{data.sub_target}</span>
          </div>
          <div className='rate_detail_modal_content_item'>
            <span className='rate_detail_modal_content_title'>추가 노트</span>
            <span className='rate_detail_modal_content line-height-150'>{data.other_notes}</span>
          </div>
          <div className='rate_detail_modal_content_item'>
            <span className='rate_detail_modal_content_title'>최대 한도</span>
            <span className='rate_detail_modal_content'>{data.sub_restr}</span>
          </div>
          <div className='rate_detail_modal_content_item'>
            <span className='rate_detail_modal_content_title'>만기 후 금리</span>
            <span className='rate_detail_modal_content line-height-150'>
              {data.post_maturity_ir}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default DepositRateDetailModal;

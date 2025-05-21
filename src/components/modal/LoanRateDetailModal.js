import { useRef } from 'react';
import { ReactComponent as CancelSvg } from '../../../assets/svg/modal_cancel.svg';
import useScrollLock from '../../hooks/useScrollLock';
import { useModalStore } from '../../store/useModalStore';
import Image from 'next/image';

function LoanRateDetailModal({ data, setDetailModal }) {
  const containerRef = useRef(null);
  useScrollLock();
  const { setModal } = useModalStore();

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
              <span>{data.loan_type}</span>
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
              <span>평균금리</span>
              <span>{data.avg_rate}%</span>
            </div>
            <span className='rate_detail_modal_rate_line'></span>
            <div className='rate_detail_modal_rate_section'>
              <span>서민금융 제외 평균금리</span>
              <span>{data.excluded_avg_rate === '-' ? '-' : `${data.excluded_avg_rate}%`}</span>
            </div>
          </div>
        </div>
        <div className='rate_detail_modal_content_box'>
          <div className='rate_detail_modal_content_item'>
            <span className='rate_detail_modal_content_title'>카테고리</span>
            <span className='rate_detail_modal_content'>{data.category}</span>
          </div>
          <div className='rate_detail_modal_content_item'>
            <span className='rate_detail_modal_content_title'>평균 신용점수</span>
            <span className='rate_detail_modal_content'>{data.avg_credit_score}</span>
          </div>
          <div className='rate_detail_modal_content_item'>
            <span className='rate_detail_modal_content_title'>CB 회사</span>
            <span className='rate_detail_modal_content'>{data.cb_company}</span>
          </div>
        </div>
        <div className='rate_detail_modal_content_table_box'>
          <span className='rate_detail_modal_content_table_title'>신용점수별 금리</span>
          <div className='custom_table'>
            <div className='custom_table_row'>
              <div className='custom_table_cell'>
                <span>1000~</span>
              </div>
              <div className='custom_table_cell'>
                <span>950~</span>
              </div>
              <div className='custom_table_cell'>
                <span>900~</span>
              </div>
              <div className='custom_table_cell'>
                <span>850~</span>
              </div>
              <div className='custom_table_cell'>
                <span>800~</span>
              </div>
              <div className='custom_table_cell'>
                <span>750~</span>
              </div>
              <div className='custom_table_cell'>
                <span>700~</span>
              </div>
              <div className='custom_table_cell'>
                <span>650~</span>
              </div>
              <div className='custom_table_cell'>
                <span>600</span>
              </div>
            </div>
            <div className='custom_table_row'>
              <div className='custom_table_cell'>
                <span>{data['1000~951']}</span>
              </div>
              <div className='custom_table_cell'>
                <span>{data['950~901']}</span>
              </div>
              <div className='custom_table_cell'>
                <span>{data['900~851']}</span>
              </div>
              <div className='custom_table_cell'>
                <span>{data['850~801']}</span>
              </div>
              <div className='custom_table_cell'>
                <span>{data['800~751']}</span>
              </div>
              <div className='custom_table_cell'>
                <span>{data['750~701']}</span>
              </div>
              <div className='custom_table_cell'>
                <span>{data['700~651']}</span>
              </div>
              <div className='custom_table_cell'>
                <span>{data['650~601']}</span>
              </div>
              <div className='custom_table_cell'>
                <span>{data['600']}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoanRateDetailModal;

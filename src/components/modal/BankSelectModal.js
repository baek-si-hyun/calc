import { useEffect, useRef, useState } from 'react';
import { DEPOSIt_BANK_LIST } from '../../data/staticData';
import { ReactComponent as CancelSvg } from '../../../assets/svg/bank_select_modal_cancel.svg';
import { useModalStore } from '../../store/useModalStore';
import useScrollLock from '../../hooks/useScrollLock';
import Image from 'next/image';

function BankSelectModal({ selectedBanks, setSelectedBanks }) {
  const [tempBanks, setTempBanks] = useState([]);
  const containerRef = useRef(null);
  useScrollLock();

  const { isOpen, setModal } = useModalStore();

  useEffect(() => {
    setTempBanks(selectedBanks);
  }, [isOpen, selectedBanks]);

  // 개별 토글
  const handleBankClick = bankId => {
    setTempBanks(prev =>
      prev.includes(bankId) ? prev.filter(id => id !== bankId) : [...prev, bankId],
    );
  };

  // 전체 체크박스 ON/OFF
  const handleAllChange = e => {
    if (e.target.checked) {
      setTempBanks(DEPOSIt_BANK_LIST.map(b => b.id));
    } else {
      setTempBanks([]);
    }
  };

  // 재선택: 임시값만 초기화
  const handleReset = () => {
    setTempBanks([]);
  };

  // 확인: 부모 상태에 적용 후 모달 닫기
  const handleConfirm = () => {
    setSelectedBanks(tempBanks);
    setModal('bankSelectModal', false);
  };

  return (
    <div className='bank_select_modal_overlay' onClick={() => setModal('bankSelectModal', false)}>
      <div
        className='bank_select_modal_container'
        onClick={e => e.stopPropagation()}
        ref={containerRef}>
        <div className='bank_select_modal_header'>
          <span>은행 선택</span>
          <CancelSvg onClick={() => setModal('bankSelectModal', false)} />
        </div>
        <div className='bank_select_modal_all_input_box'>
          <label className='bank_select_modal_all_label'>
            <input
              type='checkbox'
              className='bank_select_modal_all_checkbox'
              checked={tempBanks.length === DEPOSIt_BANK_LIST.length}
              onChange={handleAllChange}
            />
            <span>은행 전체 선택</span>
          </label>
        </div>
        <div className='bank_select_modal_list'>
          {DEPOSIt_BANK_LIST.map(b => (
            <button
              key={b.id}
              className={`rate_bank_modal_item ${tempBanks.includes(b.id) ? 'selected' : ''}`}
              onClick={() => handleBankClick(b.id)}>
              <Image src={b.img} alt={b.id} width={24} height={24} />
              <span>{b.id}</span>
            </button>
          ))}
        </div>
        <div className='bank_select_modal_btn_box'>
          <button onClick={handleReset}>재선택</button>
          <button onClick={handleConfirm}>확인</button>
        </div>
      </div>
    </div>
  );
}

export default BankSelectModal;

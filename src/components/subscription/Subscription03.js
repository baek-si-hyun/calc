import { useMemo } from "react";
import { fmt, fmtYm, formatTel } from "../../../utils/subscriptionUtils";
import { specialMap } from "../../../data/staticData";

function Subscription03({ info, date }) {
  const detailList = info?.detailList ?? [];

  const specialList = useMemo(() => {
    if (!info) return [];
    return Object.entries(specialMap)
      .filter(([key]) => info[key] === "Y")
      .map(([, label]) => label);
  }, [info]);

  return (
    <>
      {/* ───────── 청약일정 ───────── */}
      <div className="subscription_detail_section">
        <span className="subscription_detail_section_title">청약일정</span>
        <div className="table_scroll">
          <table className="subscription_detail_schedule_table">
            <tbody>
              <tr>
                <th className="width-20">모집공고일</th>
                <td className="text-left">
                  {fmt(info.rcritPblancDe)} {info.press}
                </td>
              </tr>
              <tr>
                <th className="width-20">청약접수</th>
                <td className="text-left">
                  {fmt(info.subscrptRceptBgnde)} &nbsp;~&nbsp;{" "}
                  {fmt(info.subscrptRceptEndde)}
                </td>
              </tr>
              <tr>
                <th className="width-20">당첨자 발표일</th>
                <td colSpan={4} className="text-left">
                  {fmt(info.przwnerPresnatnDe)} (
                  <a
                    href={info.hmpgAdres || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {info.hmpgAdres || ""}
                  </a>
                  )
                </td>
              </tr>
              <tr>
                <th className="width-20">계약일</th>
                <td className="text-left">
                  {fmt(info.cntrctCnclsBgnde)} &nbsp;~&nbsp;{" "}
                  {fmt(info.cntrctCnclsEndde)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="subscription_detail_explan">
          {specialList.length > 0 && (
            <span>*특별사항 : {specialList.join(", ")}</span>
          )}
          <span>
            *특별공급은 종류에 따라 접수기간 및 장소가 다를 수 있으니 모집공고를
            반드시 확인하시길 바랍니다.
          </span>
        </div>
      </div>

      {/* ───────── 공급대상 ───────── */}
      <div className="subscription_detail_section">
        <span className="subscription_detail_section_title">공급대상</span>
        <div className="table_scroll">
          <table className="subscription_detail_housing_table">
            <thead>
              <tr>
                <th rowSpan={2} className="width-10">
                  주택구분
                </th>
                <th rowSpan={2}>군</th>
                <th rowSpan={2}>타입</th>
                <th rowSpan={2} className="width-10">
                  전용면적
                </th>
                <th colSpan={5}>공급세대수</th>
                <th rowSpan={2} className="width-17">
                  주택관리번호(모델번호)
                </th>
              </tr>
              <tr>
                <th colSpan={3}>특별공급</th>
                <th>일반공급</th>
                <th className="border-right-1px">계</th>
              </tr>
            </thead>
            <tbody>
              {detailList.map((d, idx) => {
                const total =
                  (Number(d.spsplyYgmnHshldco) || 0) +
                  (Number(d.spsplyNewMrrgHshldco) || 0) +
                  (Number(d.spsplyAgedHshldco) || 0) +
                  (Number(d.gnsplyHshldco) || 0);
                return (
                  <tr key={d.modelNo}>
                    {/* 첫 행에만 주택구분 병합 */}
                    {idx === 0 && (
                      <td rowSpan={detailList.length}>{info.houseDtlSecdNm}</td>
                    )}
                    <td>{d.gp || "-"}</td>
                    <td>{d.tp}</td>
                    <td>{d.excluseAr}</td>
                    <td>{d.spsplyYgmnHshldco}</td>
                    <td>{d.spsplyNewMrrgHshldco}</td>
                    <td>{d.spsplyAgedHshldco}</td>
                    <td>{d.gnsplyHshldco}</td>
                    <td>{total}</td>
                    <td>
                      {info.houseManageNo}({d.modelNo})
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ───────── 공급금액 및 입주예정월 ───────── */}
      <div className="subscription_detail_section">
        <div className="subscription_detail_section_title_box">
          <span className="subscription_detail_section_title">
            공급내역 및 입주예정월
          </span>
          <span className="subscription_detail_section_unit">
            공급금액 (단위 : 만원)
          </span>
        </div>
        <div className="table_scroll">
          <table className="subscription_detail_price_table">
            <thead>
              <tr>
                <th>군</th>
                <th>타입</th>
                <th>공급금액</th>
                <th>청약신청금</th>
              </tr>
            </thead>
            <tbody>
              {detailList.map((d) => (
                <tr key={d.modelNo}>
                  <td>{d.gp || "-"}</td>
                  <td>{d.tp}</td>
                  <td>{Number(d.suplyAmount).toLocaleString()}</td>
                  <td>{d.subscrptReqstAmount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="subscription_detail_explan">
          <span>*입주예정월 : {fmtYm(info.mvnPrearngeYm)}</span>
        </div>
      </div>
      {/* ---------- 기타사항 ---------- */}
      <div className="subscription_detail_section">
        <span className="subscription_detail_section_title">기타사항</span>
        <div className="table_scroll">
          <table className="subscription_detail_basic_table">
            <thead>
              <tr>
                <th>시행사</th>
                <th>시공사</th>
                <th>사업주체 전화번호</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{info.bsnsMbyNm || "-"}</td>
                <td>{info.cnstrctEntrpsNm || "-"}</td>
                <td>
                  {info.mdhsTelno ? (
                    <a
                      href={`tel:${info.mdhsTelno}`}
                      className="highlight_tel"
                      style={{ textDecoration: "none" }}
                    >
                      {formatTel(info.mdhsTelno)}
                    </a>
                  ) : (
                    "-"
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="subscription_detail_explan">
          <span>
            *시행사 및 시공사가 여러 업체인 경우 한 업체만 표시됩니다.
          </span>
          {info.press ? (
            <span>
              *기타 자세한 모집공고문 내용은{" "}
              {info.rcritPblancDe} {info.press}
              에 게시된 내용을 참고하시기 바랍니다.
            </span>
          ) : (
            <span>
              *기타 자세한 모집공고문 내용은 사업주체 홈페이지 및 구청 게시판
              등에 게시된 내용을 참고하시기 바랍니다.
            </span>
          )}
        </div>
      </div>
    </>
  );
}

export default Subscription03;

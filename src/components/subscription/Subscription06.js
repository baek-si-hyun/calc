// src/components/subscription/SubscriptionDetail/Subscription06.jsx
import { useMemo } from "react";
import { fmt, fmtYm, formatTel } from "../../../utils/subscriptionUtils";
import { specialMap } from "../../../data/staticData";

function Subscription06({ info, date }) {
  const detailList = info?.detailList ?? [];

  const totalGeneral = detailList.reduce(
    (sum, d) => sum + Number(d.suplyHshldco || 0),
    0
  );
  const totalSpecial = detailList.reduce(
    (sum, d) => sum + Number(d.spsplyHshldco || 0),
    0
  );

  const specialList = useMemo(() => {
    if (!info) return [];
    return Object.entries(specialMap)
      .filter(([key]) => info[key] === "Y")
      .map(([, label]) => label);
  }, [info]);

  return (
    <>
      {/* ---------- 청약일정 ---------- */}
      <div className="subscription_detail_section">
        <span className="subscription_detail_section_title">청약일정</span>
        {(() => {
          /* ① 접수 행 필터링 */
          const rows = [];
          if (info.spsplyRceptBgnde || info.spsplyRceptEndde)
            rows.push({
              label: "특별공급",
              start: info.spsplyRceptBgnde,
              end: info.spsplyRceptEndde,
            });
          if (info.gnrlRceptBgnde || info.gnrlRceptEndde)
            rows.push({
              label: "일반공급",
              start: info.gnrlRceptBgnde,
              end: info.gnrlRceptEndde,
            });

          return (
            <div className="table_scroll">
              <table className="subscription_detail_basic_table">
                <tbody>
                  {/* 모집공고일 */}
                  <tr>
                    <th>모집공고일</th>
                    <td colSpan={3} className="text-left">
                      {fmt(info.rcritPblancDe)} {info.press}
                    </td>
                  </tr>

                  {/* 헤더: 구분 / 접수기간 / 접수장소 */}
                  {rows.length > 0 && (
                    <tr>
                      <th rowSpan={rows.length + 1}>청약접수</th>
                      <th className="subscription_detail_sub_head">구분</th>
                      <th className="subscription_detail_sub_head">접수기간</th>
                      <th className="subscription_detail_sub_head">접수장소</th>
                    </tr>
                  )}

                  {/* 실제 데이터 행 */}
                  {rows.map(({ label, start, end }) => (
                    <tr key={label}>
                      <td>{label}</td>
                      <td>
                        {fmt(start)} {start || end ? " ~ " : ""} {fmt(end)}
                      </td>
                      <td>인터넷</td>
                    </tr>
                  ))}

                  {/* 당첨자 발표 / 계약일 */}
                  <tr>
                    <th>당첨자발표</th>
                    <td colSpan={3} className="text-left">
                      {fmt(info.przwnerPresnatnDe)}
                    </td>
                  </tr>
                  <tr>
                    <th>계약일</th>
                    <td colSpan={3} className="text-left">
                      {fmt(info.cntrctCnclsBgnde)} ~{" "}
                      {fmt(info.cntrctCnclsEndde)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          );
        })()}
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

      {/* ---------- 공급대상 ---------- */}
      <div className="subscription_detail_section">
        <span className="subscription_detail_section_title">공급대상</span>
        <div className="table_scroll">
          <table className="subscription_detail_housing_table">
            <thead>
              <tr>
                <th rowSpan={2}>주택구분</th>
                <th rowSpan={2}>주택형</th>
                <th rowSpan={2}>주택공급면적 (주거전용+주거공용)</th>
                <th colSpan={3}>공급세대수</th>
                <th rowSpan={2}>주택관리번호(모델번호)</th>
              </tr>
              <tr>
                <th>일반</th>
                <th>특별</th>
                <th className="border-right-1px">계</th>
              </tr>
            </thead>
            <tbody>
              {detailList.map((d, idx) => {
                const rowTotal =
                  Number(d.suplyHshldco || 0) + Number(d.spsplyHshldco || 0);
                return (
                  <tr key={d.modelNo}>
                    {idx === 0 && (
                      <td rowSpan={detailList.length}>
                        {info.houseDtlSecdNm || "민영"}
                      </td>
                    )}
                    <td>{d.houseTy}</td>
                    <td>{d.suplyAr || d.supplyAr}</td>
                    <td>{d.suplyHshldco}</td>
                    <td>{d.spsplyHshldco}</td>
                    <td>{rowTotal}</td>
                    <td>
                      {d.houseManageNo}({d.modelNo})
                    </td>
                  </tr>
                );
              })}
              <tr className="subscription_detail_sum_row">
                <td colSpan={3}>계</td>
                <td>{totalGeneral}</td>
                <td>{totalSpecial}</td>
                <td>{totalGeneral + totalSpecial}</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="subscription_detail_explan">
          <span>
            * 특별공급 신청 미달 시 잔여물량은 일반공급으로 전환됨에따라
            일반공급 세대 수가 변경될 수 있으므로 최종 일반공급 세대수는
            일반공급 신청일에 '청약접수 경쟁률'에서 확인 또는 사업주체에
            문의하시기 바랍니다.
          </span>
          <span>* 주택형=주거전용면적(type이 있는 경우 type포함)</span>
        </div>
      </div>

      {/* ---------- 공급금액 및 입주예정월 ---------- */}
      <div className="subscription_detail_section">
        <span className="subscription_detail_section_title">
          공급금액 및 입주예정월
        </span>
        <div className="table_scroll">
          <table className="subscription_detail_price_table">
            <thead>
              <tr>
                <th>주택형</th>
                <th>공급금액(최고가 기준)</th>
                <th>입주예정월</th>
              </tr>
            </thead>
            <tbody>
              {detailList.map((d) => (
                <tr key={d.modelNo}>
                  <td>{d.houseTy}</td>
                  <td className="border-right-1px">
                    {Number(d.lttotTopAmount).toLocaleString()}
                  </td>
                  <td>{fmtYm(info.mvnPrearngeYm)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="subscription_detail_explan">
          <span>*입주예정월 : {fmtYm(info.mvnPrearngeYm)}</span>
          <span>
            * 층별(동호수별) 세부 공급금액은 사업주체의 입주자모집 공고문을
            참고하시기 바랍니다.
          </span>
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

export default Subscription06;

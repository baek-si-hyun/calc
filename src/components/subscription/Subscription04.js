import { useMemo } from "react";
import { fmt, fmtYm, formatTel } from "../../../utils/subscriptionUtils";
import { specialMap } from "../../../data/staticData";

function Subscription04({ info, date }) {
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

      {/* ───────── 공급내역 및 입주예정월 ───────── */}
      <div className="subscription_detail_section">
        <div className="subscription_detail_section_title_box">
          <span className="subscription_detail_section_title">
            공급내역 및 입주예정월
          </span>
        </div>
        <div className="table_scroll">
          <table className="subscription_detail_housing_table">
            <thead>
              <tr>
                <th>주택형</th>
                <th>공급세대수</th>
                <th>비고</th>
              </tr>
            </thead>
            <tbody>
              {detailList.map((d, idx) => (
                <tr key={d.modelNo}>
                  <td>{d.houseTy}</td>
                  <td className="border-right-1px">{d.suplyHshldco}</td>
                  {idx === 0 && (
                    <td
                      rowSpan={detailList.length}
                      style={{ textAlign: "left" }}
                    >
                      • 공급금액 : 사업주체 문의
                      <br />
                      • 잔여세대 동·호수 : 모집공고문 참조
                      <br />
                      (상단의 ‘모집공고문 보기’를 클릭하시면 확인 가능합니다)
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="subscription_detail_explan">
          <span>*입주예정월 : {fmtYm(info.mvnPrearngeYm)}</span>
        </div>
      </div>
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

export default Subscription04;

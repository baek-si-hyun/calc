import { useMemo } from "react";
import { fmt, fmtYm, formatTel } from "../../../utils/subscriptionUtils";
import { specialMap } from "../../../data/staticData";

function Subscription01({ info, houseSecd, date }) {
  const detailList = info?.detailList ?? [];

  const spCols = [
    { label: "다자녀가구", key: "mnychHshldco" },
    { label: "신혼부부", key: "nwwdsHshldco" },
    { label: "생애최초", key: "lfeFrstHshldco" },
    { label: "청년", key: "ygmnHshldco" },
    { label: "노부모부양", key: "oldParntsSuportHshldco" },
    { label: "신생아 (일반형)", key: "nwbbHshldco" },
    { label: "기관추천", key: "insttRecomendHshldco" },
    { label: "이전기관", key: "transrInsttEnfsnHshldco" },
    { label: "기타", key: "etcHshldco" },
  ];

  const specialList = useMemo(() => {
    if (!info) return [];
    return Object.entries(specialMap)
      .filter(([key]) => info[key] === "Y")
      .map(([, label]) => label);
  }, [info]);

  return (
    <>
      {houseSecd === "01" && (
        <>
          {/* ---------- 청약일정 (민영·APT 유형만 표시) ---------- */}
          {info.gnrlRnk1CrspareaRcptde && (
            <>
              <div className="subscription_detail_section">
                <span className="subscription_detail_section_title">
                  청약일정
                </span>
                {(() => {
                  const rows = [];
                  if (info.spsplyRceptBgnde || info.spsplyRceptEndde)
                    rows.push({
                      label: "특별공급",
                      start: info.spsplyRceptBgnde,
                      end: info.spsplyRceptEndde,
                    });
                  if (info.gnrlRnk1CrspareaRcptde || info.gnrlRnk1EtcAreaRcptde)
                    rows.push({
                      label: "1순위",
                      start: info.gnrlRnk1CrspareaRcptde,
                      end: info.gnrlRnk1EtcAreaRcptde,
                    });
                  if (info.gnrlRnk2CrspareaRcptde || info.gnrlRnk2EtcAreaRcptde)
                    rows.push({
                      label: "2순위",
                      start: info.gnrlRnk2CrspareaRcptde,
                      end: info.gnrlRnk2EtcAreaRcptde,
                    });

                  if (rows.length === 0) return null; // 세 행 모두 숨겨야 하면 전체 블록 생략

                  return (
                    <div className="table_scroll">
                      <table className="subscription_detail_basic_table">
                        <tbody>
                          <tr>
                            <th>모집공고일</th>
                            <td colSpan={4} className="text-left">
                              {fmt(info.rcritPblancDe)} {info.press}
                            </td>
                          </tr>

                          {/** ② 헤드(구분·해당지역·기타지역·접수장소) */}
                          <tr>
                            <th rowSpan={rows.length + 1}>청약접수</th>
                            <th className="subscription_detail_sub_head">
                              구분
                            </th>
                            <th className="subscription_detail_sub_head">
                              해당지역
                            </th>
                            <th className="subscription_detail_sub_head">
                              기타지역
                            </th>
                            <th className="subscription_detail_sub_head">
                              접수장소
                            </th>
                          </tr>

                          {/** ③ 실제 데이터 행 */}
                          {rows.map(({ label, start, end }) => (
                            <tr key={label}>
                              <td>{label}</td>
                              <td>{fmt(start)}</td>
                              <td>{fmt(end)}</td>
                              <td>인터넷</td>
                            </tr>
                          ))}

                          {/* 이후 행(당첨자 발표·계약일) 그대로 */}
                          <tr>
                            <th>당첨자발표</th>
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
                            <th>계약일</th>
                            <td colSpan={4} className="text-left">
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
                    *특별공급은 종류에 따라 접수기간 및 장소가 다를 수 있으니
                    모집공고를 반드시 확인하시길 바랍니다.
                  </span>
                </div>
              </div>
            </>
          )}
          {/* ---------- 공급대상 (detailList 존재 시) ---------- */}
          {detailList.length > 0 && (
            <div className="subscription_detail_section">
              <span className="subscription_detail_section_title">
                공급대상
              </span>
              <div className="table_scroll">
                <table className="subscription_detail_housing_table">
                  <thead>
                    <tr>
                      <th rowSpan={2}>주택구분</th>
                      <th rowSpan={2}>주택형</th>
                      <th rowSpan={2}>
                        주택공급면적
                        <br />
                        (주거전용+주거공용)
                      </th>
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
                    {detailList.map((d, idx) => (
                      <tr key={d.modelNo}>
                        {idx === 0 && (
                          <td rowSpan={detailList.length}>
                            {info.houseDtlSecdNm}
                          </td>
                        )}
                        <td>{d.houseTy}</td>
                        <td>{d.suplyAr}</td>
                        <td>{d.suplyHshldco}</td>
                        <td>{d.spsplyHshldco}</td>
                        <td>{d.suplyHshldco + d.spsplyHshldco}</td>
                        <td>
                          {d.houseManageNo}({d.modelNo})
                        </td>
                      </tr>
                    ))}
                    <tr className="subscription_detail_sum_row">
                      <td colSpan={3}>계</td>
                      <td>
                        {detailList.reduce(
                          (sum, d) => sum + Number(d.suplyHshldco || 0),
                          0
                        )}
                      </td>
                      <td>
                        {detailList.reduce(
                          (sum, d) => sum + Number(d.spsplyHshldco || 0),
                          0
                        )}
                      </td>
                      <td>
                        {detailList.reduce(
                          (sum, d) =>
                            sum +
                            Number(d.suplyHshldco || 0) +
                            Number(d.spsplyHshldco || 0),
                          0
                        )}
                      </td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {/* ---------- 특별공급 공급대상 (민영·APT 전용) ---------- */}
          {(() => {
            /* 1️⃣ ‘계’ 값이 0이 아닌 행만 골라 둡니다 */
            const specialRows = detailList
              .map((d) => {
                const rowTotal = spCols.reduce(
                  (sum, c) => sum + (Number(d[c.key]) || 0),
                  0
                );
                return { ...d, rowTotal };
              })
              .filter((d) => d.rowTotal > 0); // 💡 여기서 필터링

            /* 2️⃣ 전부 0 이라면 섹션을 아예 숨김 */
            if (specialRows.length === 0) return null;

            /* 3️⃣ 살아남은 행으로만 표를 그립니다 */
            return (
              <div className="subscription_detail_section">
                <div className="subscription_detail_section_title_box">
                  <span className="subscription_detail_section_title">
                    특별공급 공급대상
                  </span>
                  <span className="subscription_detail_section_unit">
                    공급금액 (단위 : 세대)
                  </span>
                </div>

                <div className="table_scroll">
                  <table className="subscription_detail_special_table">
                    <thead>
                      <tr>
                        <th rowSpan={2} className="padding-16">
                          주택형
                        </th>
                        <th colSpan={spCols.length + 1} className="padding-16">
                          공급세대수
                        </th>
                      </tr>
                      <tr>
                        {spCols.map((c) => (
                          <th key={c.key} className="padding-8">
                            {c.label}
                          </th>
                        ))}
                        <th>계</th>
                      </tr>
                    </thead>

                    <tbody>
                      {specialRows.map((d) => (
                        <tr key={d.modelNo}>
                          <td className="padding-16">{d.houseTy}</td>
                          {spCols.map((c) => (
                            <td key={c.key} className="padding-16">
                              {Number(d[c.key] || 0)}
                            </td>
                          ))}
                          <td className="padding-16">{d.rowTotal}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="subscription_detail_explan">
                  <span>
                    *공급세대수는 사업주체의 최초 입주자모집 공고문 기준입니다.
                    특별공급 신청 미달 시 잔여물량은 일반공급으로 전환될 수
                    있습니다.
                  </span>
                  <span>*주택형 = 주거전용면적(type 포함)</span>
                </div>
              </div>
            );
          })()}
          {/* ---------- 공급금액 ---------- */}
          {detailList.some((d) => d.lttotTopAmount) && (
            <div className="subscription_detail_section">
              <div className="subscription_detail_section_title_box">
                <span className="subscription_detail_section_title">
                  공급금액 및 청약금
                </span>
                <span className="subscription_detail_section_unit">
                  공급금액 (단위 : 만원)
                </span>
              </div>
              <div className="table_scroll">
                <table className="subscription_detail_price_table">
                  <thead>
                    <tr>
                      <th>주택형</th>
                      <th>공급금액(최고가 기준)</th>
                      <th>2순위 청약금</th>
                    </tr>
                  </thead>
                  <tbody>
                    {detailList.map((d, idx) => (
                      <tr key={d.modelNo}>
                        <td>{d.houseTy}</td>
                        <td className="border-right-1px">
                          {Number(d.lttotTopAmount).toLocaleString()}
                        </td>
                        {idx === 0 && (
                          <td rowSpan={detailList.length}>
                            청약통장으로 청약 (청약금 없음)
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="subscription_detail_explan">
                <span>*입주예정월 : {fmtYm(info.mvnPrearngeYm)}</span>
                <span>
                  * 층별(동호수별) 세부 공급금액은 사업주체의 입주자모집
                  공고문을 참고하시기 바랍니다.
                </span>
              </div>
            </div>
          )}
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
                  *기타 자세한 모집공고문 내용은 사업주체 홈페이지 및 구청
                  게시판 등에 게시된 내용을 참고하시기 바랍니다.
                </span>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Subscription01;

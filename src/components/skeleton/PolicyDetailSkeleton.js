function PolicyDetailSkeleton() {
  return (
    <div className="policy_detail_container">
      <div className="policy_detail_content_box">
        <div className="policy_detail_header">
          <div className="skeleton_line skeleton_line_medium" />
          <div className="skeleton_line skeleton_line_short" />
        </div>
        <div className="policy_detail_file_list">
          {[1, 2].map((_, idx) => (
            <div
              key={idx}
              className="policy_detail_file_item_skeleton skeleton_item"
            >
              <div className="policy_detail_file_title">
                <div className="skeleton_img_box" />
                <div className="skeleton_line skeleton_line_medium" />
              </div>
              <div className="policy_detail_file_btn_box">
                <div className="skeleton_line skeleton_line_short" />
                <div className="skeleton_line skeleton_line_short" />
              </div>
            </div>
          ))}
        </div>
        <div className="policy_detail_back_btn_box">
          <div
            className="skeleton_line skeleton_line_short"
            style={{
              height: 40,
              width: 120,
              borderRadius: 12,
              marginTop: "80px",
            }}
          />
        </div>
      </div>
    </div>
  );
}
export default PolicyDetailSkeleton;

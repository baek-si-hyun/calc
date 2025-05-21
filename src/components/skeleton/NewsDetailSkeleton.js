function NewsDetailSkeleton() {
  return (
    <div className="news_detail_container">
      <div className="news_detail_content_box">
        <div className="news_detail_header">
          <div className="news_detail_skeleton_line news_detail_skeleton_line_large title" />
          <div className="news_detail_skeleton_line news_detail_skeleton_line_medium date" />
        </div>
        <div className="news_detail_skeleton_sub_title_box">
          <div className="news_detail_skeleton_sub_title" />
          <div className="news_detail_skeleton_sub_title" />
        </div>
        <div className="news_detail_img_box">
          <div className="news_detail_skeleton_img_box detail_img" />
        </div>
        <div className="news_detail_content">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="news_detail_skeleton_line news_detail_skeleton_line_full"
            />
          ))}
        </div>
        <div className="news_detail_next_btn_box_skeleton">
          <div
            className="news_detail_skeleton_line news_detail_skeleton_line_short"
            style={{ width: 80 }}
          />
          <div
            className="news_detail_skeleton_line news_detail_skeleton_line_medium"
            style={{ width: 200 }}
          />
        </div>
      </div>
      <div className="news_detail_back_btn_box">
        <div
          className="news_detail_skeleton_line news_detail_skeleton_line_medium"
          style={{ width: 120, height: 40, borderRadius: 12 }}
        />
      </div>
    </div>
  );
}

export default NewsDetailSkeleton;

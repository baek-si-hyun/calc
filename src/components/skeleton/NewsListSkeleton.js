function NewsListSkeleton({ count = 8, className = "" }) {
  return (
    <>
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className={`news_list_item news_list_skeleton_item ${className}`}
        >
          <div className="news_item_img_box">
            <div className="news_list_skeleton_img_box" />
          </div>
          <div className="news_item_text_box">
            {/* 언더스코어(_)로 수정 */}
            <div className="news_list_skeleton_line news_list_skeleton_line_short" />
            <div className="news_list_skeleton_line news_list_skeleton_line_medium" />
          </div>
        </div>
      ))}
    </>
  );
}

export default NewsListSkeleton;

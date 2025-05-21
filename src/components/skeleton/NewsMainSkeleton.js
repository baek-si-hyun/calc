
function NewsMainSkeleton() {
  return (
    <div className="skeleton_news_list">
      {Array.from({ length: 4 }).map((_, idx) => (
        <div key={idx} className="skeleton_news_item">
          <div className="skeleton_news_img_box" />
          <div className="skeleton_news_content">
            <div className="skeleton_news_line skeleton_news_line_short" />
            <div className="skeleton_news_line skeleton_news_line_medium" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default NewsMainSkeleton;
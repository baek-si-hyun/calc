function PolicyListSkeleton({ count = 9, className = "" }) {
  return (
    <>
      {Array.from({ length: count }).map((_, idx) => (
        <div key={idx} className={` policy_list_skeleton_item ${className}`}>
          <div className="policy_item_img_box">
            <div className="policy_list_skeleton_img_box" />
          </div>
          <div className="policy_item_text_box">
            <div className="policy_list_skeleton_line policy_list_skeleton_line_medium" />
            <div className="policy_list_skeleton_line policy_list_skeleton_line_short" />
          </div>
        </div>
      ))}
    </>
  );
}

export default PolicyListSkeleton;

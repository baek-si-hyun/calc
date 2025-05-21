function PolicyMainSkeleton() {
  return (
    <div className="policy_skeleton_list">
      {Array.from({ length: 4 }).map((_, idx) => (
        <div key={idx} className="policy_skeleton_item">
          <div className="policy_skeleton_img_box" />
          <div className="policy_skeleton_content">
            <div className="policy_skeleton_line policy_skeleton_line_medium" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default PolicyMainSkeleton;
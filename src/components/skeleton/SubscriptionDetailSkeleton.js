function SubscriptionDetailSkeleton() {
  return (
    <>
      <header className="subscription_detail_header">
        <div className="subscription_detail_skeleton_rect subscription_detail_h32 subscription_detail_w240 subscription_detail_mr20" />
        <div className="subscription_detail_skeleton_rect subscription_detail_h24 subscription_detail_w120 subscription_detail_mr12" />
        <div className="subscription_detail_skeleton_rect subscription_detail_h20 subscription_detail_w160" />
      </header>
      {Array.from({ length: 3 }).map((_, idx) => (
        <div className="subscription_detail_section" key={idx}>
          <div className="subscription_detail_skeleton_rect subscription_detail_h24 subscription_detail_w160 subscription_detail_mb16" />
          <div className="subscription_detail_skeleton_block subscription_detail_h260 subscription_detail_w_full" />
        </div>
      ))}
    </>
  );
}

export default SubscriptionDetailSkeleton;

'use client';

import { useEffect } from 'react';

export default function AdSenseLoader() {
  useEffect(() => {
    const s = document.createElement('script');
    s.src =
      'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3598033907432703';
    s.async = true;
    s.crossOrigin = 'anonymous';
    document.head.appendChild(s);

    (window.adsbygoogle = window.adsbygoogle || []).push({
      google_ad_client: 'ca-pub-3598033907432703',
      enable_page_level_ads: true,
    });
  }, []);

  return null;
}

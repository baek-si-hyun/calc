'use client';

import useWindowWidth from '../../hooks/useWindowWidth';
import DesktopHeader from './DeskTopHeader';
import MobileHeader from './MoblieHeader';

export default function Header() {
  const windowWidth = useWindowWidth();
  const isMobile = windowWidth <= 1023;

  return isMobile ? <MobileHeader /> : <DesktopHeader />;
}

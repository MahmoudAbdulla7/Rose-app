import { CalendarHeart, ClipboardList, LayoutDashboard, Package } from 'lucide-react';

export const DASHBOARD_NAV_LINKS = [
  { href: '/panel', label: 'overview', icon: LayoutDashboard },
  { href: '/panel/categories', label: 'categories', icon: ClipboardList },
  { href: '/panel/occasions', label: 'occasions', icon: CalendarHeart },
  { href: '/panel/products', label: 'products', icon: Package },
] as const;

export function isDashboardNavLinkActive(pathname: string, href: string) {
  if (href === '/panel') return pathname === '/panel';
  return pathname.startsWith(href);
}

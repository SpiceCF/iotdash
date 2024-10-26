import Link from 'next/link';
import { Badge } from '../ui/badge';
import { LucideIcon } from 'lucide-react';

interface NavLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
  badge?: string;
  active?: boolean;
  mobile?: boolean;
}

export function NavLink({
  href,
  icon: Icon,
  label,
  badge,
  active,
  mobile,
}: NavLinkProps) {
  const baseClasses =
    'flex items-center gap-3 rounded-lg px-3 py-2 transition-all';
  const mobileClasses =
    'mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2';
  const activeClasses = active
    ? 'bg-muted text-primary'
    : 'text-muted-foreground hover:text-primary';
  const classes = mobile
    ? `${mobileClasses} ${activeClasses}`
    : `${baseClasses} ${activeClasses}`;

  return (
    <Link href={href} className={classes}>
      <Icon className={mobile ? 'h-5 w-5' : 'h-4 w-4'} />
      {label}
      {badge && (
        <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
          {badge}
        </Badge>
      )}
    </Link>
  );
}

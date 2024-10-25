"use client";

import Link from "next/link";
import {
  Package2,
  Home,
  ShoppingCart,
  Package,
  Users,
  LineChart,
} from "lucide-react";
import { NavLink } from "@/components/dashboard/NavLink";
import { UpgradeCard } from "@/components/dashboard/UpgradeCard";

export function MobileNav() {
  return (
    <>
      <nav className="grid gap-2 text-lg font-medium">
        <Link
          href="#"
          className="flex items-center gap-2 text-lg font-semibold"
        >
          <Package2 className="h-6 w-6" />
          <span className="">Acme Inc</span>
        </Link>
        <NavLink href="#" icon={Home} label="Dashboard" mobile />
        <NavLink
          href="#"
          icon={ShoppingCart}
          label="Orders"
          badge="6"
          mobile
          active
        />
        <NavLink href="#" icon={Package} label="Products" mobile />
        <NavLink href="#" icon={Users} label="Customers" mobile />
        <NavLink href="#" icon={LineChart} label="Analytics" mobile />
      </nav>
      <div className="mt-auto">
        <UpgradeCard />
      </div>
    </>
  );
}
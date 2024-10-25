"use client";

import Link from "next/link";
import {
  Package2,
  Bell,
  Home,
  ShoppingCart,
  Package,
  Users,
  LineChart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/dashboard/NavLink";
import { UpgradeCard } from "@/components/dashboard/UpgradeCard";

export function Sidebar() {
  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 lg:h-[60px] items-center border-b px-4 lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Package2 className="h-6 w-6" />
            <span className="">Acme Inc</span>
          </Link>
          <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <NavLink href="#" icon={Home} label="Dashboard" />
            <NavLink href="#" icon={ShoppingCart} label="Orders" badge="6" />
            <NavLink href="#" icon={Package} label="Products" active />
            <NavLink href="#" icon={Users} label="Customers" />
            <NavLink href="#" icon={LineChart} label="Analytics" />
          </nav>
        </div>
        <div className="mt-auto p-4">
          <UpgradeCard />
        </div>
      </div>
    </div>
  );
}
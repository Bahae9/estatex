import {
  Building,
  ReceiptText,
  Home,
  MessageSquare,
  Newspaper,
  ArrowDownUp,
  Pickaxe,
  Archive,
  Users,
} from "lucide-react";

export const SIDEBAR_ITEMS = [
  { label: "Home", to: "/", Icon: Home },
  { label: "Real Estates", to: "/real-estates", Icon: Building },
  { label: "About", to: "/about", Icon: Newspaper },
  { label: "Contact", to: "/contact", Icon: ReceiptText },
  {
    label: "Feedbacks",
    to: "/feedbacks",
    Icon: MessageSquare,
  },
];

export const ADMIN_SIDEBAR_ITEMS = [
  { label: "Home", to: "/admin", Icon: Home },
  { label: "Real Estates", to: "/admin/real-estates", Icon: Building },
  { label: "Clients", to: "/admin/clients", Icon: Users },
  { label: "Agents", to: "/admin/agents", Icon: Pickaxe },
  { label: "Feedbacks", to: "/admin/feedbacks", Icon: MessageSquare },
  { label: "Transactions", to: "/admin/transactions", Icon: ArrowDownUp },
  { label: "Contracts", to: "/admin/contracts", Icon: Archive },
];

import { RedirectType, redirect } from "next/navigation";
import { items } from "@/constants";

export default function Catalog() {
  redirect(`/catalog/${items[0].id}`, RedirectType.replace);
}

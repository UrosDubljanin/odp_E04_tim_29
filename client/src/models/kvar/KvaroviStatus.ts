export const ALLOWED_FAULT_STATUSES = [
  "Kreiran",
  "Popravka u toku",
  "Saniran",
  "Problem nije rešen",
] as const;

export type KvaroviStatus = typeof ALLOWED_FAULT_STATUSES[number];

export function isFaultStatus(x: unknown): x is KvaroviStatus {
  return typeof x === "string" && (ALLOWED_FAULT_STATUSES as readonly string[]).includes(x);
}
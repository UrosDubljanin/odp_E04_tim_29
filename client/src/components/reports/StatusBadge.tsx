interface Props {
  status?: string;
}

export default function StatusBadge({ status }: Props) {
  const mapping: Record<string, { text: string; bg: string; textColor: string }> = {
    Kreiran: { text: "Otvoreno", bg: "#E6F4EA", textColor: "#276749" },
    "Popravka u toku": { text: "U toku", bg: "#D1F0D6", textColor: "#2F855A" },
    Saniran: { text: "Sanirano", bg: "#C6EAD4", textColor: "#22543D" },
    "Problem nije rešen": { text: "Problem", bg: "#F0FFF4", textColor: "#38A169" },
  };

  const info = mapping[status || ""] ?? { text: status ?? "Nepoznat", bg: "#EDF7ED", textColor: "#1A202C" };

  return (
    <span
      className="text-sm md:text-base font-semibold px-4 py-1.5 rounded-full"
      style={{ backgroundColor: info.bg, color: info.textColor }}
    >
      {info.text}
    </span>
  );
}


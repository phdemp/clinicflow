export function Avatar({
  name,
  colorClass = "bg-primary",
  size = 36,
}: {
  name: string;
  colorClass?: string;
  size?: number;
}) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <div
      className={`flex items-center justify-center rounded-full text-on-primary font-semibold shrink-0 ${colorClass}`}
      style={{ width: size, height: size, fontSize: size * 0.38 }}
    >
      {initials}
    </div>
  );
}

export default function SectionHeading({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="text-lg font-bold">{children}</div>;
}

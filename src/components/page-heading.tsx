export default function PageHeading({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="text-2xl font-bold">{children}</div>;
}

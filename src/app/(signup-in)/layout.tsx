export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="w-80">{children}</div>
    </div>
  );
}

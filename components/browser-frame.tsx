interface BrowserFrameProps {
  children: React.ReactNode;
}

export default function BrowserFrame({ children }: BrowserFrameProps) {
  return (
    <div className="flex flex-col h-screen w-full bg-black">
      {/* Browser content */}
      <div className="flex-1 overflow-hidden">
        {children}
      </div>
    </div>
  );
}
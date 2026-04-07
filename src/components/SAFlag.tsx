export default function SAFlag({ className = '' }: { className?: string }) {
  return (
    <div className={`flex gap-[3px] items-center ${className}`}>
      <div className="h-[5px] w-7 rounded-sm bg-[#007A4D]" />
      <div className="h-[5px] w-2 rounded-sm bg-[#FFB81C]" />
      <div className="h-[5px] w-7 rounded-sm bg-white border border-sand-200" />
      <div className="h-[5px] w-2 rounded-sm bg-[#E03C31]" />
      <div className="h-[5px] w-7 rounded-sm bg-[#001489]" />
      <div className="h-[5px] w-2 rounded-sm bg-[#000]" />
    </div>
  )
}

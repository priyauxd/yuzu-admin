export default function Logo({ className = 'h-8' }: { className?: string }) {
  return (
    <div className="flex items-center gap-2">
      <img src={import.meta.env.BASE_URL + 'yuzu-logo.svg'} alt="yuzu" className={className} />
      <span className="font-semibold text-brand-text text-lg">yuzu</span>
    </div>
  )
}

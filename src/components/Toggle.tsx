import type { ReactNode } from 'react'

interface ToggleProps {
  enabled: boolean
  onChange?: () => void
  size?: 'sm' | 'lg'
  disabled?: boolean
  icon?: ReactNode
}

export default function Toggle({ enabled, onChange, size = 'lg', disabled = false, icon }: ToggleProps) {
  const track = size === 'sm'
    ? 'w-[40px] h-[22px]'
    : 'w-[54px] h-[30px]'

  const knob = size === 'sm'
    ? { h: 'h-[16px]', w: 'w-[24px]', top: 'top-[3px]', off: 'left-[3px]', on: 'left-[13px]' }
    : { h: 'h-6',      w: 'w-[34px]', top: 'top-[3px]', off: 'left-[3px]', on: 'left-[17px]' }

  const iconSize = size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'

  const trackColor = disabled
    ? enabled
      ? 'bg-yuzu-400/40 cursor-not-allowed'
      : 'bg-neutral-900 cursor-not-allowed'
    : enabled
      ? 'bg-yuzu-400 hover:bg-yuzu-500 cursor-pointer'
      : 'bg-neutral-200 hover:bg-neutral-300 cursor-pointer'

  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      onClick={disabled ? undefined : onChange}
      disabled={disabled}
      className={`relative ${track} rounded-full transition-colors duration-300 shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-yuzu-400 focus-visible:ring-offset-2 ${trackColor}`}
    >
      <span
        className={`absolute ${knob.top} ${knob.h} ${knob.w} rounded-full bg-white transition-all duration-300 flex items-center justify-center ${
          enabled ? knob.on : knob.off
        } ${disabled ? 'opacity-80' : ''}`}
        style={{ boxShadow: '0 2px 6px rgba(0,0,0,0.22)' }}
      >
        {icon && (
          <span className={`${iconSize} text-neutral-400 flex items-center justify-center`}>
            {icon}
          </span>
        )}
      </span>
    </button>
  )
}

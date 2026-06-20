import { useState, useRef, useEffect } from 'react'
import { ChevronDown, Check } from 'lucide-react'

export interface DropdownOption {
  value: string
  label: string
}

interface DropdownProps {
  options: DropdownOption[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
  id?: string
  size?: 'sm' | 'md'
  error?: boolean
}

export default function Dropdown({
  options,
  value,
  onChange,
  placeholder = 'Choose one',
  id,
  size = 'md',
  error = false,
}: DropdownProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const selectedOption = options.find((o) => o.value === value)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (open && listRef.current && value) {
      const active = listRef.current.querySelector('[data-active="true"]')
      if (active) active.scrollIntoView({ block: 'nearest' })
    }
  }, [open, value])

  const handleSelect = (optionValue: string) => {
    onChange(optionValue)
    setOpen(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setOpen(false)
      return
    }
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setOpen(!open)
      return
    }
    if (!open) return
    const currentIndex = options.findIndex((o) => o.value === value)
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      const next = Math.min(currentIndex + 1, options.length - 1)
      onChange(options[next].value)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      const prev = Math.max(currentIndex - 1, 0)
      onChange(options[prev].value)
    }
  }

  const isSm = size === 'sm'

  return (
    <div ref={ref} className="relative" id={id}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        onKeyDown={handleKeyDown}
        className={`w-full flex items-center justify-between rounded-xl border bg-white text-left transition focus:outline-none focus:ring-2 focus:ring-yuzu-400 focus:border-transparent ${
          error
            ? 'border-red-300 hover:border-red-400'
            : open
              ? 'border-yuzu-400 ring-2 ring-yuzu-400'
              : 'border-brand-border hover:border-neutral-300'
        } ${isSm ? 'px-3 py-1.5 text-xs' : 'px-4 py-3 text-sm'}`}
      >
        <span className={selectedOption && selectedOption.value ? 'text-brand-text' : 'text-neutral-400'}>
          {selectedOption && selectedOption.value ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          className={`shrink-0 text-neutral-400 transition-transform ${
            open ? 'rotate-180' : ''
          } ${isSm ? 'w-3.5 h-3.5 ml-2' : 'w-4 h-4 ml-3'}`}
        />
      </button>

      {open && (
        <div
          ref={listRef}
          className={`absolute z-50 mt-1.5 w-full bg-white rounded-xl border border-brand-border shadow-lg overflow-hidden animate-slide-in ${
            isSm ? 'max-h-48' : 'max-h-64'
          } overflow-y-auto`}
          style={{ animationDuration: '0.12s' }}
        >
          <div className="py-1">
            {options.map((option) => {
              const isSelected = option.value === value
              return (
                <button
                  key={option.value}
                  type="button"
                  data-active={isSelected || undefined}
                  onClick={() => handleSelect(option.value)}
                  className={`w-full flex items-center justify-between text-left transition-colors ${
                    isSm ? 'px-3 py-1.5 text-xs' : 'px-4 py-2.5 text-sm'
                  } ${
                    isSelected
                      ? 'bg-yuzu-50 text-yuzu-900 font-medium'
                      : 'text-brand-text hover:bg-neutral-50'
                  }`}
                >
                  <span>{option.label}</span>
                  {isSelected && <Check className={`shrink-0 text-yuzu-900 ${isSm ? 'w-3 h-3' : 'w-4 h-4'}`} />}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

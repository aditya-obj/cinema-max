"use client"

import React, { useState, useRef, useEffect } from "react"
import { cn } from "../../lib/utils"
import { ChevronDown } from "lucide-react"

const Select = ({ children, value, onValueChange, disabled }) => {
  const [open, setOpen] = useState(false)
  
  // Find the SelectTrigger and SelectContent children
  const triggerChild = React.Children.toArray(children).find(
    child => child.type === SelectTrigger
  )
  const contentChild = React.Children.toArray(children).find(
    child => child.type === SelectContent
  )

  return (
    <div className="relative">
      {triggerChild && React.cloneElement(triggerChild, {
        value,
        onValueChange,
        open,
        setOpen,
        disabled,
      })}
      {contentChild && React.cloneElement(contentChild, {
        open,
        setOpen,
        onValueChange,
      })}
    </div>
  )
}

const SelectTrigger = React.forwardRef(({ className, children, value, open, setOpen, disabled, ...props }, ref) => {
  return (
    <button
      ref={ref}
      type="button"
      className={cn(
        "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      onClick={() => !disabled && setOpen(!open)}
      disabled={disabled}
      {...props}
    >
      {React.Children.map(children, (child) => {
        if (child.type === SelectValue) {
          return React.cloneElement(child, { value })
        }
        return child
      })}
      <ChevronDown className="h-4 w-4 opacity-50" />
    </button>
  )
})
SelectTrigger.displayName = "SelectTrigger"

const SelectValue = ({ placeholder, value }) => {
  return <span className={cn(!value && "text-muted-foreground")}>{value || placeholder}</span>
}

const SelectContent = ({ children, open, setOpen, onValueChange }) => {
  const contentRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (contentRef.current && !contentRef.current.contains(event.target)) {
        setOpen(false)
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [open, setOpen])

  if (!open) return null

  return (
    <div
      ref={contentRef}
      className="absolute top-full left-0 right-0 z-[100] mt-1 max-h-60 overflow-auto rounded-md border bg-white text-black shadow-lg"
    >
      <div className="p-1">
        {React.Children.map(children, (child) => {
          if (child.type === SelectItem) {
            return React.cloneElement(child, { onValueChange, setOpen })
          }
          return child
        })}
      </div>
    </div>
  )
}

const SelectItem = ({ children, value, onValueChange, setOpen }) => {
  const handleClick = () => {
    console.log('SelectItem clicked with value:', value) // Debug log
    if (onValueChange) {
      onValueChange(value)
    }
    if (setOpen) {
      setOpen(false)
    }
  }

  return (
    <div
      className="relative flex w-full cursor-pointer select-none items-center rounded-sm py-2 pl-3 pr-2 text-sm outline-none hover:bg-orange-100 focus:bg-orange-100 transition-colors duration-200"
      onClick={handleClick}
    >
      {children}
    </div>
  )
}

export { Select, SelectContent, SelectItem, SelectTrigger, SelectValue }

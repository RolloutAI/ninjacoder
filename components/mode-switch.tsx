"use client"

import { useState } from "react"
import { CodeIcon, PenToolIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface ModeSwitchProps {
  className?: string
  activeMode: 'code' | 'design';
  setActiveMode: (mode: 'code' | 'design') => void;
}

export function ModeSwitch({ className, activeMode, setActiveMode }: ModeSwitchProps) {
  const isCodeMode = activeMode === 'code';

  return (
    <div
      className={cn(
        "flex items-center w-auto h-[30px] p-1 rounded-xl cursor-pointer transition-all duration-300 border backdrop-blur-md shadow-sm",
        "bg-[rgba(35,35,35,0.7)] border-[#232323]",
        className
      )}
      onClick={() => setActiveMode(isCodeMode ? 'design' : 'code')}
      role="button"
      tabIndex={0}
    >
      <div className="relative flex items-center w-[180px] h-full">
        {/* Sliding Background */}
        <div
          className={cn(
            "absolute top-0 left-0 w-[90px] h-full rounded-lg transition-transform duration-300 ease-in-out",
            isCodeMode
              ? "transform translate-x-0 bg-[#8cc700]"
              : "transform translate-x-[90px] bg-[#8cc700]"
          )}
        />
        
        {/* Code Mode Button */}
        <div className="relative z-10 flex items-center justify-center w-1/2 h-full">
          <CodeIcon 
            className={cn(
              "w-4 h-4 mr-2 transition-colors duration-300",
              isCodeMode ? "text-black" : "text-gray-400"
            )}
            strokeWidth={2.5}
          />
          <span className={cn(
            "text-xs font-semibold transition-colors duration-300",
            isCodeMode ? "text-black" : "text-gray-400"
          )}>
            Code
          </span>
        </div>

        {/* Design Mode Button */}
        <div className="relative z-10 flex items-center justify-center w-1/2 h-full">
          <PenToolIcon 
            className={cn(
              "w-4 h-4 mr-2 transition-colors duration-300",
              !isCodeMode ? "text-black" : "text-gray-400"
            )} 
            strokeWidth={2.5}
          />
           <span className={cn(
            "text-xs font-semibold transition-colors duration-300",
            !isCodeMode ? "text-black" : "text-gray-400"
          )}>
            Design
          </span>
        </div>
      </div>
    </div>
  )
} 
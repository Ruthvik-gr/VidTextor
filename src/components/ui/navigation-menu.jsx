import React from 'react'
import { Button } from "@/components/ui/button"
import logo from "../../assets/logo.png"

export function Navbar({ className, onActionClick, ...props }) {
  return (
    <nav className={`flex items-center justify-between p-4 ${className}`} {...props}>
      <div className="flex items-center">
        <div className="h-8 w-auto" ></div>
        <img src={logo} alt="logo" className="h-8 w-auto" />
        <span className="ml-2 text-lg font-semibold">Personaliz.ai</span>
      </div>
      <div>
        <Button onClick={onActionClick} className="w-full mb-4" >Try It For Free</Button>
      </div>
    </nav>
  )
}
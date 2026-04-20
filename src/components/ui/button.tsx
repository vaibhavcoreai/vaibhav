import * as React from 'react';

export const Button = React.forwardRef<HTMLButtonElement, any>(
  ({ className = '', variant = 'default', ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50';
    const variantStyles = variant === 'outline' 
      ? 'border border-white/20 bg-transparent hover:bg-white/10 text-[#ededed]' 
      : 'bg-[#ededed] text-black hover:bg-white/90';
      
    return (
      <button 
        ref={ref} 
        className={`${baseStyles} ${variantStyles} h-10 px-4 py-2 ${className}`} 
        {...props} 
      />
    );
  }
);

Button.displayName = "Button";

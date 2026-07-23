# Reusable UI Components Folder (`src/components/ui`)

This directory houses the low-level, atomic UI components. These components should be completely decoupled from business logic, and be highly reusable, accessible, and style-flexible.

## Planned Components

1. **Button (`Button.jsx`)**
   - Renders custom style variants (Primary, Secondary, Outline, Ghost, Danger).
   - Combines with Framer Motion for tap/hover micro-interactions.
   - Built-in loading states and icon configurations.

2. **Input fields (`Input.jsx`, `TextArea.jsx`)**
   - Stylized form controls with dark/light states.
   - ForwardRefs support for input focus control.
   - ARIA labels and validation descriptions wrapper.

3. **Card (`Card.jsx`)**
   - Implements standard glassmorphic containers.
   - Responsive configurations.

4. **Badge (`Badge.jsx`)**
   - Mini pill badges for stats, XP indicators, or user ranks.

5. **Modal / Dialogue (`Modal.jsx`)**
   - Handles overlays using portals.
   - Interactive backdrop fade and slide animations.
   - Close on ESC keypress accessibility.

6. **Tooltip (`Tooltip.jsx`)**
   - Helpful descriptions for complex UI icons (e.g., streak symbols, voice indicators).

## Styling Strategy
All elements must use the `cn` merging tool:
```javascript
import { cn } from '@/utils/cn'

export function Button({ className, variant = 'primary', ...props }) {
  return (
    <button 
      className={cn(
        "px-4 py-2 rounded-xl transition-premium font-medium focus-ring",
        variant === 'primary' && "bg-brand-600 hover:bg-brand-500 text-white",
        className
      )} 
      {...props} 
    />
  )
}
```

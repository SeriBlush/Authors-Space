import React from 'react';

// FIX: Update CardProps to accept all standard HTML attributes. This allows passing props like `onSubmit`
// when using the `as` prop to render a different element (e.g., `<form>`).
type CardProps = {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
} & React.HTMLAttributes<HTMLElement>;

const Card: React.FC<CardProps> = ({ children, className = '', as: Component = 'div', ...rest }) => {
  return (
    // FIX: Spread the rest of the props (`...rest`) to the underlying component.
    <Component className={`sketch-card bg-white p-6 relative ${className}`} {...rest}>
      {children}
    </Component>
  );
};

export default Card;

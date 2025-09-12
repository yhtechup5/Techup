import React from "react";
import "../styles/Button.css";

interface ButtonProps {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ text, onClick, disabled = false }) => {
  const handleClick = () => {
    if (onClick && !disabled) {
      onClick();
    }
  };

  return (
    <button 
      className={`button ${disabled ? 'button--disabled' : ''}`} 
      onClick={handleClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;

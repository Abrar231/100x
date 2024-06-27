import PropTypes from 'prop-types'

const Button = ({ children, size = "sm", variant, textColor, ...rest}) => {
    const baseStyles = "flex justify-center items-center rounded-full py-2 px-5 shadow-lg backdrop-blur-xl"

    const sizeStyles = {
      sm: "",
      lg: "self-stretch",
    }
  
    const variantStyles = {
      white:"bg-neutral-50 hover:bg-neutral-200 disabled:bg-neutral-500",
      blue:"bg-twitter-blue hover:bg-twitter-blue-hover disabled:bg-twitter-blue-disabled",
      outline: "border border-neutral-500",
    }
  
    const textBaseStyles = "font-inter text-center font-bold text-lg";
  
    const textColorStyles = {
      black:"text-black",
      white:"text-neutral-50",
      blue:"text-twitter-blue",
    }
    return (
      <button className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]}`} {...rest}>
        <div className={`${textBaseStyles} ${textColorStyles[textColor]}`}>
          {children}
        </div>
      </button>
    )
}

Button.propTypes = {
  size: PropTypes.oneOf(["sm", "lg"]),
  variant: PropTypes.oneOf(["white", "blue", "outline"]).isRequired,
  textColor: PropTypes.oneOf(["black", "white", "blue"]).isRequired,
  children: PropTypes.node.isRequired,
}

export default Button;
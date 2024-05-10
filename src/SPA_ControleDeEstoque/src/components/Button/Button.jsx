import { ButtonSpace } from "./ButtonStyled";


export function Button({ type, text, className }) {
  return <ButtonSpace type={type} className={className}>{text}</ButtonSpace>;
}
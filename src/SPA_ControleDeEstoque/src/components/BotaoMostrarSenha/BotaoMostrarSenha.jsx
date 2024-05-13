import React from "react";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";

export default function BotaoMostrarSenha({ senhaVisivel, togglePasswordVisibility }) {
  return (
    <div onClick={togglePasswordVisibility} style={{ cursor: "pointer"}}>
      {senhaVisivel ? <RiEyeOffFill /> : <RiEyeFill />}
    </div>
  );
}

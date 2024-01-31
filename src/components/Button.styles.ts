import styled from "styled-components";

export type ButtonVariant = "primary" | "secondary" | 'danger' | 'success';

interface ButtonProps {
  variant?: ButtonVariant;
}

const buttonVariants = {
  primary: 'purple',
  secondary: 'blue',
  danger: 'red',
  success: 'green'
}

export const ButtonContainer = styled.button<ButtonProps>`
  height: 40px;
  width: 100px;
  margin: .5rem;
  border: 0;
  border-radius: 5px;

  background-color: ${(props) => props.theme["green-500"]};
  color: ${(props) => props.theme.white};

  /* ${(props) => {
    return `
      background-color: ${buttonVariants[props.variant || 'primary']}
    `
  }} */
`
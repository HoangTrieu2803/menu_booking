import { FC } from "react";
import {styled} from "styled-components"
import { Colors } from "../type";
interface BasicButtonProps extends React.HtmlHTMLAttributes<HTMLButtonElement>{
    className?: string,
    disabled?: boolean,
    color?:Colors
}

const BasicButtonComponent = styled.button`
    background-color: transparent;
    border: 1px solid ;
    color: ${props => props.color};
    padding: 10px;
    border-radius: 5px;
    transition: all 1s ease-in-out;
    &:hover{
    transition: all 1s ease-in-out;
    background-color: yellow;
    color: $whiteColor;
    }
`
const BasicButton : FC<BasicButtonProps> = ({color,className,...props}) =>{
    return <BasicButtonComponent color={color} className={className}  {...props}></BasicButtonComponent>
}

export default BasicButton

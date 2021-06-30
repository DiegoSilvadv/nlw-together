import { ButtonHTMLAttributes } from 'react'

import '../styles/button.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    // expressao que significa que é opcional 
    isOutlined?: boolean
}

export function Button({isOutlined = false, ...props} : ButtonProps) {

    return(
        <button 
            className={`button ${isOutlined ? 'outlined' : ''}`}
            { ...props }/>
    )
}
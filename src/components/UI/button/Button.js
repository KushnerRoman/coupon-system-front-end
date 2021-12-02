import React, { Children } from 'react'
import classses from './Button.module.css'

export default function Button(props) {
    return (
        <button className={classses.button} type={props.type || 'button'} onClick={props.onClick}>{props.children}</button>
    )
}

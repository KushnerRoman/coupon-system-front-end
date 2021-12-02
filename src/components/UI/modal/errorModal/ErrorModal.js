import React from 'react'
import Button from '../../button/Button'
import Card from '../../card/Card'
import classes from './ErrorModal.module.css'

export default function ErrorModal(props) {
    return (
        <div >
            <div className={classes.backdrop}>

</div>
<Card className={classes.modal}>
    <header className={classes.header}>
        <h2>
            {props.title}
        </h2>
        
    </header>
    <div className={classes.content}>
        <p>
            {props.message}
        </p>
    </div>
        <footer className={classes.actions}>
            <Button onClick={props.onClick}>Get it! </Button>
          </footer>  

</Card>
        </div>
        
    )
}

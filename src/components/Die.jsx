import React, { useState } from "react";

export default function Dice(prop){
    const styles={backgroundColor: prop.isHeld ? "red":"#242424"}
    
    return(
        <>
        <section>

            <button onClick={prop.hold}style={styles}>{prop.value}</button>
        </section>
        </>
    )

}
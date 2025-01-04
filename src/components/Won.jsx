import '../App.css' 
export default function Won({resetDice}){
    return(
        <div>
            <h1>congrajulations!</h1>
            <h2>you won!</h2>
            <button className='dice-button' onClick={resetDice}>new game</button>
        </div>
    )
}
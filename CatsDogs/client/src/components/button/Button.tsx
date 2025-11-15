function Button({ handleClick }) {
    return (
        <div className="button-container">
        <button className="button" onClick={() => handleClick('like')}>👍</button>
        <button className="button" onClick={() => handleClick('neutral')}>😐</button>
        <button className="button" onClick={() => handleClick('dislike')}>👎</button>
        </div>
    )
}

export default Button;
function Card(props) {
    return (
        <>
            <img onClick={() => { props.onCardClick(props.card) }} className="elements__photo" alt={`${props.card.name}`} src={`${props.card.link}`} />
            <div className="elements__place">
                <h3 className="elements__caption">
                    {props.card.name}
                </h3>
                <div className="elements__likes">
                    <button type="button" className="elements__like">
                    </button>
                    <h4 className="elements__likes-sum">
                        {props.card.likes.length}
                    </h4>
                </div>
            </div>
        </>
    );
}

export default Card;
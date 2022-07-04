function Card(props) {
    return (
        <ul className="elements">
        {props.cards.map((card, id) => (
            <li className="elements__element" key={id}>
                <img onClick={() => {props.onCardClick(card)}} className="elements__photo" alt="" src={`${card.link}`} />
                <div className="elements__place">
                    <h3 className="elements__caption">
                        {card.name}
                    </h3>
                    <div className="elements__likes">
                        <button type="button" className="elements__like">
                        </button>
                        <h4 className="elements__likes-sum">
                            {card.likes.length}
                        </h4>
                    </div>
                </div>
            </li>
        ))}
    </ul>
    );
  }
  
  export default Card;
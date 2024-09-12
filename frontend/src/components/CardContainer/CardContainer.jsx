import React from "react";
import Card from "../Card/Card";
import EditCard from "../EditCard/EditCard";
import "./CardContainer.css"

const CardsContainer = ({ cards, option }) => {
    return (
        <div className="book-container-group">
                <div className="cards-group">
                    {cards.map((card, cardIndex) => (
                        option === 1 ? (
                            <Card key={cardIndex} card={card} />
                        ) : (
                            <EditCard key={cardIndex} card={card} />
                        )
                    ))}
                </div>
        </div>
    );
};

export default CardsContainer;

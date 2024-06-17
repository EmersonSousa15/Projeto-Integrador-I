import React from "react";
import Card from "../Card/Card"; 
import "./CardContainer.css"

const CardsContainer = ({ cards }) => {
    // Função para dividir os cards em grupos de quatro
    const splitIntoGroupsOfFour = (cards) => {
        const groups = [];
        for (let i = 0; i < cards.length; i += 4) {
            groups.push(cards.slice(i, i + 4));
        }
        return groups;
    };

    // Divide os cards em grupos de quatro
    const cardGroups = splitIntoGroupsOfFour(cards);

    return (
        <div>
            {cardGroups.map((group, index) => (
                <div key={index} className="cards-group">
                    {group.map((card, cardIndex) => (
                        <Card key={cardIndex} {...card} />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default CardsContainer;

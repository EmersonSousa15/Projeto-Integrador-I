import React from "react";
import Card from "../Card/Card";
import EditCard from "../EditCard/EditCard";
import "./CardContainer.css"

const CardsContainer = ({ cards, option }) => {
    // Função para dividir os cards em grupos de quatro
    const splitIntoGroupsOfFour = (cards) => {
        const groups = [];
        for (let i = 0; i < cards.length; i += 5) {
            groups.push(cards.slice(i, i + 5));
        }
        return groups;
    };

    // Divide os cards em grupos de quatro
    const cardGroups = splitIntoGroupsOfFour(cards);

    return (
        <div className="book-container-group">
            {cardGroups.map((group, index) => (
                <div key={index} className="cards-group">
                    {group.map((card, cardIndex) => (
                        option === 1 ? (
                            <Card key={cardIndex} {...card} />
                        ) : (
                            <EditCard key={cardIndex} {...card} />
                        )
                    ))}
                </div>
            ))}
        </div>
    );
};

export default CardsContainer;

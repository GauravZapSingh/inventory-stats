import React, { ReactNode } from "react";

interface CardProps {
    icon: ReactNode;
    title: string;
    value: string | number;
}

const Card: React.FC<CardProps> = ({ icon, title, value }) => {
    return (
        <div className="stats-card">
            <div className="stats-card__icon">
                {icon}
            </div>
            <div className="stats-card__content">
                <div className="stats-card__title">{title}</div>
                <div className="stats-card__value">{value}</div>
            </div>
        </div>
    )
}

export default Card;
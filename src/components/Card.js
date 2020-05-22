import React from "react";
import RedCard from "../images/RedCard.png";
import BlueCard from "../images/BlueCard.png";
import BlackCard from "../images/BlackCard.png";
import NeutralCard from "../images/NeutralCard.png";

export default function Card(props) {
  let cssClass = "";
  let card = "";

  if (props.info.team === "Blue") {
    cssClass += " blue";
    if(props.info.clicked){
      card = BlueCard;
    }
  } else if (props.info.team === "Red") {
    cssClass += " red";
    if(props.info.clicked){
      card = RedCard;
    }
  } else if (props.info.team === "Assassin") {
    cssClass += " black";
    if(props.info.clicked){
      card = BlackCard;
    }
  } else {
    cssClass += " neutral";
    if(props.info.clicked){
      card = NeutralCard;
    }
  }

  cssClass += props.info.clicked ? " revealed" : " hidden";

  return (
    <div className={"card" + cssClass} onClick={props.onClick} style={{backgroundImage: `url(${card})`}}>
      <div className="word">{props.info.value}</div>
    </div>
  );
}

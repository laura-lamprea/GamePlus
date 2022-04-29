import React from 'react';
// import C from './Card.module.css';
// import ball from "./ball.png";


//export default function Card(props) {   // y llamo props.name PERO ES MAS PRACTICO EL DESTRUCURINGDE ECMA6
export default function Card({ name, img, rating }) {

    return (
        <div>
             {/* className={C.card} */}
          <p>{name}nombre</p>
          <img src={img} width="200px" height="150" alt="Image Not Found" />          
          <p>{rating}</p>
        </div>
    )
};

{/* <div className={C.cardHead}>
<div className={C.cardHead2}>
    <img className={C.img1} src={ball} height="25px" alt="not found" />
    <p className={C.title}>{name}</p>
</div>
<div className={C.cardHead2}>
    <p className={C.title2}>{force}HP</p>
    <img className={C.img2} src={hp} height="30px" alt="not found" />
</div>
</div>

<div className={C.cardBody}>
<img src={imgT} width="150px" height="200" alt="Not found" />
</div>

<div className={C.cardFoot}>
<p className={C.type}>{type}</p>
</div> */}
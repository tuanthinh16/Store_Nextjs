import { useState } from "react";

export const QuantitySelector = ({ onChange }:any) => {
    const [quantity, setQuantity] = useState(1);

    const handleQuantityChange = (event: { target: { value: string; }; }) => {
        const newQuantity = parseInt(event.target.value, 10);
        setQuantity(newQuantity);
        onChange && onChange(newQuantity);
    };

    return (
        <div className="quantity-selector" style={{display:'flex',maxWidth:'90%'}}>
        <label htmlFor="quantity" style={{paddingTop:5,marginRight:5,fontWeight:'bold'}}>Quantity:</label>
        <select
            id="quantity"
            className="form-select"
            value={quantity}
            onChange={handleQuantityChange}
        >
            {[...Array(10).keys()].map((value) => (
            <option key={value + 1} value={value + 1}>
                {value + 1}
            </option>
            ))}
        </select>
        </div>
    );
};
import { CartImage, CartItemContainer, ItemDetails, Name, Price } from "./cart-item.styles";

const CartItem = ({cartItem}) => {
    const {name, imageUrl, price, quantity} = cartItem;
    return (
        <CartItemContainer>
            <CartImage src={imageUrl} alt={`${name}`}></CartImage>
            <ItemDetails>
                <Name>{name}</Name>
                <Price>{quantity} x ${price}</Price>
            </ItemDetails>
        </CartItemContainer>
    );
};

export default CartItem;
import { supabase } from "../supabase";
import type { CartItems } from "../types";
export const increasequantity = async (id: string, quantity: number, setCartItems: React.Dispatch<React.SetStateAction<CartItems[]>>) => {
    const { error } = await supabase
        .from('cart_items')
        .update({ quantity: quantity + 1 })
        .eq('id', id);
    const newQuantity = quantity + 1;
    if (error) {
        console.log(error);
    }
    // increase cart quantity
    setCartItems((currentItems) =>
        currentItems.map((item) => item.id === id ? { ...item, quantity: newQuantity }
            : item));

}
export const decreasequantity = async (id: string, quantity: number, setCartItems: React.Dispatch<React.SetStateAction<CartItems[]>>) => {
    const updatequantity = Math.max(1, quantity - 1);
    const { error } = await supabase
        .from('cart_items')
        .update({ quantity: updatequantity })
        .eq('id', id);
    const newQuantity = Math.max(1, quantity - 1);
    if (error) {
        console.log(error);
    }
    // decrease cart quantity
    setCartItems((currentItems) =>
        currentItems.map((item) => item.id === id ? { ...item, quantity: newQuantity }
            : item));
}
export const Deleteitem = async (id: string, setCartItems: React.Dispatch<React.SetStateAction<CartItems[]>>) => {
    const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('id', id);
    if (error) {
        console.log(error);
    }
    // Remove item for the cart 
    setCartItems((currentItems) =>
        currentItems.filter((item) => item.id !== id)
    );
}
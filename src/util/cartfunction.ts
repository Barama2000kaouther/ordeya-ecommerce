import { supabase } from "../supabase";
export const increasequantity = async (id: string, quantity: number,refreshCartItem: () => void) => {
    const { error } = await supabase
        .from('cart_items')
        .update({ quantity: quantity + 1 })
        .eq('id', id);
    if (error) {
        console.log(error);
    }
    refreshCartItem();
}
export const decreasequantity = async (id: string, quantity: number,refreshCartItem: () => void) => {
    const updatequantity = Math.max(1, quantity - 1);
    const { error } = await supabase
        .from('cart_items')
        .update({ quantity: updatequantity })
        .eq('id', id);
    if (error) {
        console.log(error);
    }
    refreshCartItem();
}
export const Deleteitem = async (id: string,refreshCartItem: () => void) => {
    const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('id', id);
    if (error) {
        console.log(error);
    }
    refreshCartItem();
}
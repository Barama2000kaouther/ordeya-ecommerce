import { supabase } from "../supabase";
import type { Dispatch, SetStateAction } from "react";
export const increasequantity = async (id: string, quantity: number,setRefresh: Dispatch<SetStateAction<number>>) => {
    const { error } = await supabase
        .from('cart_items')
        .update({ quantity: quantity + 1 })
        .eq('id', id);
    if (error) {
        console.log(error);
    }
    setRefresh((r) => r + 1);
}
export const decreasequantity = async (id: string, quantity: number,setRefresh: Dispatch<SetStateAction<number>>) => {
    const updatequantity = Math.max(1, quantity - 1);
    const { error } = await supabase
        .from('cart_items')
        .update({ quantity: updatequantity })
        .eq('id', id);
    if (error) {
        console.log(error);
    }
    setRefresh((r) => r + 1);
}
export const Deleteitem = async (id: string,setRefresh: Dispatch<SetStateAction<number>>) => {
    const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('id', id);
    if (error) {
        console.log(error);
    }
    setRefresh((r) => r + 1);
}
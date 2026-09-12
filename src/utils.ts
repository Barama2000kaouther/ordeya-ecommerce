import type { Product } from './types';
import type { Dispatch, SetStateAction } from "react";
import { supabase } from './supabase';
export const isProductInWishlist = (productId: string, wishlist: Product[] | undefined, products?: Product[]) => {
  if (wishlist) {
    return wishlist.some(item => item.id === productId);
  } if (products) {
    return products.some(item => item.id === productId);
  }
};

export const handleclick = async (productId: string, userId: string, setmessage: Dispatch<SetStateAction<string>>, refreshWishlist: () => void) => {
  
  const { data: wishlist, error } = await supabase
    .from('wishlist')
    .select("*")
    // Filters
    .eq('product_id', productId)
    .eq('user_id', userId);
  if (error) {
    setmessage("an error happen");
    console.log("Wishlist error:", error);
    return;
  }
  if ((wishlist && wishlist.length > 0)) {
    const { error } = await supabase
      .from('wishlist')
      .delete()
      .eq('product_id', productId)
      .eq('user_id', userId);

    if (error) {
      setmessage("an error happen");
      console.log("delete error:", error);
      return;
    }
    setmessage("");
    refreshWishlist();
  } else {
    const { error } = await supabase
      .from('wishlist')
      .insert(
        { 'user_id': userId, 'product_id': productId }
      )
      .select();

    if (error) {
      setmessage("an error happen");
      console.log("insert error:", error);
      return;
    }
    refreshWishlist();
    setmessage("");
  }
};

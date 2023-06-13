import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { cartListApi, addCartApi, clearCartApi, removeCartByIdApi, subCartByIdApi } from "../../api/main";

// const items =
//   localStorage.getItem("cartItems") !== null
//     ? JSON.parse(localStorage.getItem("cartItems"))
//     : [];

// const totalAmount =
//   localStorage.getItem("totalAmount") !== null
//     ? JSON.parse(localStorage.getItem("totalAmount"))
//     : 0;

// const totalQuantity =
//   localStorage.getItem("totalQuantity") !== null
//     ? JSON.parse(localStorage.getItem("totalQuantity"))
//     : 0;

const setItemFunc = (item, totalAmount, totalQuantity) => {
  localStorage.setItem("cartItems", JSON.stringify(item));
  localStorage.setItem("totalAmount", JSON.stringify(totalAmount));
  localStorage.setItem("totalQuantity", JSON.stringify(totalQuantity));
};

const initialState = {
  cartItems: [],
  totalQuantity: 0,
  totalAmount: 0,
  status: 'idle',
  error: null
};

const cartSlice = createSlice({
  name: "cart",
  initialState,


  reducers: {
    // ========= remove item ========

    removeItem(state, action) {
      const id = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === id);
      state.totalQuantity--;

      if (existingItem.quantity === 1) {
        state.cartItems = state.cartItems.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice =
          Number(existingItem.totalPrice) - Number(existingItem.price);
      }

      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0
      );

      setItemFunc(
        state.cartItems.map((item) => item),
        state.totalAmount,
        state.totalQuantity
      );
    },

    //============ delete item ===========

    deleteItem(state, action) {
      const id = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === id);

      if (existingItem) {
        state.cartItems = state.cartItems.filter((item) => item.id !== id);
        state.totalQuantity = state.totalQuantity - existingItem.quantity;
      }

      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0
      );
      setItemFunc(
        state.cartItems.map((item) => item),
        state.totalAmount,
        state.totalQuantity
      );
    },
    // [
    //     {
    //         "id": "1668325994370490369",
    //         "name": "Cassoulet",
    //         "userId": "1665740418865737729",
    //         "dishId": "1397861683434139649",
    //         "setmealId": null,
    //         "dishFlavor": "normal",
    //         "number": 2,
    //         "amount": 20.00,
    //         "image": "297ba9c7-8072-49b8-9afa-13595f1a7f8f.jpg",
    //         "createTime": "2023-06-12 19:34:48"
    //     }
    // id: newItem.id,
    //       name: newItem.name,
    //       image: newItem.image,
    //       price: newItem.price,
    //       quantity: 1,
    //       totalPrice: newItem.price,
    //       dishFlavor:
    // ]
    setCart(state, action) {
      const data = action.payload;
      state.cartItems = data.map(item => ({
        id: item.dishId,
        name: item.name,
        image: item.image,
        price: item.amount * 100,
        quantity: item.number,
        dishFlavor: item.dishFlavor,
        dishId: item.dishId,
        setmealId: item.setMealId,
        cartId: item.id,
      }))
      state.totalQuantity = state.cartItems.reduce((sum, item) => (sum += item.quantity), 0);
      state.totalAmount = state.cartItems.reduce((sum, item) => (sum += item.price * item.quantity), 0);
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCart.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = 'succeeded'
        // Add any fetched posts to the array
        const data = action.payload;
        state.cartItems = data.map(item => ({
          id: item.dishId,
          name: item.name,
          image: item.image,
          price: item.amount * 100,
          quantity: item.number,
          dishFlavor: item.dishFlavor,
          dishId: item.dishId,
          setmealId: item.setMealId,
          cartId: item.id,
        }))
        state.totalQuantity = state.cartItems.reduce((sum, item) => (sum += item.quantity), 0);
        state.totalAmount = state.cartItems.reduce((sum, item) => (sum += item.price * item.quantity), 0);
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      // add to cart
      .addCase(addToCart.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.status = 'succeeded'
        // Add any fetched posts to the array
        const data = action.payload;
        state.cartItems = data.map(item => ({
          id: item.dishId,
          name: item.name,
          image: item.image,
          price: item.amount * 100,
          quantity: item.number,
          dishFlavor: item.dishFlavor,
          dishId: item.dishId,
          setmealId: item.setMealId,
          cartId: item.id,
        }))
        state.totalQuantity = state.cartItems.reduce((sum, item) => (sum += item.quantity), 0);
        state.totalAmount = state.cartItems.reduce((sum, item) => (sum += item.price * item.quantity), 0);
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      // clear cart
      .addCase(clearCart.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(clearCart.fulfilled, (state, action) => {
        state.status = 'succeeded'
        // Add any fetched posts to the array
        const data = action.payload;
        state.cartItems = data.map(item => ({
          id: item.dishId,
          name: item.name,
          image: item.image,
          price: item.amount * 100,
          quantity: item.number,
          dishFlavor: item.dishFlavor,
          dishId: item.dishId,
          setmealId: item.setMealId,
          cartId: item.id,
        }))
        state.totalQuantity = state.cartItems.reduce((sum, item) => (sum += item.quantity), 0);
        state.totalAmount = state.cartItems.reduce((sum, item) => (sum += item.price * item.quantity), 0);
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      // remove by id
      .addCase(removeItemFromCart.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(removeItemFromCart.fulfilled, (state, action) => {
        state.status = 'succeeded'
        // Add any fetched posts to the array
        const data = action.payload;
        state.cartItems = data.map(item => ({
          id: item.dishId,
          name: item.name,
          image: item.image,
          price: item.amount * 100,
          quantity: item.number,
          dishFlavor: item.dishFlavor,
          dishId: item.dishId,
          setmealId: item.setMealId,
          cartId: item.id,
        }))
        state.totalQuantity = state.cartItems.reduce((sum, item) => (sum += item.quantity), 0);
        state.totalAmount = state.cartItems.reduce((sum, item) => (sum += item.price * item.quantity), 0);
      })
      .addCase(removeItemFromCart.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      // subtract by id
      .addCase(decItemFromCart.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(decItemFromCart.fulfilled, (state, action) => {
        state.status = 'succeeded'
        // Add any fetched posts to the array
        const data = action.payload;
        state.cartItems = data.map(item => ({
          id: item.dishId,
          name: item.name,
          image: item.image,
          price: item.amount * 100,
          quantity: item.number,
          dishFlavor: item.dishFlavor,
          dishId: item.dishId,
          setmealId: item.setMealId,
          cartId: item.id,
        }))
        state.totalQuantity = state.cartItems.reduce((sum, item) => (sum += item.quantity), 0);
        state.totalAmount = state.cartItems.reduce((sum, item) => (sum += item.price * item.quantity), 0);
      })
      .addCase(decItemFromCart.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
}); // end slice code

export const cartActions = cartSlice.actions;
export default cartSlice;

export const fetchCart = createAsyncThunk('cart/fetchCart', async () => {
  const response = await cartListApi({});
  return response.data;
})

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  // The payload creator receives the partial `{title, content, user}` object
  async (newItem) => {
    // We send the initial data to the fake API server
    let params = {
      amount: newItem.price / 100,
      dishFlavor: newItem.dishFlavor,
      dishId: undefined,
      setmealId: undefined,
      name: newItem.name,
      image: newItem.image
    }
    // check if menu or setmeal
    params.dishId = newItem.id;
    const response = await addCartApi(params);
    // The response includes the complete post object, including unique ID
    return response.data;
  }
)

export const clearCart = createAsyncThunk(
  'cart/clearCart',
  async () => {
    const response = await clearCartApi();
    return response.data;
  }
)

export const decItemFromCart = createAsyncThunk(
  'cart/decItemFromCart',
  async (id) => {
    const response = await subCartByIdApi(id);
    return response.data;
  }
)

export const removeItemFromCart = createAsyncThunk(
  'cart/removeItemFromCart',
  async (id) => {
    const response = await removeCartByIdApi(id);
    return response.data;
  }
)
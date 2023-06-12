import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { cartListApi, addCartApi } from "../../api/main";

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
    // =========== add item ============
    addItem(state, action) {
      // const newItem = action.payload;
      // const id = action.payload.id;
      // const dishFlavor = action.payload.dishFlavor;
      // const existingItem = state.cartItems.find((item) => item.id === id);
      // console.log('add:', newItem);

      // if (!existingItem) {
      //   console.log('absolute new!');
      //   state.cartItems.push({
      //     id: newItem.id,
      //     name: newItem.name,
      //     image: newItem.image,
      //     price: newItem.price,
      //     quantity: 1,
      //     totalPrice: newItem.price,
      //     dishFlavor: newItem.dishFlavor
      //   });
      //   state.totalQuantity++;

      // } else if (existingItem && (JSON.stringify(existingItem.dishFlavor) === JSON.stringify(dishFlavor))) {
      //   console.log('not new, same flavors!', existingItem, newItem);
      //   state.totalQuantity++;
      //   existingItem.quantity++;
      // } else {
      //   console.log('something else!', newItem);
      //   const value = JSON.parse(localStorage.getItem("cartItems"));
      //   let index = value.findIndex(s => s.id === existingItem.id);
      //   const newValue = {
      //     id: existingItem.id,
      //     name: existingItem.name,
      //     image: existingItem.image,
      //     price: existingItem.price,
      //     quantity: 1,
      //     totalPrice: existingItem.price,
      //     dishFlavor: dishFlavor
      //   }
      //   state.cartItems.splice(index, 1, newValue);
      //   state.totalQuantity = state.cartItems.reduce(
      //     (total, item) => total + Number(item.quantity),
      //     0
      //   );
      // }

      // state.totalAmount = state.cartItems.reduce(
      //   (total, item) => total + Number(item.price) * Number(item.quantity),
      //   0
      // );


      // setItemFunc(
      //   state.cartItems.map((item) => item),
      //   state.totalAmount,
      //   state.totalQuantity
      // );
    },



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
        }))
        state.totalQuantity = state.cartItems.reduce((sum, item) => (sum += item.quantity), 0);
        state.totalAmount = state.cartItems.reduce((sum, item) => (sum += item.price * item.quantity), 0);
      })
      .addCase(addToCart.rejected, (state, action) => {
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
  'posts/addToCart',
  // The payload creator receives the partial `{title, content, user}` object
  async (newItem) => {
    // We send the initial data to the fake API server
    // let params = {
    //             amount:item.price/100,//金额
    //             dishFlavor:item.dishFlavor,//口味  如果没有传undefined
    //             dishId:undefined,//菜品id
    //             setmealId:undefined,//套餐id
    //             name:item.name,
    //             image:item.image
    //           }
    //           if(Array.isArray(item.flavors)){//表示是菜品
    //             params.dishId = item.id
    //           }else{//表示套餐 套餐没有口味
    //             params.setmealId = item.id
    //           }
    //state.cartItems.push({
    //     id: newItem.id,
    //     name: newItem.name,
    //     image: newItem.image,
    //     price: newItem.price,
    //     quantity: 1,
    //     totalPrice: newItem.price,
    //     dishFlavor: newItem.dishFlavor
    //   });
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
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    hotel: [],
    loading : false
};

export const fetchHotel = createAsyncThunk("hotel/fetchHotel", async (dest) => {
    
const options = {
    method: 'GET',
    url: 'https://apidojo-booking-v1.p.rapidapi.com/properties/list',
    params: {
      offset: '0',
      arrival_date: '2022-12-16',
      departure_date: '2022-12-17',
      guest_qty: '1',
      dest_ids: dest,
      room_qty: '1',
      search_type: 'city',
      children_qty: '2',
      children_age: '5,7',
      search_id: 'none',
      price_filter_currencycode: 'USD',
      order_by: 'popularity',
      languagecode: 'en-us',
      travel_purpose: 'leisure'
    },
    headers: {
      'X-RapidAPI-Key': '9db0cf554emsh5a13baf728234f3p13c768jsnd40c48fe7168',
      'X-RapidAPI-Host': 'apidojo-booking-v1.p.rapidapi.com'
    }
  };
    const response = await axios.request(options);
    console.log(response.data);
    return response.data;
});

const hotelSlice = createSlice({
    name: "hotel",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchHotel.fulfilled, (state, action) => {
            console.log('did it');
            console.log(action.payload.result);
            return {...state,hotel:action.payload.result,loading:false}
        })
        .addCase(
            fetchHotel.pending,(state)=>{
                return {...state,loading:true}
            }
        )
    },
});


export default hotelSlice.reducer;
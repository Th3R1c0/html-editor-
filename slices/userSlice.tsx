import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Server } from "react-feather";

export const fetchCode = createAsyncThunk(
  "users/getAllUsers",
  async (link: string) => {
    //const response = await fetch(
    // "https://jsonplaceholder.typicode.com/users?_limit=5"
    //);
    
    const response  = await fetch(`api/${link}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            link: 'link'
          })
      })
    const data = await response.json();
    return data;
  } //fetch to nextjs api, which fetches prisma
);

export const createSharableLink = createAsyncThunk(
    "users/createLink", //editor needs to share code written to redux state 
    async () => {
        const response = await fetch(`api/create`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          })
        const data = await response.json();
        return data;
    }
)

const initialState = {
  promiseStates: {
    fetchCode: {
        loading: false, 
        response: []
        //error state?
    },
    createSharableLink: {
        loading: false,
        response: false,
    }
  },
  value: 10,
} as any;

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    increment: (state) => {
      state.value++;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCode.fulfilled, (state, action) => {
      state.promiseStates.fetchCode.loading = false;
      console.log(action.payload)
      //state.promiseStates.fetchCode.response = action.payload//push response from nextjs routes into state[]
    });

    builder.addCase(fetchCode.pending, (state, action) => {
      state.promiseStates.fetchCode.loading = true;
    
    });

    builder.addCase(createSharableLink.fulfilled, (state, action) => {
        state.promiseStates.createSharableLink.loading = false;
        console.log('payload receives link', action.payload)
        state.value = action.payload
        console.log('redux state updated with link', state.value)
        
        state.promiseStates.createSharableLink.response = action.payload//push response from nextjs routes into state[]
    })

    builder.addCase(createSharableLink.pending, (state, action) => {
        state.promiseStates.createSharableLink.loading = true; 
    })
  }
});

export const { increment } = settingsSlice.actions;

export default settingsSlice.reducer;
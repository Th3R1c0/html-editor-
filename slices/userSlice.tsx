import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Server } from "react-feather";

export const fetchCode = createAsyncThunk(
  "users/getAllUsers",
  async (link: string) => {
    //const response = await fetch(
    // "https://jsonplaceholder.typicode.com/users?_limit=5"
    //);
    
    const response  = await fetch(`api/${link}`, {
        method: "GET",
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
        loading: true, 
        response: false,
        //error state?
    },
    createSharableLink: {
        loading: false,
        response: false,
    }
  },
  value: 10,
  localCode: {
    html: '',
    css: '', 
    js: '',
  },
  isSharing: false, //{html, js, cs}
} as any;

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    updateLocalCode: (state, action) => {
      //console.log('THE PAYLOAD BES',action.payload.type)
      if (action.payload.type == 'html') {
        state.localCode.html = action.payload.payload
      }
      console.log('LOCALCODDE IS', state.localCode.html)
      
    },
    share: (state, action) => {
      state.isSharing = action.payload
      console.log('FROM SHARING, ACTION.PAYLOD IS', state.isSharing)
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCode.fulfilled, (state, action) => {
      state.promiseStates.fetchCode.loading = false;
      console.log('fetch code builder.fulfilled called with payload of: ',action.payload)
      state.promiseStates.fetchCode.response = {message: 'done'}//push response from nextjs routes into state[]
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

export const { updateLocalCode, share } = settingsSlice.actions;

export default settingsSlice.reducer;
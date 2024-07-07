import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
    user : user ? user : null,
    isError : false,
    errorMessage : '',
    loading : false,
    isSuccess : false,

};

export const registerUser = createAsyncThunk('auth/register', async (data, thunkAPI)=>{
    try{
        const response = await fetch('/api/users',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        
        const responseData = await response.json();
        if(response.ok){
              localStorage.setItem('user', JSON.stringify(responseData));
               return responseData;           
        }else{
            return thunkAPI.rejectWithValue(responseData);
        }
       
    }catch(err){
        return thunkAPI.rejectWithValue(err);
       
    }
});


// with axios
// export const register= createAsyncThunk('auth/register', async (data, thunkAPI)=>{
//     try{
//         const response = await axios.post('/api/users', data);
//         if(response.data){
//             localStorage.setItem('user', JSON.stringify(response.data));
//             return response.data;
//         }
//         else{
//             return thunkAPI.rejectWithValue(response.data);
//         }
//     }catch(err){
//         return thunkAPI.rejectWithValue(err.response.data);
//     }
// })


export const logout = createAsyncThunk('auth/logout', async (data, thunkAPI)=>{
    try{
        const response = await fetch('/api/users/logout',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        const responseData = await response.json();
        if(response.ok){
            localStorage.removeItem('user');
            return responseData;
        }else{
            return thunkAPI.rejectWithValue(responseData);
        }
          
    }catch(err){
        return thunkAPI.rejectWithValue(err);
    }
})


export const login = createAsyncThunk('auth/login', async (data, thunkAPI)=>{
    try{
        const response = await fetch('/api/users/login',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const responseData = await response.json();
        if(response.ok){
            localStorage.setItem('user', JSON.stringify(responseData));
            return responseData;
        }else{
            return thunkAPI.rejectWithValue(responseData);
        }
    }catch(err){
        return thunkAPI.rejectWithValue(err);
    }

})





export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        reset : (state) => {
            state.isError = false;
            state.errorMessage = '';
            state.loading = false;
            state.isSuccess = false;
        },
    },

    extraReducers: (builder)=>{
        builder
        .addCase(registerUser.pending, (state)=>{
            state.loading = true;
            state.isError = false;
            state.errorMessage = '';
            state.isSuccess = false;
        })
        .addCase(registerUser.fulfilled, (state, action)=>{
            state.user = action.payload;
            state.loading = false;
            state.isError = false;
            state.errorMessage = '';
            state.isSuccess = true;
        })
        .addCase(registerUser.rejected, (state, action)=>{
            state.isError = true;
            state.errorMessage = action.payload.message;
            state.loading = false;
            state.isSuccess = false;
        })
        .addCase(logout.fulfilled, (state)=>{
            state.user = null;
            state.loading = false;
            state.isError = false;
            state.errorMessage = '';

        })
        .addCase(login.pending, (state)=>{
            state.loading = true;
            state.isError = false;
            state.errorMessage = '';
            state.isSuccess = false;
        })
        .addCase(login.fulfilled, (state, action)=>{
            state.user = action.payload;
            state.loading = false;
            state.isError = false;
            state.errorMessage = '';
            state.isSuccess = true;
        })
        .addCase(login.rejected, (state, action)=>{
            state.isError = true;
            state.errorMessage = action.payload.message;
            state.loading = false;
            state.isSuccess = false;
        })

    }
});



export const {reset} = authSlice.actions;
export default authSlice.reducer;
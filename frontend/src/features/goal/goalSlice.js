import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { Axios } from "axios";



const initialState = {
    goals: [],
    isError: false,
    errorMessage: "",
    loading: false,
    isSuccess: false,
};

export const addGoals = createAsyncThunk("goals/addGoals", async (goalData, thunkAPI) => {
    try {

        const token = thunkAPI.getState().auth.user.token;
        console.log(thunkAPI.getState().auth.user);

        try {

            const response = await axios.post("/api/goals", goalData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const responseData = await response.data;
            if (response.data) {
                return responseData;
            } else {
                return thunkAPI.rejectWithValue(responseData);
            }
        } catch (err) {
            console.log(err);
            return thunkAPI.rejectWithValue(err);
        }

    } catch (err) {
        // console.log(err);
        return thunkAPI.rejectWithValue(err.message);
    }
});

export const getGoals = createAsyncThunk('goals/getGoals', async (_, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token
    try {
        console.log(token);
        console.log(`Bearer ${token}`)

        const response = await axios.get('/api/goals', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const data = response.data;
        if (response.data) {
            console.log(data);
            return data

        } else {
            return thunkAPI.rejectWithValue(err.message)
        }

    } catch (err) {
        console.log("token: " + token)
        console.log(err);
        return thunkAPI.rejectWithValue(err.message)
    }
});

export const deleteGoal = createAsyncThunk('goals/deleteGoal', async (goalId, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    try {
        const response = await axios.delete(`/api/goals/${goalId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const data = response.data;
        if (response.data) {
            return data;
        } else {
            console.log(err.message);
            return thunkAPI.rejectWithValue(err.message)
        }
    } catch (err) {
        console.log(err);
        return thunkAPI.rejectWithValue(err.message)
    }
})


export const goalSlice = createSlice({
    name: "goal",
    initialState,
    reducers:
    {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(addGoals.pending, (state) => {
                state.loading = true;
                state.isSuccess = false;
                state.isError = false;
            })
            .addCase(addGoals.fulfilled, (state, action) => {
                state.goals.push(action.payload);
                state.loading = false;
                state.isSuccess = true;
            })
            .addCase(addGoals.rejected, (state, action) => {
                state.errorMessage = action.payload ? action.payload.message : "Failed to add goal";
                state.isError = true;
                state.loading = false;
            })
            .addCase(getGoals.pending, (state) => {
                state.loading = true;
                state.isSuccess = false;
                state.isError = false;
            })
            .addCase(getGoals.fulfilled, (state, action) => {
                if (JSON.stringify(state.goals) !== JSON.stringify(action.payload)) {
                    state.goals = action.payload;
                    state.isSuccess = true;
                }
                state.loading = false;
            })
            .addCase(getGoals.rejected, (state, action) => {
                state.errorMessage = action.payload ? action.payload.message : "Failed to fetch goals";
                state.isError = true;
                state.loading = false;
            })
            .addCase(deleteGoal.pending, (state) => {
                state.loading = true;
                state.isSuccess = false;
                state.isError = false;
            })
            .addCase(deleteGoal.fulfilled, (state, action) => {
                state.goals = action.payload;
                state.loading = false;
                state.isSuccess = true;
            })
            .addCase(deleteGoal.rejected, (state, action) => {
                state.errorMessage = action.payload ? action.payload.message : "Failed to delete goal";
                state.isError = true;
                state.loading = false;
            })

    }
})

export default goalSlice.reducer;
export const { reset } = goalSlice.actions;
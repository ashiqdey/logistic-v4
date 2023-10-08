import { configureStore } from "@reduxjs/toolkit";

// reducers
// import settings from "./settings";
// import user from "./user";
// import ui from "./_ui";
import tracking from "./tracking";
import error from "./error";
import maps from "./maps";
import modal from "./modal";
import insight from "./insight";
import queries from "./queries";
import estimation from "./estimation";

const store = configureStore({
    reducer: {
        // settings,
        // user,
        // ui,
        tracking,
        error,
        maps,
        modal,
        insight,
        queries,
        estimation
    },
});

export default store;
"use client";
import React from "react";
import { Provider } from "react-redux";
import { store } from "../store/store";
import { SnackbarProvider } from "notistack";

interface Props {
    children: React.ReactNode;
}
const Providers = (props: Props) => {
    return (
        <SnackbarProvider maxSnack={3}>
        <Provider store={store}>{props.children}</Provider>
        </SnackbarProvider>
    );
};

export default Providers;
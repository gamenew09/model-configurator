import Roact from "@rbxts/roact";
import { StoreProvider } from "@rbxts/roact-rodux";
import { StudioFrame } from "@rbxts/roact-studio-components";
import store from "./../rodux";
import MainUI from "./uimain";
import ToolTip from "./tooltip";

export default (
    <StoreProvider store={store}>
        <MainUI />
    </StoreProvider>
);

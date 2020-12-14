/// <reference types="@rbxts/types/plugin" />

import { StudioDialogFrame } from "@rbxts/roact-studio-components";
import Ui from "./ui";
import store from "./rodux";

const Selection = game.GetService("Selection");

export {};

Selection.SelectionChanged.Connect(() => {
    const selections = Selection.Get().filter((inst) => inst.IsA("Configuration") || inst.IsA("Model"));
    let newSelection: Instance | undefined = undefined;
    if (selections.size() > 0) {
        newSelection = selections[0];

        if (newSelection.IsA("Model")) {
            newSelection = newSelection.FindFirstChildWhichIsA("Configuration");
        }
    }

    store.dispatch({
        type: "ChangeSelectionAction",
        newSelection: newSelection,
    });
});

const toolbar = plugin.CreateToolbar("Model Configurator");
const button = toolbar.CreateButton("Model Configurator Dock", "", "");

const minSize = new Vector2(200, 200);

const dialogFrame = new StudioDialogFrame(
    plugin,
    "ModelConfigurator",
    "Model Configurator",
    minSize,
    "ModelConfigurator",
);
dialogFrame.SetContents(Ui);

button.Click.Connect(() => {
    dialogFrame.Open();
});

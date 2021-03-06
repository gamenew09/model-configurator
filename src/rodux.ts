import Rodux from "@rbxts/rodux";

export interface MainStore {
    selection: Instance | undefined;
    tooltipText: string | undefined;
    tooltipPosition: Vector2;
    newPropertyVisible: boolean;
}

export const CHANGE_SELECTION_ACTION = "ChangeSelectionAction";
export const CHANGE_TOOLTIP_ACTION = "ChangeToolTip";
export const NEW_MOUSE_POSITION_ACTION = "NewMousePosition";
export const SET_NEW_PROPERTY_VISIBILITY_ACTION = "SetNewPropertyVisibilityAction";

export interface ChangeSelectionAction extends Rodux.Action<typeof CHANGE_SELECTION_ACTION> {
    newSelection: Instance | undefined;
}

export interface ChangeToolTipAction extends Rodux.Action<typeof CHANGE_TOOLTIP_ACTION> {
    newTooltip: string | undefined;
}

export interface NewMousePositionAction extends Rodux.Action<typeof NEW_MOUSE_POSITION_ACTION> {
    newPos: Vector2;
}

export interface SetNewPropertyVisibilityAction extends Rodux.Action<typeof SET_NEW_PROPERTY_VISIBILITY_ACTION> {
    visible: boolean;
}

export type MainStoreActions =
    | ChangeSelectionAction
    | ChangeToolTipAction
    | NewMousePositionAction
    | SetNewPropertyVisibilityAction;

const selectionReducer = Rodux.createReducer<MainStore, "selection", MainStoreActions>(undefined, {
    ChangeSelectionAction: (currentSelection, action) => action.newSelection,
    ChangeToolTip: (state, act) => state,
    NewMousePosition: (state, act) => state,
    SetNewPropertyVisibilityAction: (state, act) => state,
});

const tooltipTextReducer = Rodux.createReducer<MainStore, "tooltipText", MainStoreActions>(undefined, {
    ChangeSelectionAction: (state, action) => state,
    ChangeToolTip: (state, action) => action.newTooltip,
    NewMousePosition: (state, action) => state,
    SetNewPropertyVisibilityAction: (state, act) => state,
});

const tooltipPosReducer = Rodux.createReducer<MainStore, "tooltipPosition", MainStoreActions>(new Vector2(0, 0), {
    ChangeSelectionAction: (state, action) => state,
    ChangeToolTip: (state, action) => state,
    NewMousePosition: (state, action) => action.newPos,
    SetNewPropertyVisibilityAction: (state, act) => state,
});

const newPropertyVisibleReducer = Rodux.createReducer<MainStore, "newPropertyVisible", MainStoreActions>(false, {
    ChangeSelectionAction: (state, action) => state,
    ChangeToolTip: (state, action) => state,
    NewMousePosition: (state, action) => state,
    SetNewPropertyVisibilityAction: (state, act) => act.visible,
});

export const createChangeSelectionAction = (newSelection: Instance | undefined): ChangeSelectionAction => ({
    type: "ChangeSelectionAction",
    newSelection: newSelection,
});

export const createChangeTooltipAction = (newTooltip: string | undefined): ChangeToolTipAction => ({
    type: "ChangeToolTip",
    newTooltip: newTooltip,
});

export const createNewMousePos = (newMousePos: Vector2): NewMousePositionAction => ({
    type: "NewMousePosition",
    newPos: newMousePos,
});

export const createSetNewPropertyVisibilityAction = (visible: boolean): SetNewPropertyVisibilityAction => ({
    type: "SetNewPropertyVisibilityAction",
    visible: visible,
});

export default new Rodux.Store<MainStore, MainStoreActions, {}>(
    Rodux.combineReducers<MainStore, MainStoreActions>({
        selection: selectionReducer,
        tooltipText: tooltipTextReducer,
        tooltipPosition: tooltipPosReducer,
        newPropertyVisible: newPropertyVisibleReducer,
    }),
    {
        selection: undefined,
        tooltipText: undefined,
    },
    [Rodux.loggerMiddleware],
);

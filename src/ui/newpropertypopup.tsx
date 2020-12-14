import Roact from "@rbxts/roact";
import RoactRodux from "@rbxts/roact-rodux";
import {
    StudioFrame,
    StudioTextBox,
    StudioTextButton,
    StudioTextLabel,
    StudioToggle,
} from "@rbxts/roact-studio-components";
import { createSetNewPropertyVisibilityAction, MainStore, MainStoreActions } from "rodux";
import { getDefaultValueFromType, getEditableFromType, getEditableTypes } from "./editables";
import { defaultMetadata } from "./../metaprovider";
import Padding from "./padding";
import ToolTip from "./tooltip";

const studio = (settings().Studio as unknown) as { Theme: StudioTheme };
const theme = studio.Theme;

interface NewPropertyPopupStateProps {
    readonly Selection: Instance | undefined;
    readonly Visible: boolean;
}

interface NewPropertyPopupDispatchProps {
    updateVisiblity: (newVisibility: boolean) => void;
}

interface NewPropertyPopupProps extends NewPropertyPopupStateProps, NewPropertyPopupDispatchProps {}

interface NewPropertyPopupState {
    propName: string;
    selectedValueType?: ValueBase["ClassName"];
    newValue: unknown;
}

const NewPropertyPopup_ZIndex = 1000;

class NewPropertyPopup extends Roact.Component<NewPropertyPopupProps, NewPropertyPopupState> {
    constructor(p: RbxJsxProps & NewPropertyPopupProps) {
        super(p);

        this.state = {
            propName: "",
            newValue: undefined,
        };
    }

    protected getEditableElementsList(): Roact.Element[] {
        const eles: Roact.Element[] = [];
        const editables = getEditableTypes();

        let i = 0;
        for (const type of editables) {
            eles.push(
                <StudioTextButton
                    Text={type}
                    Width={new UDim(0.2, 0)}
                    BackgroundColorEnum={
                        this.state.selectedValueType === type
                            ? Enum.StudioStyleGuideColor.CheckedFieldBackground
                            : Enum.StudioStyleGuideColor.Button
                    }
                    Events={{
                        MouseButton1Click: () => {
                            this.setState({
                                selectedValueType: type,
                            });
                        },
                    }}
                />,
            );
            eles.push(<Padding Amount={new UDim(0, 5)} Direction={Enum.FillDirection.Horizontal} />);
            i++;
        }
        return eles;
    }

    protected getEditableValueFrame(): Roact.Element | undefined {
        const type = this.state.selectedValueType;
        if (type === undefined) {
            return undefined;
        }

        return (
            <frame
                Key={"EditableField"}
                Size={new UDim2(1, 0, StudioTextBox.HeightUDim.Scale, StudioTextBox.HeightUDim.Offset + 10)}
                BackgroundTransparency={1}
                LayoutOrder={2}
            >
                <uilistlayout
                    FillDirection={Enum.FillDirection.Horizontal}
                    HorizontalAlignment={Enum.HorizontalAlignment.Left}
                    VerticalAlignment={Enum.VerticalAlignment.Center}
                    SortOrder={Enum.SortOrder.LayoutOrder}
                />

                <StudioTextLabel
                    Key={"FieldLabel"}
                    LayoutOrder={0}
                    Text="Value"
                    TextXAlignment={Enum.TextXAlignment.Left}
                    Width={new UDim(0.5, 0)}
                />

                {getEditableFromType(
                    type,
                    getDefaultValueFromType(type),
                    (newVal) => {
                        this.setState({
                            newValue: newVal,
                        });
                    },
                    defaultMetadata,
                )}
            </frame>
        );
    }

    render(): Roact.Element {
        if (this.props.Selection === undefined && this.props.Visible === true) {
            this.props.updateVisiblity(false);
        }

        return (
            <frame
                Key="NewPropertyPopup"
                AnchorPoint={new Vector2(0, 0)}
                BackgroundColor3={theme.GetColor(Enum.StudioStyleGuideColor.MainBackground)}
                BorderColor3={theme.GetColor(Enum.StudioStyleGuideColor.Border)}
                BorderMode={Enum.BorderMode.Inset}
                BorderSizePixel={1}
                ClipsDescendants={true}
                LayoutOrder={0}
                Position={new UDim2(0, 0, 0, 0)}
                Rotation={0}
                Size={new UDim2(1, 0, 1, 0)}
                Visible={this.props.Visible}
            >
                <uilistlayout
                    FillDirection={Enum.FillDirection.Vertical}
                    HorizontalAlignment={Enum.HorizontalAlignment.Center}
                    SortOrder={Enum.SortOrder.LayoutOrder}
                    VerticalAlignment={Enum.VerticalAlignment.Top}
                />

                <StudioTextLabel
                    Key="FrameTitle"
                    LayoutOrder={0}
                    Text={"Create New Property"}
                    TextXAlignment={Enum.TextXAlignment.Center}
                    Width={new UDim(0.85, 0)}
                />

                <frame
                    BackgroundTransparency={1}
                    Size={new UDim2(0.65, 0, StudioTextLabel.HeightUDim.Scale, StudioTextLabel.HeightUDim.Offset)}
                    LayoutOrder={1}
                >
                    <uilistlayout
                        FillDirection={Enum.FillDirection.Horizontal}
                        HorizontalAlignment={Enum.HorizontalAlignment.Center}
                        SortOrder={Enum.SortOrder.LayoutOrder}
                        VerticalAlignment={Enum.VerticalAlignment.Top}
                    />

                    <StudioTextLabel
                        Key="Name_Label"
                        LayoutOrder={0}
                        Text={"Name"}
                        TextXAlignment={Enum.TextXAlignment.Center}
                        Width={new UDim(0.85, 0)}
                    />

                    <StudioTextBox
                        Key={"Name_TextBox"}
                        LayoutOrder={1}
                        PlaceholderText="Name of Property"
                        Width={new UDim(0.5, 0)}
                        Visible={true}
                        Text={this.state.propName}
                        ClearTextOnFocus={false}
                        InputValidationCallback={(val) => val.size() > 0}
                        Events={{
                            ValueChanged: (actualInstance: TextBox, newValue: string) => {
                                this.setState({
                                    propName: newValue,
                                });
                            },
                        }}
                    />
                </frame>

                {this.getEditableValueFrame()}

                <frame
                    BackgroundTransparency={1}
                    Size={new UDim2(0.65, 0, StudioTextButton.HeightUDim.Scale, StudioTextButton.HeightUDim.Offset * 5)}
                    LayoutOrder={1}
                >
                    <uilistlayout
                        FillDirection={Enum.FillDirection.Horizontal}
                        HorizontalAlignment={Enum.HorizontalAlignment.Center}
                        SortOrder={Enum.SortOrder.LayoutOrder}
                        VerticalAlignment={Enum.VerticalAlignment.Top}
                    />
                    {this.getEditableElementsList()}
                </frame>

                <frame
                    Key="DialogButtons"
                    Size={new UDim2(1, 0, StudioTextButton.HeightUDim.Scale, StudioTextButton.HeightUDim.Offset)}
                    BackgroundTransparency={1}
                    LayoutOrder={99}
                >
                    <uilistlayout
                        FillDirection={Enum.FillDirection.Horizontal}
                        HorizontalAlignment={Enum.HorizontalAlignment.Center}
                        SortOrder={Enum.SortOrder.LayoutOrder}
                        VerticalAlignment={Enum.VerticalAlignment.Top}
                    />

                    <StudioTextButton
                        Width={new UDim(0.4, 0)}
                        Text="Create"
                        Events={{
                            MouseButton1Click: () => {
                                if (this.state.selectedValueType !== undefined && this.state.propName.size() > 0) {
                                    const selection = this.props.Selection!;
                                    assert(selection !== undefined, "Selection is undefined.");

                                    const newVal = new Instance(this.state.selectedValueType);
                                    newVal.Name = this.state.propName;
                                    newVal.Parent = selection;
                                    newVal.Value = this.state.newValue;

                                    this.props.updateVisiblity(false);

                                    this.setState({
                                        selectedValueType: Roact.None,
                                        newValue: Roact.None,
                                        propName: "",
                                    });
                                }
                            },
                        }}
                    />
                    <Padding Direction={Enum.FillDirection.Horizontal} Amount={new UDim(0.1, 0)} />
                    <StudioTextButton
                        Width={new UDim(0.4, 0)}
                        Text="Cancel"
                        Events={{
                            MouseButton1Click: () => {
                                this.props.updateVisiblity(false);

                                this.setState({
                                    selectedValueType: Roact.None,
                                    newValue: Roact.None,
                                    propName: "",
                                });
                            },
                        }}
                    />
                </frame>
            </frame>
        );
    }
}

const mapStateToProps = (state: MainStore): NewPropertyPopupStateProps => ({
    Visible: state.newPropertyVisible,
    Selection: state.selection,
});
const mapDispatchToProps = (dispatch: Rodux.Dispatch<MainStoreActions>): NewPropertyPopupDispatchProps => ({
    updateVisiblity: (newVisibility: boolean) => {
        dispatch(createSetNewPropertyVisibilityAction(newVisibility));
    },
});

export default RoactRodux.connect(mapStateToProps, mapDispatchToProps)(NewPropertyPopup);

import Roact from "@rbxts/roact";
import RoactRodux from "@rbxts/roact-rodux";
import { StudioTextLabel } from "@rbxts/roact-studio-components";
import metaprovider from "metaprovider";
import { MainStore, MainStoreActions } from "rodux";
import EditableField from "./editable";

const studio = (settings().Studio as unknown) as { Theme: StudioTheme };
const theme = studio.Theme;

interface ConfiguratorStateProps {
    readonly selection: Instance | undefined;
}

interface ConfiguratorDispatchProps {}

interface ConfiguratorProps extends ConfiguratorStateProps, ConfiguratorDispatchProps {}

class ConfiguratorPanel extends Roact.Component<ConfiguratorProps, {}> {
    constructor(props: ConfiguratorProps) {
        super(props);
    }

    render(): Roact.Element {
        // TODO: Add a settings button that let's you define schemas for multiple configuration folders (then they can be referenced inside of a folder just by creating a StringValue by the name of $schema)
        // TODO: Add a button to create a new value object
        const listOfElements: Roact.Element[] = [
            <uilistlayout
                FillDirection={Enum.FillDirection.Vertical}
                HorizontalAlignment={Enum.HorizontalAlignment.Center}
                SortOrder={Enum.SortOrder.LayoutOrder}
                VerticalAlignment={Enum.VerticalAlignment.Top}
            />,
        ];

        const selection = this.props.selection;
        if (selection !== undefined) {
            const children = selection.GetChildren();
            for (const child of children) {
                if (child.IsA("ValueBase")) {
                    const meta = metaprovider.getMetadataFromValue(child);
                    listOfElements.push(<EditableField Label={child.Name} Meta={meta} ValueInstance={child} />);
                }
            }
        } else {
            listOfElements.push(
                <StudioTextLabel
                    Key="FrameTitle"
                    LayoutOrder={0}
                    Text={"There is no applicable selection to configure."}
                    TextXAlignment={Enum.TextXAlignment.Center}
                    Width={new UDim(0.85, 0)}
                />,
            );
        }

        return (
            <frame
                Key={(this.props as RbxJsxProps).Key + "_Frame"}
                AnchorPoint={new Vector2(0, 0)}
                BackgroundColor3={theme.GetColor(Enum.StudioStyleGuideColor.MainBackground)}
                BorderColor3={theme.GetColor(Enum.StudioStyleGuideColor.Border)}
                BorderMode={Enum.BorderMode.Inset}
                BorderSizePixel={0}
                ClipsDescendants={true}
                LayoutOrder={1}
                Position={new UDim2(0, 0, 0, 0)}
                Rotation={0}
                Size={new UDim2(1, 0, 0.5, 0)}
                AutomaticSize={Enum.AutomaticSize.Y}
                Visible={true}
            >
                {listOfElements}
            </frame>
        );
    }
}

const mapStateToProps = (state: MainStore): ConfiguratorStateProps => ({
    selection: state.selection,
});
const mapDispatchToProps = (dispatch: Rodux.Dispatch<MainStoreActions>): ConfiguratorDispatchProps => ({});

export default RoactRodux.connect(mapStateToProps, mapDispatchToProps)(ConfiguratorPanel);

import Roact from "@rbxts/roact";
import { StudioFrame, StudioTextLabel, StudioToggle } from "@rbxts/roact-studio-components";
import ConfiguratorPanel from "./configurator";
import ToolTip from "./tooltip";

const studio = (settings().Studio as unknown) as { Theme: StudioTheme };
const theme = studio.Theme;

export default class MainUI extends Roact.Component<{}, {}> {
    render(): Roact.Element {
        return (
            <frame
                Key="MainFrame"
                AnchorPoint={new Vector2(0, 0)}
                BackgroundColor3={theme.GetColor(Enum.StudioStyleGuideColor.MainBackground)}
                BorderColor3={theme.GetColor(Enum.StudioStyleGuideColor.Border)}
                BorderMode={Enum.BorderMode.Inset}
                BorderSizePixel={0}
                ClipsDescendants={true}
                LayoutOrder={0}
                Position={new UDim2(0, 0, 0, 0)}
                Rotation={0}
                Size={new UDim2(1, 0, 1, 0)}
                Visible={true}
            >
                <ToolTip />
                <frame BackgroundTransparency={1} Size={new UDim2(1, 0, 1, 0)} Position={new UDim2()}>
                    <uilistlayout
                        FillDirection={Enum.FillDirection.Vertical}
                        HorizontalAlignment={Enum.HorizontalAlignment.Center}
                        SortOrder={Enum.SortOrder.LayoutOrder}
                        VerticalAlignment={Enum.VerticalAlignment.Top}
                    />

                    <StudioTextLabel
                        Key="FrameTitle"
                        LayoutOrder={0}
                        Text={"Model Configurator"}
                        TextXAlignment={Enum.TextXAlignment.Center}
                        Width={new UDim(0.85, 0)}
                    />

                    <ConfiguratorPanel />
                </frame>
            </frame>
        );
    }
}

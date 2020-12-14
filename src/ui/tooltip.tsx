import Roact from "@rbxts/roact";
import RoactRodux from "@rbxts/roact-rodux";
import { StudioFrame, StudioTextLabel, StudioToggle } from "@rbxts/roact-studio-components";
import { RunService, TextService } from "@rbxts/services";
import { MainStore, MainStoreActions } from "rodux";

const studio = (settings().Studio as unknown) as { Theme: StudioTheme };
const theme = studio.Theme;

interface ToolTipStateProps {
    readonly tooltipText: string | undefined;
    readonly tooltipPos: Vector2;
}

interface ToolTipDispatchProps {}

interface ToolTipProps extends ToolTipStateProps, ToolTipDispatchProps {}

const MAX_TOOLTIP_WIDTH = 500;

class ToolTip extends Roact.Component<ToolTipProps> {
    constructor(p: ToolTipProps & RbxJsxProps) {
        super(p);
    }

    protected isTooltipVisible(): boolean {
        return this.props.tooltipText !== undefined && this.props.tooltipText.size() > 0;
    }

    render(): Roact.Element {
        print(`update ${this.props.tooltipText !== undefined && this.props.tooltipText.size() > 0}`);

        const pos = this.props.tooltipPos.add(new Vector2(0, 0));

        const size = TextService.GetTextSize(
            this.props.tooltipText ?? "",
            10,
            Enum.Font.Arial,
            new Vector2(MAX_TOOLTIP_WIDTH, 100000),
        );

        return (
            <textlabel
                ZIndex={100000}
                Font={Enum.Font.Arial}
                Key={"Tooltip"}
                TextSize={10}
                AnchorPoint={new Vector2(0, 1)}
                Text={this.props.tooltipText}
                Visible={this.isTooltipVisible()}
                Size={new UDim2(0, size.X, 0, size.Y)}
                Position={new UDim2(0, pos.X, 0, pos.Y)}
                TextWrapped={true}
            />
        );
    }

    willUnmount(): void {
        //this.state.tickConnection.Disconnect();
    }
}

const mapStateToProps = (state: MainStore): ToolTipStateProps => ({
    tooltipText: state.tooltipText,
    tooltipPos: state.tooltipPosition,
});
const mapDispatchToProps = (dispatch: Rodux.Dispatch<MainStoreActions>): ToolTipDispatchProps => ({});

export default RoactRodux.connect(mapStateToProps, mapDispatchToProps)(ToolTip);

import Roact from "@rbxts/roact";

interface EditableProps {
    Key?: string | number;
    Amount: UDim;
    Direction: Enum.FillDirection;
}

interface EditableState {}

export default class Padding extends Roact.Component<EditableProps, EditableState> {
    constructor(p: EditableProps) {
        super(p);
    }

    render(): Roact.Element {
        const padding = this.props.Amount;
        let size = new UDim2();

        switch (this.props.Direction) {
            case Enum.FillDirection.Horizontal:
                size = new UDim2(padding.Scale, padding.Offset, 0, 1);
                break;
            case Enum.FillDirection.Vertical:
                size = new UDim2(0, 1, padding.Scale, padding.Offset);
                break;
            default:
                error("Padding.Direction is invalid in Roact Element.");
        }

        return <frame Size={size} BackgroundTransparency={1} />;
    }
}

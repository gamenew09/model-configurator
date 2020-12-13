import Roact from "@rbxts/roact";
import { StudioTextBox, StudioToggle } from "@rbxts/roact-studio-components";
import { IEditableMeta } from "metaprovider";

interface EditableProps {
    ValueInstance: BoolValue;
}

interface EditableState {
    currentValue: boolean;
}

export class BoolEditable extends Roact.Component<EditableProps, EditableState> {
    constructor(p: RbxJsxProps & EditableProps) {
        super(p);

        this.state = {
            currentValue: p.ValueInstance.Value,
        };
    }

    render(): Roact.Element {
        return (
            // TODO: Convert from StudioToggle to custom toggle button (the StudioToggle button has broken visuals but works)
            <StudioToggle
                Key={"BoolEditable_" + this.props.ValueInstance.Name}
                IsOnByDefault={this.state.currentValue}
                LayoutOrder={1}
                Active={true}
                Events={{
                    Toggled: (isOn) => {
                        this.setState({
                            currentValue: isOn,
                        });

                        this.props.ValueInstance.Value = isOn;
                    },
                }}
            />
        );
    }
}

function factory(value: ValueBase, meta: IEditableMeta): Roact.Element {
    assert(value.ClassName === "BoolValue", "value passed must be a BoolValue");

    return <BoolEditable ValueInstance={value as BoolValue} />;
}

export default {
    Type: "BoolValue",
    Factory: factory,
} as {
    Type: ValueBase["ClassName"];
    Factory: (value: ValueBase, meta: IEditableMeta) => Roact.Element;
};

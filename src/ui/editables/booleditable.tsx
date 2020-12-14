import Roact from "@rbxts/roact";
import { StudioTextBox, StudioToggle } from "@rbxts/roact-studio-components";
import { IEditableMeta } from "metaprovider";

interface EditableProps {
    StartValue: boolean;
    OnValueChanged: (newVal: boolean) => void;
}

interface EditableState {
    currentValue: boolean;
}

export class BoolEditable extends Roact.Component<EditableProps, EditableState> {
    constructor(p: RbxJsxProps & EditableProps) {
        super(p);

        this.state = {
            currentValue: p.StartValue,
        };
    }

    render(): Roact.Element {
        return (
            // TODO: Convert from StudioToggle to custom toggle button (the StudioToggle button has broken visuals but works)
            <StudioToggle
                Key={"BoolEditable"}
                IsOnByDefault={this.state.currentValue}
                LayoutOrder={1}
                Active={true}
                Events={{
                    Toggled: (isOn) => {
                        this.setState({
                            currentValue: isOn,
                        });

                        this.props.OnValueChanged(isOn);
                    },
                }}
            />
        );
    }
}

function factory(initialValue: boolean, onValueChanged: (newVal: unknown) => void, meta: IEditableMeta): Roact.Element {
    assert(typeIs(initialValue, "boolean"), "initialValue must be a boolean");

    return <BoolEditable StartValue={initialValue} OnValueChanged={onValueChanged} />;
}

export default {
    Type: "BoolValue",
    Factory: factory,
} as {
    Type: ValueBase["ClassName"];
    Factory: (initialValue: unknown, onValueChanged: (newVal: unknown) => void, meta: IEditableMeta) => Roact.Element;
};

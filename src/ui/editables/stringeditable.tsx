import Roact from "@rbxts/roact";
import { StudioTextBox } from "@rbxts/roact-studio-components";
import { IEditableMeta } from "metaprovider";

interface EditableProps {
    StartValue: string;
    OnValueChanged: (newVal: string) => void;
}

interface EditableState {
    textBoxValue: string;
}

export class StringEditable extends Roact.Component<EditableProps, EditableState> {
    constructor(p: RbxJsxProps & EditableProps) {
        super(p);

        this.state = {
            textBoxValue: p.StartValue,
        };
    }

    render(): Roact.Element {
        return (
            <StudioTextBox
                Key={"StringEditable"}
                LayoutOrder={1}
                PlaceholderText=""
                Width={new UDim(0.5, 0)}
                Visible={true}
                Text={this.state.textBoxValue}
                ClearTextOnFocus={false}
                Events={{
                    ValueChanged: (actualInstance: TextBox, newValue: string) => {
                        this.setState({
                            textBoxValue: newValue,
                        });

                        this.props.OnValueChanged(newValue);
                    },
                }}
            />
        );
    }
}

function factory(initialValue: string, onValueChanged: (newVal: unknown) => void, meta: IEditableMeta): Roact.Element {
    assert(typeIs(initialValue, "string"), "value passed must be a string");

    return <StringEditable StartValue={initialValue} OnValueChanged={onValueChanged} />;
}

export default {
    Type: "StringValue",
    DefaultValue: "",
    Factory: factory,
} as {
    Type: ValueBase["ClassName"];
    DefaultValue: string;
    Factory: (initialValue: unknown, onValueChanged: (newVal: unknown) => void, meta: IEditableMeta) => Roact.Element;
};

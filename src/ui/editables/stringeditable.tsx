import Roact from "@rbxts/roact";
import { StudioTextBox } from "@rbxts/roact-studio-components";
import { IEditableMeta } from "metaprovider";

interface EditableProps {
    ValueInstance: StringValue;
}

interface EditableState {
    textBoxValue: string;
    lostFocus: boolean;
}

export class StringEditable extends Roact.Component<EditableProps, EditableState> {
    constructor(p: RbxJsxProps & EditableProps) {
        super(p);

        this.state = {
            textBoxValue: p.ValueInstance.Value,
            lostFocus: false,
        };
    }

    render(): Roact.Element {
        return (
            <StudioTextBox
                Key={"StringEditable_" + this.props.ValueInstance.Name}
                LayoutOrder={1}
                PlaceholderText=""
                Width={new UDim(0.5, 0)}
                Visible={true}
                Text={this.state.textBoxValue}
                ClearTextOnFocus={false}
                Events={{
                    ValueChanged: (actualInstance: TextBox, newValue: string) => {
                        if (this.state.lostFocus) {
                            this.props.ValueInstance.Value = newValue;
                        }

                        this.setState({
                            textBoxValue: newValue,
                            lostFocus: false,
                        });
                    },
                    FocusLost: (actualInstance: TextBox, enterPressed: boolean, causer: Instance) => {
                        this.setState({
                            lostFocus: true,
                        });
                    },
                }}
            />
        );
    }
}

function factory(value: ValueBase, meta: IEditableMeta): Roact.Element {
    assert(value.ClassName === "StringValue", "value passed must be a StringValue");

    return <StringEditable ValueInstance={value as StringValue} />;
}

export default {
    Type: "StringValue",
    Factory: factory,
} as {
    Type: ValueBase["ClassName"];
    Factory: (value: ValueBase, meta: IEditableMeta) => Roact.Element;
};

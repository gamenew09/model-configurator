import Roact from "@rbxts/roact";
import { StudioScrollingFrame, StudioTextLabel } from "@rbxts/roact-studio-components";
import { TextService } from "@rbxts/services";
import { IEditableMeta } from "metaprovider";
import store, { createChangeTooltipAction, createNewMousePos } from "rodux";
import { resolveEditable } from "./editables";

export interface EditableFieldProps {
    Label: string;
    ValueInstance: ValueBase;
    Meta: IEditableMeta;
    LayoutOrder: number;
}

export interface EditableFieldState {}

export default class EditableField extends Roact.Component<EditableFieldProps, EditableFieldState> {
    render(): Roact.Element {
        const textLabelHeight = StudioTextLabel.HeightUDim;
        return (
            <frame
                Key={"EditableField"}
                Size={new UDim2(1, 0, textLabelHeight.Scale, textLabelHeight.Offset + 10)}
                BackgroundTransparency={1}
                LayoutOrder={this.props.LayoutOrder}
                Event={{
                    MouseEnter: (f, x, y) => {
                        print("enter");
                        if (this.props.Meta.Description !== undefined) {
                            store.dispatch(createChangeTooltipAction(this.props.Meta.Description));
                            store.dispatch(createNewMousePos(new Vector2(x, y)));
                        }
                    },
                    MouseMoved: (f, x, y) => {
                        store.dispatch(createNewMousePos(new Vector2(x, y)));
                    },
                    MouseLeave: (f, _, __) => {
                        if (this.props.Meta.Description !== undefined) {
                            store.dispatch(createChangeTooltipAction(undefined));
                        }
                    },
                }}
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
                    Text={this.props.Label}
                    TextXAlignment={Enum.TextXAlignment.Left}
                    Width={new UDim(0.5, 0)}
                />

                {resolveEditable(this.props.ValueInstance, this.props.Meta)}
            </frame>
        );
    }
}

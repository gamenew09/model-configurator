import Roact from "@rbxts/roact";
import { IEditableMeta } from "metaprovider";
import { t } from "@rbxts/t";

type ValueChangedCallback = (newVal: unknown) => void;

type EditableFactory = (
    initialValue: unknown,
    onValueChanged: ValueChangedCallback,
    meta: IEditableMeta,
) => Roact.Element;

const map = new Map<ValueBase["ClassName"], EditableData>();

// HACK: Go through script children and attempt to load each editable dynamically.

interface EditableData {
    Type: ValueBase["ClassName"];
    DefaultValue: unknown;
    Factory: EditableFactory;
}

const isEditableDataInterface = t.interface({
    Type: t.string,
    Factory: t.callback,
});

interface EditableModuleScriptReturn {
    default: EditableData;
}
const isEditableModuleScriptReturn = t.interface({
    default: isEditableDataInterface,
});

for (const factoryModuleScript of script.GetChildren()) {
    if (factoryModuleScript.IsA("ModuleScript")) {
        const ret = require(factoryModuleScript) as EditableModuleScriptReturn;
        assert(isEditableModuleScriptReturn(ret), `ModuleScript ${factoryModuleScript} is not setup properly.`);
        const data = ret.default;

        if (map.has(data.Type)) {
            warn(`${data.Type} already exists in the editable map, did you mean to do this?`);
        }
        map.set(data.Type, data);
        print(`Added ${factoryModuleScript.Name} to editable factory list as ${data.Type}`);
    }
}

//

export function getEditableTypes(): ValueBase["ClassName"][] {
    const types: ValueBase["ClassName"][] = [];
    map.forEach((v, k) => {
        types.push(k);
    });
    return types;
}

export function getDefaultValueFromType(typeName: ValueBase["ClassName"]): unknown {
    const data = map.get(typeName);
    if (data !== undefined) {
        return data.DefaultValue;
    } else {
        warn(`Could not find DefaultValue for ${typeName}`);
        return undefined;
    }
}

export function getEditableFromType(
    typeName: ValueBase["ClassName"],
    initialValue: unknown,
    onValueChanged: ValueChangedCallback,
    meta: IEditableMeta,
): Roact.Element | undefined {
    const data = map.get(typeName);
    if (data !== undefined) {
        return data.Factory(initialValue, onValueChanged, meta);
    } else {
        warn(`Could not find editable for ${typeName}`);
        return undefined;
    }
}

export function resolveEditable(value: ValueBase, meta: IEditableMeta): Roact.Element | undefined {
    return getEditableFromType(
        value.ClassName,
        value.Value,
        (newVal) => {
            value.Value = newVal;
        },
        meta,
    );
}

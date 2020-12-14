import Roact from "@rbxts/roact";
import { IEditableMeta } from "metaprovider";
import { t } from "@rbxts/t";

type EditableFactory = (value: ValueBase, meta: IEditableMeta) => Roact.Element;

const map = new Map<ValueBase["ClassName"], EditableFactory>();

// HACK: Go through script children and attempt to load each editable dynamically.

interface EditableData {
    Type: ValueBase["ClassName"];
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
        map.set(data.Type, data.Factory);
        print(`Added ${factoryModuleScript.Name} to editable factory list as ${data.Type}`);
    }
}

//

export default function resolveEditable(value: ValueBase, meta: IEditableMeta): Roact.Element | undefined {
    const factory = map.get(value.ClassName);
    if (factory !== undefined) {
        return factory(value, meta);
    } else {
        warn(`Could not find editable for ${value.ClassName}`);
        return undefined;
    }
}

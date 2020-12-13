export interface IEditableMeta {
    Description?: string;
}

export interface IMetaProvider {
    getMetadataFromValue(v: ValueBase): IEditableMeta | undefined;
}

class ValueMetaProvider implements IMetaProvider {
    getMetadataFromValue(v: ValueBase): IEditableMeta {
        let description: string | undefined = undefined;

        const descValueInst = v.FindFirstChild("_Description");
        if (descValueInst !== undefined && descValueInst.IsA("StringValue")) {
            description = descValueInst.Value;
        }

        return {
            Description: description,
        };
    }
}

const providers: IMetaProvider[] = [];

providers.push(new ValueMetaProvider());

export default {
    getMetadataFromValue: (v: ValueBase): IEditableMeta => {
        for (const provider of providers) {
            const meta = provider.getMetadataFromValue(v);
            if (meta !== undefined) {
                return meta;
            }
        }

        return {
            Description: undefined,
        };
    },
};

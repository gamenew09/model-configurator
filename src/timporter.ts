// UGLY HACK: For now I need to work around the bad import that roblox-ts generates for @rbxts/t.

import { t as tCheck } from "@rbxts/t";

const tModuleScript = script.Parent?.FindFirstChild("include")
    ?.FindFirstChild("node_modules")
    ?.FindFirstChild("t")
    ?.FindFirstChild("lib")
    ?.FindFirstChild("ts");
if (tModuleScript === undefined || !tModuleScript.IsA("ModuleScript")) {
    error("Could not find t.");
}

const t: tCheck = (require(tModuleScript) as { t: tCheck }).t;

export { t };

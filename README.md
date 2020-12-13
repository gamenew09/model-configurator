# Model Configurator Plugin
A plugin that helps designers configure properties in a Configuration folder (or in a Model) quickly.

Currently a work in progress but this plugin should currently function with some features missing, namely:

- Only two types of Value objects have been implemented `BoolValue` and `StringValue`.
- The toggle buttons displayed are incorrectly displayed
- You cannot quickly add Value objects into the Configuration folder.
- While you can add a description to a Value (by adding a `_Description` StringValue to the Value), there is no easy way to have many different Configuration folders use the same `_Description` values as each other.

# Getting the Plugin
Currently you have to [build the plugin manually](#build_plugin_file). Eventually I will release this plugin onto the Roblox Studio Plugin Marketplace and have automated plugin files be created for every new release [here on GitHub](https://github.com/gamenew09/model-configurator/releases).

# Build Plugin File
Make sure [rojo](https://github.com/rojo-rbx/rojo) is installed, either through [foreman](https://github.com/Roblox/foreman) or another method. Then run `rojo build --output modelconfigurator.rbxmx` in a Command Prompt/Terminal instance. It'll create a model file by the name of `modelconfigurator.rbxmx` which you can then put in your Plugins folder in Roblox Studio.

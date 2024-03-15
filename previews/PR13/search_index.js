var documenterSearchIndex = {"docs":
[{"location":"api/#API","page":"API","title":"API","text":"","category":"section"},{"location":"api/#Modules","page":"API","title":"Modules","text":"","category":"section"},{"location":"api/","page":"API","title":"API","text":"Order = [:module]","category":"page"},{"location":"api/#Types-and-constants","page":"API","title":"Types and constants","text":"","category":"section"},{"location":"api/","page":"API","title":"API","text":"Order = [:type, :constant]","category":"page"},{"location":"api/#Functions-and-macros","page":"API","title":"Functions and macros","text":"","category":"section"},{"location":"api/","page":"API","title":"API","text":"Order = [:macro, :function]","category":"page"},{"location":"api/#Documentation","page":"API","title":"Documentation","text":"","category":"section"},{"location":"api/","page":"API","title":"API","text":"Modules = [LegendDataManagement]\nOrder = [:module, :type, :constant, :macro, :function]","category":"page"},{"location":"api/#LegendDataManagement.AbstractSetupData","page":"API","title":"LegendDataManagement.AbstractSetupData","text":"abstract type AbstractSetupData\n\nSubtypes wrap SetupConfig for specific experiments.\n\n\n\n\n\n","category":"type"},{"location":"api/#LegendDataManagement.DataCategory","page":"API","title":"LegendDataManagement.DataCategory","text":"struct DataCategory <: DataSelector\n\nRepresents a LEGEND data category (related to a DAQ/measuring mode) like \"cal\" or \"phy\".\n\nExample:\n\ncategory = DataCategory(:cal)\ncategory.label == :cal\nstring(category) == \"cal\"\nDataCategory(\"cal\") == category\n\n\n\n\n\n","category":"type"},{"location":"api/#LegendDataManagement.DataPeriod","page":"API","title":"LegendDataManagement.DataPeriod","text":"struct DataPeriod <: DataSelector\n\nRepresents a LEGEND data-taking period.\n\nExample:\n\nperiod = DataPeriod(2)\nperiod.no == 2\nstring(period) == \"p02\"\nDataPeriod(\"p02\") == period\n\n\n\n\n\n","category":"type"},{"location":"api/#LegendDataManagement.DataRun","page":"API","title":"LegendDataManagement.DataRun","text":"struct DataRun <: DataSelector\n\nRepresents a LEGEND data-taking run.\n\nExample:\n\n```julia r = DataRun(6) r.no == 6 string(r) == \"r006\" DataRun(\"r006\") == r\n\n\n\n\n\n","category":"type"},{"location":"api/#LegendDataManagement.DataSelector","page":"API","title":"LegendDataManagement.DataSelector","text":"abstract type DataSelector\n\nAbstract type for data selectors like ExpSetup, DataTier, DataPeriod, DataRun, DataCategory, Timestamp and FileKey.\n\n\n\n\n\n","category":"type"},{"location":"api/#LegendDataManagement.DataTier","page":"API","title":"LegendDataManagement.DataTier","text":"struct DataTier <: DataSelector\n\nRepresents a LEGEND data tier like \"raw, \"dsp\", etc.\n\nExample:\n\ntier = DataTier(:raw)\ntier.label == :raw\nstring(tier) == \"raw\"\nDataTier(\"raw\") == tier\n\n\n\n\n\n","category":"type"},{"location":"api/#LegendDataManagement.ExpSetup","page":"API","title":"LegendDataManagement.ExpSetup","text":"struct ExpSetup <: DataSelector\n\nRepresents a LEGEND experimental setup like \"l200\".\n\nExample:\n\nsetup = ExpSetup(:l200)\nsetup.label == :l200\nstring(setup) == \"l200\"\nExpSetup(\"l200\") == setup\n\n\n\n\n\n","category":"type"},{"location":"api/#LegendDataManagement.FileKey","page":"API","title":"LegendDataManagement.FileKey","text":"struct FileKey <: DataSelector\n\nRepresents a LEGEND file key.\n\nExample:\n\nfilekey = FileKey(\"l200-p02-r006-cal-20221226T200846Z\")\n\nSee also read_filekeys and write_filekeys.\n\n\n\n\n\n","category":"type"},{"location":"api/#LegendDataManagement.LegendData","page":"API","title":"LegendDataManagement.LegendData","text":"struct LegendData <: AbstractSetupData\n\nProvides access to LEGEND data and metadata.\n\nConstructors:\n\nLegendData(setup_config::SetupConfig).\nLegendData(setup::Symbol) - requires the $LEGEND_DATA_CONFIG environment variable to be set.\n\nExamples:\n\nconfig_filename = \"/path/to/config.json\"\nconfig = LegendDataConfig(config_filename)\nl200 = LegendData(config.setups.l200)\n\nfilekey = FileKey(\"l200-p02-r006-cal-20221226T200846Z\")\n\nor simply (if $LEGEND_DATA_CONFIG is set):\n\nl200 = LegendData(:l200)\n\nLegendData has the (virtual) properties metadata and tier.\n\nThe full path to \"tier\" data files can be retrieved using\n\n(data::LegendData)[tier::Symbol, filekey::FileKey]\n(data::LegendData).tier[tier::Symbol, filekey::AbstractString]\n\nExample:\n\nl200.tier[:raw]\nl200.tier[:raw, FileKey(\"l200-p02-r006-cal-20221226T200846Z\")]\n\nLegendData comes with an extension for SolidStateDetectors:\n\nl200 = LegendData(:l200)\nSolidStateDetector(l200, :V99000A)\n\n\n\n\n\n","category":"type"},{"location":"api/#LegendDataManagement.LegendDataConfig","page":"API","title":"LegendDataManagement.LegendDataConfig","text":"struct LegendDataConfig\n\nData configuration multiple experimental setups.\n\nContains a single field setups::PropertyDict{Symbol,SetupConfig}.\n\nCan be read from a config file via LegendDataConfig(config_filename[s]), or simply LegendDataConfig() if the environment variable $LEGEND_DATA_CONFIG is set. $LEGEND_DATA_CONFIG may be a list of colon-separated config filenames, which are applied/merged in reverse order (analog to the order of prioritiy in $PATH and similar).\n\nExample:\n\nconfig = LegendDataConfig(\"/path/to/config.json\")\nsetup = config.setups.l200\ndata_path(setup, \"tier\", \"raw\", \"cal\", \"p02\", \"r006\", \"l200-p02-r006-cal-20221226T200846Z-tier_raw.lh5\")\n\nSee also SetupConfig.\n\n\n\n\n\n","category":"type"},{"location":"api/#LegendDataManagement.LegendTierData","page":"API","title":"LegendDataManagement.LegendTierData","text":"struct LegendDataManagement.LegendTierData\n\nConstructors:\n\n(data::LegendData).tier\n\nLegendDataManagement.LegendTierData(data::LegendData)\n\nThe path to data directories and files can be accessed via getindex on tier_data::LegendTierData:\n\ntier_data[]\ntier_data[tier::DataTierLike]\ntier_data[tier::DataTierLike, category::DataCategoryLike]\ntier_data[tier::DataTierLike, category::DataCategoryLike, period::DataPeriodLike]\ntier_data[tier::DataTierLike, category::DataCategoryLike, period::DataPeriodLike, run::DataRunLike]\n\ntier_data[tier::DataTierLike, filekey::FileKeyLike]\n\nExamples:\n\n```julia l200 = LegendData(:l200)\n\nfilekey = FileKey(\"l200-p02-r006-cal-20221226T200846Z\") isfile(l200.tier[:raw, filekey])\n\nisdir(l200.tier[:raw, :cal]) isdir(l200.tier[:raw, :cal, \"p02\"]) isdir(l200.tier[:raw, :cal, \"p02\", \"r006\"]) isdir(l200.tier[DataTier(:raw), DataCategory(:cal), DataPeriod(2), DataRun(6)])\n\n\n\n\n\n","category":"type"},{"location":"api/#LegendDataManagement.PropsDB","page":"API","title":"LegendDataManagement.PropsDB","text":"struct LegendDataManagement.PropsDB\n\nA PropsDB instance, e.g. myprops, presents an on-disk directory containing JSON files or sub-directories (that contains JSON files in leaf directories) as a dictionary of properties.\n\nPropsDB supports Base.keys and Base.getindex as well as Base.propertynames and Base.getproperty to access it's contents. getindex and getproperty will return either another PropsDB or a PropDicts.PropDict, depending on whether the accessed property is stored as a sub-directory or a JSON file. We recommend to use getproperty where the properties/keys of the PropDict are more or less standardized and where they may be arbitrary (see examples below).\n\nThe contents of PropsDB may be time- and category-dependent, determined by the presence of a \"validity.json\" file. In this case, use myprops(sel::LegendDataManagement.ValiditySelection) or myprops(filekey::FileKey) to select the desired time and category. The selection can be made at some point during traversal of properties or at the leaf PropsDB (see the examples below).\n\nExamples:\n\nl200 = LegendData(:l200)\n\npropertynames(l200.metadata.hardware)\nl200.metadata.hardware.detectors.germanium\n\nkeys(l200.metadata.hardware.detectors.germanium.diodes)\nl200.metadata.hardware.detectors.germanium.diodes[:V99000A]\n\ndiodes = l200.metadata.hardware.detectors.germanium.diodes\ndiodes[keys(diodes)]\n\nsel = ValiditySelection(\"20221226T194007Z\", :cal)\nfilekey = FileKey(\"l200-p02-r006-cal-20221226T194007Z\")\ndata.metadata.hardware(sel).configuration.channelmaps\ndata.metadata.hardware.configuration.channelmaps(filekey)\n\nUse code should not instantiate PropsDB directly, use  LegendDataManagement.AnyProps(path::AbstractString) instead, which may return a PropsDB or a PropDicts.PropDict depending on what on-disk content path points to. \n\n\n\n\n\n","category":"type"},{"location":"api/#LegendDataManagement.SetupConfig","page":"API","title":"LegendDataManagement.SetupConfig","text":"struct SetupConfig\n\nData configuration for an experimental setup.\n\nSupports\n\ndata_path(setup, path_components)\n\nExamples:\n\ndata_path(setup, \"tier\", \"raw\", \"cal\", \"p02\", \"r006\", \"l200-p02-r006-cal-20221226T200846Z-tier_raw.lh5\")\n\n\n\n\n\n","category":"type"},{"location":"api/#LegendDataManagement.Timestamp","page":"API","title":"LegendDataManagement.Timestamp","text":"struct Timestamp <: DataSelector\n\nRepresents a LEGEND timestamp.\n\nExample:\n\njulia timestamp = Timestamp(\"20221226T200846Z\") timestamp.unixtime == 1672085326 string(timestamp) == \"20221226T200846Z\"`\n\n\n\n\n\n","category":"type"},{"location":"api/#LegendDataManagement.ValiditySelection","page":"API","title":"LegendDataManagement.ValiditySelection","text":"struct LegendDataManagement.ValiditySelection\n\nRepresenty validiy selection for a LegendDataManagement.PropsDB[@ref].\n\n\n\n\n\n","category":"type"},{"location":"api/#LegendDataManagement.AnyProps","page":"API","title":"LegendDataManagement.AnyProps","text":"LegendDataManagement.AnyProps = Union{LegendDataManagement.PropsDB,PropDicts.PropDict}\n\nProperties stored either in a directory managed via [LegendDataManagement.PropsDB][@ref] or loaded from one or several files into a PropDicts.PropDict.\n\nConstructors:\n\nLegendDataManagement.AnyProps(base_path::AbstractString)\n\n\n\n\n\n","category":"type"},{"location":"api/#LegendDataManagement.DataCategoryLike","page":"API","title":"LegendDataManagement.DataCategoryLike","text":"DataCategoryLike = Union{DataCategory, Symbol, AbstractString}\n\nAnything that can represent a data category, like DataCategory(:cal), :cal or \"cal\".\n\n\n\n\n\n","category":"type"},{"location":"api/#LegendDataManagement.DataPeriodLike","page":"API","title":"LegendDataManagement.DataPeriodLike","text":"DataPeriodLike = Union{DataPeriod, Integer, AbstractString}\n\nAnything that can represent a data period, like DataPeriod(2) or \"p02\".\n\n\n\n\n\n","category":"type"},{"location":"api/#LegendDataManagement.DataRunLike","page":"API","title":"LegendDataManagement.DataRunLike","text":"DataRunLike = Union{DataRun, Integer, AbstractString}\n\nAnything that can represent a data run, like DataRun(6) or \"r006\".\n\n\n\n\n\n","category":"type"},{"location":"api/#LegendDataManagement.DataTierLike","page":"API","title":"LegendDataManagement.DataTierLike","text":"DataTierLike = Union{DataTier, Symbol, AbstractString}\n\nAnything that can represent a data tier, like DataTier(:raw), :raw or \"raw\".\n\n\n\n\n\n","category":"type"},{"location":"api/#LegendDataManagement.ExpSetupLike","page":"API","title":"LegendDataManagement.ExpSetupLike","text":"ExpSetupLike = Union{ExpSetup, Symbol, AbstractString}\n\nAnything that can represent a setup label, like ExpSetup(:l200), :l200 or \"l200\".\n\n\n\n\n\n","category":"type"},{"location":"api/#LegendDataManagement.FileKeyLike","page":"API","title":"LegendDataManagement.FileKeyLike","text":"FileKeyLike = Union{FileKey, AbstractString}\n\nAnything that can represent a file key, like FileKey(\"l200-p02-r006-cal-20221226T200846Z\") or \"l200-p02-r006-cal-20221226T200846Z\".\n\n\n\n\n\n","category":"type"},{"location":"api/#LegendDataManagement.TimestampLike","page":"API","title":"LegendDataManagement.TimestampLike","text":"TimestampLike = Union{Timestamp, AbstractString, Integer}\n\nAnything that can represent a timestamp, like Timestamp(\"20221226T200846Z\") or \"20221226T200846Z\".\n\n\n\n\n\n","category":"type"},{"location":"api/#LegendDataManagement.channel_info-Tuple{LegendData, FileKey}","page":"API","title":"LegendDataManagement.channel_info","text":"channel_info(data::LegendData, filekey::FileKey)\n\nGet channel information for a given filekey.\n\n\n\n\n\n","category":"method"},{"location":"api/#LegendDataManagement.data_path","page":"API","title":"LegendDataManagement.data_path","text":"data_path(setup::SetupConfig, path_components::AbstractString...)\n\nGet the full absolute path for the given path_components as configured for setup.\n\nConverts between \"/\" and \"\\\" inside of path_components if necessary (for Windows compatibility).\n\n\n\n\n\n","category":"function"},{"location":"api/#LegendDataManagement.data_path-Tuple{LegendDataManagement.AbstractSetupData, Vararg{AbstractString}}","page":"API","title":"LegendDataManagement.data_path","text":"data_path(setup::AbstractSetupData, path_components::AbstractString...)\n\nGet the full absolute path for the given path_components as configured for setup.\n\n\n\n\n\n","category":"method"},{"location":"api/#LegendDataManagement.data_path-Tuple{LegendDataManagement.LegendTierData, Vararg{AbstractString}}","page":"API","title":"LegendDataManagement.data_path","text":"data_path(tier_data::LegendTierData, path_components::AbstractString...)\n\nGet the full absolute path for the given path_components relative to tier_data.\n\n\n\n\n\n","category":"method"},{"location":"api/#LegendDataManagement.data_path-Tuple{LegendDataManagement.PropsDB}","page":"API","title":"LegendDataManagement.data_path","text":"data_path(pd::LegendDataManagement.PropsDB)\n\nReturn the path to the data directory that contains pd.\n\n\n\n\n\n","category":"method"},{"location":"api/#LegendDataManagement.get_setup_config","page":"API","title":"LegendDataManagement.get_setup_config","text":"LegendDataManagement.get_setup_config(data::AbstractSetupData)::SetupConfig\n\nMust be specialized for each subtype of AbstractSetupData.\n\n\n\n\n\n","category":"function"},{"location":"api/#LegendDataManagement.legend_addprocs","page":"API","title":"LegendDataManagement.legend_addprocs","text":"legend_addprocs(nprocs::Integer)\n\nAdd Julia workers for LEGEND data processing.\n\nCalls Distributed.addprocs with some specific options.\n\nEnsures that all workers processes use the same Julia project environment as the current process. Requires that file systems paths are consistenst across compute nodes.\n\n\n\n\n\n","category":"function"},{"location":"api/#LegendDataManagement.read_filekeys-Tuple{AbstractString}","page":"API","title":"LegendDataManagement.read_filekeys","text":"read_filekeys(filename::AbstractString)::AbstractVector{FileKey}\n\nReads a list of FileKey from a text file, one file key per line.\n\nIgnores empty lines. # may be used to start a comment in the file.\n\n\n\n\n\n","category":"method"},{"location":"api/#LegendDataManagement.search_disk","page":"API","title":"LegendDataManagement.search_disk","text":"search_disk(::Type{<:DataSelector}, path::AbstractString)\n\nSearch on-disk data for data categories, periods, runs, and filekeys.\n\nExamples:\n\nl200 = LegendData(:l200)\n\nsearch_disk(DataCategory, l200.tier[:raw])\nsearch_disk(DataPeriod, l200.tier[:raw, :cal])\nsearch_disk(DataRun, l200.tier[:raw, :cal, \"p02\"])\nsearch_disk(FileKey, l200.tier[DataTier(:raw), :cal, DataPeriod(2), \"r006\"])\n\n\n\n\n\n","category":"function"},{"location":"api/#LegendDataManagement.write_filekeys-Tuple{AbstractString, AbstractVector{<:FileKey}}","page":"API","title":"LegendDataManagement.write_filekeys","text":"write_filekeys(filename::AbstractString, filekeys::AbstractVector{<:FileKey})\n\nWrites a list of FileKey to a text file, one file key per line.\n\n\n\n\n\n","category":"method"},{"location":"LICENSE/#LICENSE","page":"LICENSE","title":"LICENSE","text":"","category":"section"},{"location":"LICENSE/","page":"LICENSE","title":"LICENSE","text":"using Markdown\nMarkdown.parse_file(joinpath(@__DIR__, \"..\", \"..\", \"LICENSE.md\"))","category":"page"},{"location":"#LegendDataManagement.jl","page":"Home","title":"LegendDataManagement.jl","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"This package provides a Julia implementation of the LEGEND data and metadata management.","category":"page"},{"location":"","page":"Home","title":"Home","text":"======= It requires a central configuration file (see the example \"config.json\" in the LEGEND test data repository). While the path to this configuration file can be specified explicitly, we recommend setting an environment variable named $LEGEND_DATA_CONFIG to the absolute path of your \"config.json\".","category":"page"},{"location":"","page":"Home","title":"Home","text":"LegendDataManagment provides a SolidStateDetectors extension that makes it possible to create SolidStateDetector objects from LEGEND metadata.","category":"page"},{"location":"","page":"Home","title":"Home","text":"Usage examples:","category":"page"},{"location":"","page":"Home","title":"Home","text":"using LegendDataManagement\nusing PropertyFunctions\n\nl200 = LegendData(:l200)\n\nfilekey = FileKey(\"l200-p02-r006-cal-20221226T200846Z\")\n\nraw_filename = l200.tier[:raw, \"l200-p02-r006-cal-20221226T200846Z\"]\n\nl200.metadata.hardware.detectors.germanium.diodes\n\nchinfo = channel_info(l200, filekey)\nfilterby(@pf $processable && $usability)(chinfo)","category":"page"},{"location":"extensions/#Extensions","page":"Extensions","title":"Extensions","text":"","category":"section"},{"location":"extensions/#SolidStateDetectors-extension","page":"Extensions","title":"SolidStateDetectors extension","text":"","category":"section"},{"location":"extensions/","page":"Extensions","title":"Extensions","text":"LegendDataManagment provides an extension for SolidStateDetectors. This makes it possible to create SolidStateDetector instances from LEGEND metadata.","category":"page"},{"location":"extensions/","page":"Extensions","title":"Extensions","text":"Example (requires a $LEGEND_DATA_CONFIG environment variable pointing to a legend data-config file):","category":"page"},{"location":"extensions/","page":"Extensions","title":"Extensions","text":"using LegendDataManagement, SolidStateDetectors, Plots\ndet = SolidStateDetector(LegendData(:l200), :V99000A)\nplot(det)","category":"page"},{"location":"extensions/","page":"Extensions","title":"Extensions","text":"A detector can also be constructed using the filename of the LEGEND metadata detector-datasheet JSON file (no $LEGEND_DATA_CONFIG required):","category":"page"},{"location":"extensions/","page":"Extensions","title":"Extensions","text":"det = SolidStateDetector(LegendData, \"V99000A.json\")","category":"page"},{"location":"extensions/","page":"Extensions","title":"Extensions","text":"The following code will generate an overview plot of every 5th LEGEND detector (requires the actual LEGEND metadata instead of the metadata in legend-testdata):","category":"page"},{"location":"extensions/","page":"Extensions","title":"Extensions","text":"using LegendDataManagement, SolidStateDetectors, Plots\nl200 = LegendData(:l200)\ndetnames = propertynames(l200.metadata.hardware.detectors.germanium.diodes)\nplot(\n    plot.(SolidStateDetector.(Ref(l200), detnames[1:5:120]))...,\n    layout = (3,8), lw = 0.05, legend = false, grid = false, showaxis = false,\n    xlims = (-0.05,0.05), ylims = (-0.05,0.05), zlims = (0,0.1), size = (4000,1500)\n)","category":"page"}]
}

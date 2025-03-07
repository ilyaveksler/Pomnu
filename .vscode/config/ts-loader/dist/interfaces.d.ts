import * as typescript from 'typescript';
import { Chalk } from 'chalk';
import * as logger from './logger';
export interface ErrorInfo {
    code: number;
    severity: Severity;
    content: string;
    file: string;
    line: number;
    character: number;
    context: string;
}
export declare type FileLocation = {
    line: number;
    character: number;
};
export interface WebpackError {
    module?: any;
    file?: string;
    message: string;
    location?: FileLocation;
    loaderSource: string;
}
export interface WebpackModule {
    resource: string;
    errors: WebpackError[];
    addWarning(warning: Error): void;
    addError(error: WebpackError | Error): void;
    getWarnings(): Iterable<Error> | undefined;
    getErrors(): Iterable<WebpackError | Error> | undefined;
    clearWarningsAndErrors(): void;
    buildMeta: {
        tsLoaderFileVersion: number;
        tsLoaderDefinitionFileVersions: string[];
    };
}
export declare type ResolveSync = (context: string | undefined, path: string, moduleName: string) => string;
export declare type Action = () => void;
export interface HostMayBeCacheable {
    clearCache?: Action;
}
export interface CacheableHost extends HostMayBeCacheable {
    fileExists: typescript.ModuleResolutionHost['fileExists'];
    directoryExists: NonNullable<typescript.ModuleResolutionHost['directoryExists']>;
    realpath?: typescript.ModuleResolutionHost['realpath'];
}
export interface ModuleResolutionHostMayBeCacheable extends typescript.ModuleResolutionHost, HostMayBeCacheable {
    readFile(filePath: string, encoding?: string): string | undefined;
    trace: NonNullable<typescript.ModuleResolutionHost['trace']>;
    directoryExists: NonNullable<typescript.ModuleResolutionHost['directoryExists']>;
    getCurrentDirectory: NonNullable<typescript.ModuleResolutionHost['getCurrentDirectory']>;
    getDirectories: NonNullable<typescript.ModuleResolutionHost['getDirectories']>;
    useCaseSensitiveFileNames: NonNullable<typescript.LanguageServiceHost['useCaseSensitiveFileNames']>;
    getNewLine: NonNullable<typescript.LanguageServiceHost['getNewLine']>;
    getDefaultLibFileName: NonNullable<typescript.LanguageServiceHost['getDefaultLibFileName']>;
    readDirectory: NonNullable<typescript.LanguageServiceHost['readDirectory']>;
}
export interface ServiceHostWhichMayBeCacheable extends typescript.LanguageServiceHost, HostMayBeCacheable {
}
export interface WatchHost extends typescript.WatchCompilerHostOfFilesAndCompilerOptions<typescript.EmitAndSemanticDiagnosticsBuilderProgram> {
    invokeFileWatcher: WatchFactory['invokeFileWatcher'];
    updateRootFileNames(): void;
    outputFiles: Map<FilePathKey, typescript.OutputFile[]>;
    tsbuildinfo?: typescript.OutputFile;
}
export declare type WatchCallbacks<T> = Map<FilePathKey, {
    fileName: string;
    callbacks: T[];
}>;
export interface WatchFactory {
    watchedFiles: WatchCallbacks<typescript.FileWatcherCallback>;
    watchedDirectories: WatchCallbacks<typescript.DirectoryWatcherCallback>;
    watchedDirectoriesRecursive: WatchCallbacks<typescript.DirectoryWatcherCallback>;
    invokeFileWatcher(fileName: string, eventKind: typescript.FileWatcherEventKind): boolean;
    /** Used to watch changes in source files, missing files needed to update the program or config file */
    watchFile: typescript.WatchHost['watchFile'];
    /** Used to watch resolved module's failed lookup locations, config file specs, type roots where auto type reference directives are added */
    watchDirectory: typescript.WatchHost['watchDirectory'];
}
export interface SolutionDiagnostics {
    global: typescript.Diagnostic[];
    perFile: Map<FilePathKey, typescript.Diagnostic[]>;
    transpileErrors: [FilePathKey | undefined, typescript.Diagnostic[]][];
}
export declare type FilePathKey = string & {
    __filePathKeyBrand: any;
};
export interface SolutionBuilderWithWatchHost extends typescript.SolutionBuilderWithWatchHost<typescript.EmitAndSemanticDiagnosticsBuilderProgram>, WatchFactory {
    diagnostics: SolutionDiagnostics;
    writtenFiles: OutputFile[];
    configFileInfo: Map<FilePathKey, ConfigFileInfo>;
    outputAffectingInstanceVersion: Map<FilePathKey, true>;
    getOutputFileKeyFromReferencedProject(outputFileName: string): FilePathKey | undefined;
    getOutputFileFromReferencedProject(outputFileName: string): OutputFile | false | undefined;
    getOutputFileAndKeyFromReferencedProject(oututFileName: string): {
        key: FilePathKey;
        outputFile: OutputFile | false;
    } | undefined;
    getInputFileNameFromOutput(outputFileName: string): string | undefined;
    getOutputFilesFromReferencedProjectInput(inputFileName: string): OutputFile[];
    buildReferences(): void;
    clearCache(): void;
}
export interface ConfigFileInfo {
    config: typescript.ParsedCommandLine | undefined;
    outputFileNames?: Map<FilePathKey, {
        inputFileName: string;
        outputNames: FilePathKey[];
    }>;
    tsbuildInfoFile?: string;
    dtsFiles?: string[];
}
export interface OutputFile extends typescript.OutputFile {
    time: Date;
    version: number;
}
export interface TSInstance {
    compiler: typeof typescript;
    compilerOptions: typescript.CompilerOptions;
    /** Used for Vue for the most part */
    appendTsTsxSuffixesIfRequired: (filePath: string) => string;
    loaderOptions: LoaderOptions;
    rootFileNames: Set<string>;
    /**
     * a cache of all the files
     */
    files: TSFiles;
    /**
     * contains the modified files - cleared each time after-compile is called
     */
    modifiedFiles?: Map<FilePathKey, true>;
    /**
     * Paths to project references that are missing source maps.
     * Cleared each time after-compile is called. Used to dedupe
     * warnings about source maps during a single compilation.
     */
    projectsMissingSourceMaps?: Set<string>;
    servicesHost?: ServiceHostWhichMayBeCacheable;
    languageService?: typescript.LanguageService | null;
    version: number;
    dependencyGraph: DependencyGraph;
    filesWithErrors?: TSFiles;
    transformers: typescript.CustomTransformers;
    colors: Chalk;
    otherFiles: TSFiles;
    watchHost?: WatchHost;
    watchOfFilesAndCompilerOptions?: typescript.WatchOfFilesAndCompilerOptions<typescript.EmitAndSemanticDiagnosticsBuilderProgram>;
    builderProgram?: typescript.EmitAndSemanticDiagnosticsBuilderProgram;
    program?: typescript.Program;
    hasUnaccountedModifiedFiles?: boolean;
    changedFilesList?: boolean;
    reportTranspileErrors?: boolean;
    solutionBuilderHost?: SolutionBuilderWithWatchHost;
    configFilePath: string | undefined;
    filePathKeyMapper: (fileName: string) => FilePathKey;
    initialSetupPending: boolean;
    configParseResult: typescript.ParsedCommandLine;
    log: logger.Logger;
}
export interface LoaderOptionsCache {
    [name: string]: WeakMap<LoaderOptions, LoaderOptions>;
}
export declare type DependencyGraph = Map<FilePathKey, ResolvedModule[]>;
export declare type ReverseDependencyGraph = Map<FilePathKey, Map<FilePathKey, true>>;
export declare type LogLevel = 'INFO' | 'WARN' | 'ERROR';
export declare type ResolveModuleName = (moduleName: string, containingFile: string, compilerOptions: typescript.CompilerOptions, moduleResolutionHost: typescript.ModuleResolutionHost) => typescript.ResolvedModuleWithFailedLookupLocations;
export declare type CustomResolveModuleName = (moduleName: string, containingFile: string, compilerOptions: typescript.CompilerOptions, moduleResolutionHost: typescript.ModuleResolutionHost, parentResolver: ResolveModuleName) => typescript.ResolvedModuleWithFailedLookupLocations;
export declare type CustomResolveTypeReferenceDirective = (typeDirectiveName: string, containingFile: string, compilerOptions: typescript.CompilerOptions, moduleResolutionHost: typescript.ModuleResolutionHost, parentResolver: typeof typescript.resolveTypeReferenceDirective) => typescript.ResolvedTypeReferenceDirectiveWithFailedLookupLocations;
export interface LoaderOptions {
    silent: boolean;
    logLevel: LogLevel;
    logInfoToStdOut: boolean;
    instance: string;
    compiler: string;
    configFile: string;
    context: string;
    transpileOnly: boolean;
    ignoreDiagnostics: number[];
    reportFiles: string[];
    errorFormatter: (message: ErrorInfo, colors: Chalk) => string;
    onlyCompileBundledFiles: boolean;
    colors: boolean;
    compilerOptions: typescript.CompilerOptions;
    appendTsSuffixTo: (RegExp | string)[];
    appendTsxSuffixTo: (RegExp | string)[];
    happyPackMode: boolean;
    getCustomTransformers: string | ((program: typescript.Program) => typescript.CustomTransformers | undefined);
    experimentalWatchApi: boolean;
    allowTsInNodeModules: boolean;
    experimentalFileCaching: boolean;
    projectReferences: boolean;
    resolveModuleName: CustomResolveModuleName;
    resolveTypeReferenceDirective: CustomResolveTypeReferenceDirective;
    useCaseSensitiveFileNames?: boolean;
}
export interface TSFile {
    fileName: string;
    text?: string;
    version: number;
    modifiedTime?: Date;
    projectReference?: {
        /**
         * Undefined here means we’ve already checked and confirmed there is no
         * project reference for the file. Don’t bother checking again.
         */
        project?: typescript.ResolvedProjectReference;
        outputFileName?: string;
    };
}
/** where key is filepath */
export declare type TSFiles = Map<FilePathKey, TSFile>;
export interface ResolvedModule {
    originalFileName: string;
    resolvedFileName: string;
    resolvedModule?: ResolvedModule;
    isExternalLibraryImport?: boolean;
}
export declare type Severity = 'error' | 'warning';
//# sourceMappingURL=interfaces.d.ts.map
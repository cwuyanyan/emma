import { APIResponse, APIResponseError, APIResponseSuccess, AppDetails, AuthToken, BowerJson, CommandPreRun, Deploy, DeployChannel, DeploySnapshot, DeploySnapshotRequest, ICommand, INamespace, LogLevel, PackageJson, PackageBuild, PackageProjectRequest, Plugin, Response, SecurityProfile, SuperAgentError, ValidationError } from './definitions';
export declare const LOG_LEVELS: LogLevel[];
export declare function isCommand(cmd: ICommand | INamespace): cmd is ICommand;
export declare function isCommandPreRun(cmd: ICommand): cmd is CommandPreRun;
export declare function isLogLevel(l: string): l is LogLevel;
export declare function isPackageJson(o: Object): o is PackageJson;
export declare function isBowerJson(o: Object): o is BowerJson;
export declare function isValidationErrorArray(e: Object[]): e is ValidationError[];
export declare function isPlugin(p: any): p is Plugin;
export declare function isSuperAgentError(e: Error): e is SuperAgentError;
export declare function isAPIResponseSuccess(r: APIResponse): r is APIResponseSuccess;
export declare function isAPIResponseError(r: APIResponse): r is APIResponseError;
export declare function isAppDetails(d: Object): d is AppDetails;
export declare function isAppResponse(r: APIResponse): r is Response<AppDetails>;
export declare function isAppsResponse(r: APIResponse): r is Response<AppDetails[]>;
export declare function isAuthTokensResponse(r: APIResponse): r is Response<AuthToken[]>;
export declare function isLoginResponse(r: APIResponse): r is Response<{
    user_id: string;
    token: string;
}>;
export declare function isDeployResponse(r: APIResponse): r is Response<Deploy>;
export declare function isPackageProjectRequestResponse(r: APIResponse): r is Response<PackageProjectRequest>;
export declare function isPackageBuild(o: Object): o is PackageBuild;
export declare function isSecurityProfile(o: Object): o is SecurityProfile;
export declare function isSecurityProfileResponse(r: APIResponse): r is Response<SecurityProfile>;
export declare function isSecurityProfilesResponse(r: APIResponse): r is Response<SecurityProfile[]>;
export declare function isPackageBuildResponse(r: APIResponse): r is Response<PackageBuild>;
export declare function isPackageBuildsResponse(r: APIResponse): r is Response<PackageBuild[]>;
export declare function isDeployChannelResponse(r: APIResponse): r is Response<DeployChannel>;
export declare function isDeploySnapshotResponse(r: APIResponse): r is Response<DeploySnapshot>;
export declare function isDeploySnapshotRequestResponse(r: APIResponse): r is Response<DeploySnapshotRequest>;

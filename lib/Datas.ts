/** data struct definition */

export interface IConfigInfo //{
{
    name: string;
    bind_addr: string;
    bind_port: number;
    certificate: string;
    private_key: string;
    ciphers: string;
} //}
export class ConfigInfo implements IConfigInfo //{
{
    public name: string = "";
    public bind_addr: string = "";
    public bind_port: number = 0;
    public certificate: string = "";
    public private_key: string = "";
    public ciphers: string = "";
} //}

export interface IUsersInfo {
    users: [string, string][];
}

export class UsersInfo implements IUsersInfo {
    users: [string, string][] = [];
}

export interface IServerStatus {
    configName: string;
    serverId: number;
    run: boolean;
    locationId: number;
}

export class ServerStatus implements IServerStatus {
    configName: string = "";
    serverId: number = -1;
    run: boolean = false;
    locationId: number = -1;
}

export class AConfig extends ConfigInfo implements IUsersInfo, IConfigInfo, IServerStatus {
    users: [string, string][] = [];

    configName: string = "";
    serverId: number = -1;
    run: boolean = false;
    locationId: number = -1;;
}


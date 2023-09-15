import tedious from "tedious";

export class SQLServerClient {
    constructor(private connection: tedious.Connection){}
} 
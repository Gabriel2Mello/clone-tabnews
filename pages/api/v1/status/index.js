import database from "infra/database.js"

async function status(request, response) {
    const updatedAt = new Date().toISOString();
    
    const postgresVersion = await GetPostgresVersion();
    const maxConnections = await GetPostgresMaxConnections();
    const connectionsCount = await GetPostgresOpenConnectionsCount();    

    response.status(200).json({
        updated_at: updatedAt,
        postgres_version: postgresVersion,
        max_connections: maxConnections,
        open_connections_count: connectionsCount,
    });
}

async function GetPostgresVersion() {
    const queryPostgresVersion = await database.query("SELECT version();");
    const postgresVersion = queryPostgresVersion.rows[0].version;

    return postgresVersion.split(",")[0];
}

async function GetPostgresMaxConnections() {
    const queryMaxConnections = await database.query("SHOW max_connections");    
    const maxConnections = queryMaxConnections.rows[0].max_connections;    

    return parseInt(maxConnections);
}

async function GetPostgresOpenConnectionsCount() {
    const queryOpenConnections = await database.query("SELECT COUNT(*) FROM pg_stat_activity;");
    const connectionsCount = queryOpenConnections.rows[0].count;

    return parseInt(connectionsCount);
}

export default status;
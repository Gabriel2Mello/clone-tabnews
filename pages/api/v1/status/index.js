import database from "infra/database.js"

async function status(request, response) {
    const updatedAt = new Date().toISOString();
    
    const postgresVersion = await GetPostgresVersion();
    const maxConnections = await GetPostgresMaxConnections();
    const connectionsCount = await GetPostgresOpenConnectionsCount();    
    const userNames = await GetPostgresUserNames();

    response.status(200).json({
        updated_at: updatedAt,
        postgres_version: postgresVersion,
        max_connections: maxConnections,
        open_connections_count: connectionsCount,
        user_names: userNames,
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
    const queryOpenConnections = await database.query("SELECT COUNT(*) FROM pg_stat_activity WHERE backend_type = 'client backend';");
    const connectionsCount = queryOpenConnections.rows[0].count;

    return parseInt(connectionsCount);
}


async function GetPostgresUserNames() {
  const queryUserNames = await database.query(`
    SELECT
        pid,
        usename AS usuario,
        datname AS banco,
        application_name AS aplicacao,
        client_addr AS ip_origem,
        state AS status,
        backend_start AS inicio_conexao
    FROM pg_stat_activity
    ORDER BY application_name, usename;
  `);

  return queryUserNames.rows;
}

export default status;

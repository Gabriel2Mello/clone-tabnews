test("GET to /api/v1/status should return 200", async () => {
    const response = await fetch("http://localhost:3000/api/v1/status");    
    expect(response.status).toBe(200);
    
    const responseBody = await response.json();
    const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
    expect(responseBody.updated_at).toEqual(parsedUpdatedAt);
    expect(responseBody.updated_at).toBeDefined();
    expect(typeof responseBody.updated_at).toBe("string");
        
    expect(responseBody.postgres_version.length).toBeGreaterThan(0);
    expect(typeof responseBody.postgres_version).toBe("string");
    
    expect(parseInt(responseBody.max_connections)).toBeGreaterThan(0);
    expect(parseInt(responseBody.open_connections_count)).toBeGreaterThan(0);
});
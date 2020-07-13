import createFastifyServer from "./Api/Http/createFastifyServer";

(async function main() {
    const port = parseInt(process.env.PORT ?? '') || 3000;

    const server = createFastifyServer();
    await server.listen(port, '0.0.0.0');
}())

const Hapi = require("@hapi/hapi");
const routes = require("./routes");

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 5000,
    //host: "localhost",
    //host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
    routes: {
      cors: {
        origin: ["*"],
      },
    },
  });
  server.route(routes);
  server.start();
  console.log("server berjalan");
};
init();

module.exports = {
  apps: [{
    name: "elementerra-events",
    script: "./dist/main.js",
    wait_ready: true,
    instances: 1,
    env_development: {
      PORT: 8010
    }
  }]
}

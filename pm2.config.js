module.exports = {
  apps: [{
    name: "elementerra-index",
    script: "./dist/main.js",
    wait_ready: true,
    env_development: {
      PORT: 8010
    }
  }]
}

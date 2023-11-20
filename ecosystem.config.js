module.exports = {
  apps: [
    {
      name: 'analysis',
      port: 4500,
      exec_mode: 'fork',
      instances: '1',
      max_memory_restart: '500M',
      script: './.output/server/index.mjs',
    },
  ],
};

module.exports = {
  apps: [
    {
      name: 'xld-api',
      script: './build/app.js',
      autorestart: true,
      max_memory_restart: '2G',
      env: {
        NODE_ENV: 'development'
      }
    }
  ],

  deploy: {
    development: {
      user: 'ubuntu',
      host: '3.17.167.104',
      ssh_options: 'StrictHostKeyChecking=no',
      ref: 'origin/main',
      repo: 'git@github.com:huuthiendev/xld_test.git',
      path: '/home/ubuntu/api',
      'pre-setup': '',
      'post-setup': 'ln -s ../.env .env',
      'pre-deploy-local': '',
      'post-deploy':
        // eslint-disable-next-line max-len
        'npm install && npm run build && pm2 reload ecosystem.config.js --env development'
    }
  }
};

var appPath = process.cwd();
var config = {
    port: 3000,
    env: 'development',
    //mongodb配置信息
    mongodb: {
        uri: 'mongodb://localhost/blog-a', //mongodb://username:password@hostname:port/database
        options: {}
    },
    //后台相关配置
    project: {
        dir: 'blog' //后台访问路径，如http://localhost/blog配置为blog
    },
    //找回密码hash过期时间
    findPasswordTill: 24 * 60 * 60 * 1000
};

module.exports = config;
const FtpDeploy = require('ftp-deploy');
const ftpDeploy = new FtpDeploy();

const config = {
    user: "FTP_USERNAME",
    password: "FTP_PASSWORD",
    host: "FTP_SERVER",
    port: 21,
    localRoot: __dirname + "/dist",
    remoteRoot: "/public_html/",
    include: ["*", "**/*"],
    deleteRemote: false,
    forcePasv: true
};

ftpDeploy.deploy(config)
    .then(res => console.log('Upload abgeschlossen:', res))
    .catch(err => console.log('Fehler:', err));

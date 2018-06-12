// used for install dependencies and files to support certain kinds of features

let path = require('path');
let project = require('../../config/project');
let pkgJson = require('../../package.json');
let merge = require('lodash.merge');
let spawnSync = require('child_process').spawnSync;
let utils = require('steamer-webpack-utils');

let dependency = {
    template: {
        html: {
            'html-loader': '^0.5.5'
        },
        handlebars: {
            'handlebars-loader': '^1.7.0',
            'handlebars': '^4.0.11'
        },
        pug: {
            'pug-loader': '^2.4.0',
            'pug': '^2.0.3'
        },
        ejs: {
            'ejs-loader': '^1.1.0',
            'ejs': '^2.5.9'
        },
        art: {
            'art-template': '^4.12.2',
            'art-template-loader': '^1.4.3'
        }
    },
    style: {
        css: {
            'style-loader': '^0.21.0',
            'css-loader': '^0.28.11'
        },
        less: {
            'style-loader': '^0.21.0',
            'css-loader': '^0.28.11',
            'less': '^3.0.1',
            'less-loader': '^4.1.0'
        },
        sass: {
            'style-loader': '^0.21.0',
            'css-loader': '^0.28.11',
            'node-sass': '^4.8.3',
            'sass-loader': '^7.0.1'
        },
        scss: {
            'style-loader': '^0.21.0',
            'css-loader': '^0.28.11',
            'node-sass': '^4.8.3',
            'sass-loader': '^7.0.1'
        },
        stylus: {
            'style-loader': '^0.21.0',
            'css-loader': '^0.28.11',
            'stylus': '^0.54.5',
            'stylus-loader': '^3.0.2'
        }
    },
    js: {
        ts: {
            'awesome-typescript-loader': '^5.0.0',
            'typescript': '^2.8.3',
            '@types/react': '^15.6.15',
            '@types/react-dom': '^15.5.7'
        }
    }
};

let files = {
    template: {},
    style: {},
    js: {
        ts: [
            {
                src: path.join(__dirname, './tsconfig.json'),
                dist: path.resolve('tsconfig.json')
            }
        ]
    }
};

module.exports = {
    installDependency: function() {
        console.log();

        let dependencies = merge({}, pkgJson.dependencies, pkgJson.devDependencies);

        let installDep = {};
        let installFile = {
            template: {},
            style: {},
            js: {}
        };
        let cmd = '';

        project.webpack.template.forEach((item1) => {
            let dep = dependency['template'][item1] || {};

            Object.keys(dep).forEach((item2) => {
                if (!dependencies[item2]) {
                    installDep[item2] = dependency['template'][item1][item2];
                    installFile.template[item1] = true;
                }
            });
        });

        project.webpack.style.forEach((item1) => {
            let dep = dependency['style'][item1] || {};

            Object.keys(dep).forEach((item2) => {
                if (!dependencies[item2]) {
                    installDep[item2] = dependency['style'][item1][item2];
                    installFile.style[item1] = true;
                }
            });
        });

        project.webpack.js.forEach((item1) => {
            let dep = dependency['js'][item1] || {};

            Object.keys(dep).forEach((item2) => {
                if (!dependencies[item2]) {
                    installDep[item2] = dependency['js'][item1][item2];
                    installFile.js[item1] = true;
                }
            });
        });

        Object.keys(installDep).forEach((item) => {
            cmd += (item + '@' + installDep[item] + ' ');
        });

        if (cmd) {
            utils.info('Start installing missing dependencies. Please wait......');
            this.copyFile(installFile);
            spawnSync(project.npm, ['install', '--save-dev', cmd], { stdio: 'inherit', shell: true });
            utils.info('Dependencies installation complete. Please run your command again.');
            return true;
        }
        else {
            return false;
        }
    },
    copyFile: function(installFile) {
        Object.keys(installFile.template).forEach((item1) => {
            let fileArr = files.template[item1] || [];
            fileArr.forEach((item2) => {
                utils.info('file ' + item2.src + ' is copyied to ' + item2.dist);
                utils.fs.copySync(item2.src, item2.dist);
            });
        });

        Object.keys(installFile.style).forEach((item1) => {
            let fileArr = files.style[item1] || [];
            fileArr.forEach((item2) => {
                utils.info('file ' + item2.src + ' is copyied to ' + item2.dist);
                utils.fs.copySync(item2.src, item2.dist);
            });
        });
        Object.keys(installFile.js).forEach((item1) => {
            let fileArr = files.js[item1] || [];
            fileArr.forEach((item2) => {
                utils.info('file ' + item2.src + ' is copyied to ' + item2.dist);
                utils.fs.copySync(item2.src, item2.dist);
            });
        });
    }
};

module.exports = function(config){
    config.set({
        files: ['*.js', 'tests/*.js'],

        frameworks: ['jasmine'],
        // https://www.npmjs.com/browse/keyword/karma-reporter
        reporters: ['progress'],
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: []
    });
};

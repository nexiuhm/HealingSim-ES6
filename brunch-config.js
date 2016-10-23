exports.config = {
    paths: {
        watched: [
            'src',
            'static'
        ]
    },
    files: {
        javascripts: {
            joinTo: 'js/main.js',
            order: {
                before: [''],
                after: ['main.es6']
            }
        }
    },
    plugins: {
        babel: {
            pattern: /\.(es6|jsx)$/,
            presets: ['es2015']
        }
    },
    conventions: {
        assets: /static[\\/]/,
        ignored: /components[\\/]/
    }

};

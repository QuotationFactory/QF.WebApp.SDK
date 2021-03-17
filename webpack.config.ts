const path = require('path');
const Dotenv = require('dotenv-webpack');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = (env) => {
    const config: Record<string, string> = Object.keys(env || {})
        .reduce((prev, key) => {
            if (!env[key]?.toString()?.startsWith('WEBPACK')) {
                prev[`process.env.${key}`] = env[key]
            }

            return prev
        }, {})

    console.log('env vars', config);

    return {
        mode: 'production',
        entry: './src/rh24-sdk.ts',
        module: {
            rules: [
                {
                    test: /\.ts?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
        output: {
            filename: 'rh24-webapp-sdk.js',
            path: path.resolve(__dirname, 'dist'),
            library: 'rh24Sdk',
            libraryTarget: 'umd',
        },
        devtool: 'source-map',
        plugins: [
            new webpack.ProgressPlugin(),
            new CleanWebpackPlugin(),
            // new webpack.DefinePlugin(config),
        ]
    }
}




// module.exports = ['source-map'].map((devtool) => {
//     // const config: Record<string, string> = Object.keys(env || {})
//     //     .reduce((prev, key) => {
//     //         if (!env[key]?.toString()?.startsWith('WEBPACK')) {
//     //             prev[`process.env.${key}`] = env[key]
//     //         }

//     //         return prev
//     //     }, {})

//     // console.log('env vars', config);

//     return {
//         mode: 'production',
//         entry: './src/rh24-sdk.ts',
//         module: {
//             rules: [
//                 {
//                     test: /\.ts?$/,
//                     use: 'ts-loader',
//                     exclude: /node_modules/,
//                 },
//             ],
//         },
//         resolve: {
//             extensions: ['.tsx', '.ts', '.js'],
//         },
//         output: {
//             filename: 'rh24-webapp-sdk-[name].js',
//             path: path.resolve(__dirname, 'dist'),
//             library: 'rh24-webapp-sdk',
//             libraryTarget: 'umd',
//         },
//         devtool,
//         optimization: {
//             runtimeChunk: true
//         },
//         plugins: [
//             new webpack.ProgressPlugin(),
//             new CleanWebpackPlugin(),
//             // new webpack.DefinePlugin(config),
//         ]
//     }
// })
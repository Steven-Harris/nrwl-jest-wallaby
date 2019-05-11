const ngxWallabyJest = require('ngx-wallaby-jest');

module.exports = function(wallaby) {
  return {
    files: [
      'jest.config.js',
      'apps/**/*.+(ts|html|json|snap|css|less|sass|scss|jpg|jpeg|gif|png|svg)',
      '!apps/**/*.spec.ts'
    ],

    tests: ['apps/**/*.spec.ts', { pattern: 'apps/**-e2e/**', ignore: true }],

    env: {
      type: 'node',
      runner: 'node'
    },

    compilers: {
      '**/*.ts?(x)': wallaby.compilers.typeScript({
        module: 'commonjs',
        getCustomTransformers: () => {
          return {
            before: [
              require('jest-preset-angular/InlineHtmlStripStylesTransformer').factory(
                { compilerModule: require('typescript') }
              )
            ]
          };
        }
      }),
      '**/*.html': file => ({
        code: require('ts-jest').process(file.content, file.path, {
          globals: { 'ts-jest': { stringifyContentPathRegex: '\\.html$' } }
        }),
        map: { version: 3, sources: [], names: [], mappings: [] },
        ranges: []
      })
    },

    preprocessors: {
      // This translate templateUrl and styleUrls to the right implementation
      // For wallaby
      'apps/**/*.component.ts': ngxWallabyJest
    },

    setup: function(wallaby) {
      let jestConfig = require('./jest.config.js');
      jestConfig.setupTestFrameworkScriptFile =
        '<rootDir>/apps/sample-app/src/test-setup.ts';
      wallaby.testFramework.configure(jestConfig);
    },

    testFramework: 'jest'
  };
};

module.exports = {
  name: 'sample-app',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/sample-app/',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};

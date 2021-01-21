module.exports = {
    preset: 'react-native',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node']
};

jest.mock('react-native-reanimated', () =>
  require('react-native-reanimated/mock')
);
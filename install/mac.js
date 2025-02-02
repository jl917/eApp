const os = require('os');
const { execSync } = require('child_process');

if (os.platform() === 'darwin') {
  console.log('Detected macOS. Installing osx-temperature-sensor...');
  execSync('npm install osx-temperature-sensor --no-save', {
    stdio: 'inherit',
  });
} else {
  console.log('Not macOS. Skipping installation.');
}

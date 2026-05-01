import { execSync } from 'child_process';
import path from 'path';

async function globalTeardown() {
  const backendDir = path.resolve(process.cwd(), '../final-year-backend');

  console.log('\n🧹 Clearing test data...');
  execSync('npm run test:seed', { cwd: backendDir, stdio: 'inherit' });
}

export default globalTeardown;

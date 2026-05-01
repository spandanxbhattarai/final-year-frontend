import { execSync } from 'child_process';
import path from 'path';

async function globalSetup() {
  // process.cwd() is the project root (final-year-project/) when Playwright runs
  const backendDir = path.resolve(process.cwd(), '../final-year-backend');

  console.log('\n🌱 Seeding test database...');
  // Seed script does deleteMany on all tables before inserting, so no force-reset needed
  execSync('npm run test:seed', { cwd: backendDir, stdio: 'inherit' });

  console.log('\n✅ Test database ready\n');
}

export default globalSetup;

/**
 * Change admin email and/or password without wiping the database.
 *
 * Usage (from backend/ directory):
 *   npm run admin:change -- --email=new@email.com --password=newpass123
 *   npm run admin:change -- --current=admin@genmash.com --email=new@email.com
 *   npm run admin:change -- --current=admin@genmash.com --password=newpass123
 *
 * Flags:
 *   --current   existing email to look up (default: admin@genmash.com)
 *   --email     new email to set (optional)
 *   --password  new password to set (optional, min 6 chars)
 *   --name      new display name (optional)
 */
import mongoose from 'mongoose';
import { env } from '../config/env';
import Admin from '../models/Admin';

function parseArgs() {
  const args: Record<string, string> = {};
  for (const arg of process.argv.slice(2)) {
    const match = arg.match(/^--([^=]+)=(.*)$/);
    if (match) args[match[1]] = match[2];
  }
  return args;
}

async function run() {
  const args = parseArgs();
  const current = args.current || 'admin@genmash.com';
  const newEmail = args.email;
  const newPassword = args.password;
  const newName = args.name;

  if (!newEmail && !newPassword && !newName) {
    console.error('❌ Nothing to update. Pass at least one of --email, --password, --name.');
    process.exit(1);
  }
  if (newPassword && newPassword.length < 6) {
    console.error('❌ Password must be at least 6 characters.');
    process.exit(1);
  }

  await mongoose.connect(env.MONGODB_URI);
  console.log('Connected to MongoDB');

  const admin = await Admin.findOne({ email: current.toLowerCase() }).select('+password');
  if (!admin) {
    console.error(`❌ No admin found with email "${current}".`);
    await mongoose.disconnect();
    process.exit(1);
  }

  if (newEmail) admin.email = newEmail.toLowerCase();
  if (newName) admin.name = newName;
  if (newPassword) admin.password = newPassword; // hashed by pre-save hook

  await admin.save();

  console.log('✅ Admin updated:');
  console.log(`   Name:  ${admin.name}`);
  console.log(`   Email: ${admin.email}`);
  if (newPassword) console.log('   Password: (updated)');

  await mongoose.disconnect();
}

run().catch(err => {
  console.error('❌ Failed:', err.message);
  process.exit(1);
});

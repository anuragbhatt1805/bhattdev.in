const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Check if admin user already exists
  const existingAdmin = await prisma.user.findUnique({
    where: { username: 'admin' }
  });

  if (existingAdmin) {
    console.log('✅ Admin user already exists');
    return;
  }

  // Create admin user
  const hashedPassword = await bcrypt.hash('bhatt123', 12);
  
  const adminUser = await prisma.user.create({
    data: {
      username: 'admin',
      password: hashedPassword,
      active: true,
      isAdmin: true
    }
  });

  console.log('✅ Created admin user:', {
    id: adminUser.id,
    username: adminUser.username,
    isAdmin: adminUser.isAdmin
  });

  console.log('🎉 Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
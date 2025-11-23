import { neon } from '@neondatabase/serverless';
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/neon-http';

import * as schema from '../db/schema';

const sql = neon(process.env.DATABASE_URL!);

const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log('Seeding DB');
    await db.delete(schema.courses);
    await db.delete(schema.userProgress);
    await db.insert(schema.courses).values([
      {
        title: 'Spanish',
        imageSrc: '/flags/ES.svg',
      },
      {
        title: 'French',
        imageSrc: '/flags/FR.svg',
      },
      {
        title: 'Japanese',
        imageSrc: '/flags/JP.svg',
      },
      {
        title: 'Hindi',
        imageSrc: '/flags/IN.svg',
      },
      {
        title: 'English',
        imageSrc: '/flags/US.svg',
      },
    ]);
    console.log('DB seeded');
  } catch (error) {
    console.error(error);
    throw new Error('Failed to seed database');
  }
};

main();

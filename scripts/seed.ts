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
    await db.delete(schema.units);
    await db.delete(schema.lessons);
    await db.delete(schema.challenges);
    await db.delete(schema.challengeOptions);
    await db.delete(schema.challengeProgress);
    await db.insert(schema.courses).values([
      {
        id: 1,
        title: 'Spanish',
        imageSrc: '/flags/ES.svg',
      },
      {
        id: 2,
        title: 'French',
        imageSrc: '/flags/FR.svg',
      },
      {
        id: 3,
        title: 'Japanese',
        imageSrc: '/flags/JP.svg',
      },
      {
        id: 4,
        title: 'Hindi',
        imageSrc: '/flags/IN.svg',
      },
      {
        id: 5,
        title: 'English',
        imageSrc: '/flags/US.svg',
      },
    ]);
    await db.insert(schema.units).values([
      {
        id: 1,
        title: 'Unit 1',
        description: 'Unit 1 description',
        courseId: 1, // Spanish
        order: 1,
      },
    ]);
    await db.insert(schema.lessons).values([
      {
        id: 1,
        title: 'Lesson 1',
        unitId: 1,
        order: 1,
      },
      {
        id: 2,
        title: 'Lesson 2',
        unitId: 1,
        order: 2,
      },
      {
        id: 3,
        title: 'Lesson 3',
        unitId: 1,
        order: 3,
      },
      {
        id: 4,
        title: 'Lesson 4',
        unitId: 1,
        order: 4,
      },
      {
        id: 5,
        title: 'Lesson 5',
        unitId: 1,
        order: 5,
      },
    ]);
    await db.insert(schema.challenges).values([
      {
        id: 1,
        question: 'Which of these is the "the man"?',
        lessonId: 1,
        order: 1,
        type: 'SELECT',
      },
      {
        id: 2,
        question: 'the man',
        lessonId: 1,
        order: 2,
        type: 'ASSIST',
      },
      {
        id: 3,
        question: 'Which of these is the "the milk"?',
        lessonId: 1,
        order: 3,
        type: 'SELECT',
      },
    ]);
    await db.insert(schema.challengeOptions).values([
      {
        id: 1,
        text: 'El hombre',
        correct: true,
        challengeId: 1,
        imageSrc: '/man.webp',
        audioSrc: '/audio/spanish/the-man.mp3',
      },
      {
        id: 2,
        text: 'La mujer',
        correct: false,
        challengeId: 1,
        imageSrc: '/woman.webp',
        audioSrc: '/audio/spanish/the-women.mp3',
      },
      {
        id: 3,
        text: 'La leche',
        correct: false,
        challengeId: 1,
        imageSrc: '/boy.webp',
        audioSrc: '/audio/spanish/the-milk.mp3',
      },
      {
        id: 4,
        text: 'El hombre',
        correct: true,
        challengeId: 2,
      },
      {
        id: 5,
        text: 'La mujer',
        correct: false,
        challengeId: 2,
      },
      {
        id: 6,
        text: 'La leche',
        correct: false,
        challengeId: 2,
      },
      {
        id: 7,
        text: 'La leche',
        correct: true,
        challengeId: 3,
        imageSrc: '/milk.webp',
        audioSrc: '/audio/spanish/the-milk.mp3',
      },
      {
        id: 8,
        text: 'El hombre',
        correct: false,
        challengeId: 3,
        imageSrc: '/man.webp',
        audioSrc: '/audio/spanish/the-man.mp3',
      },
      {
        id: 9,
        text: 'La mujer',
        correct: false,
        challengeId: 3,
        imageSrc: '/woman.webp',
        audioSrc: '/audio/spanish/the-women.mp3',
      },
    ]);
    console.log('DB seeded');
  } catch (error) {
    console.error(error);
    throw new Error('Failed to seed database');
  }
};

main();

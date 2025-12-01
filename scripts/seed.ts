import { neon } from '@neondatabase/serverless';
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/neon-http';

import * as schema from '../db/schema';

const sql = neon(process.env.DATABASE_URL!);

const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log('Seeding DB...');

    // Clear existing data
    await db.delete(schema.challengeProgress);
    await db.delete(schema.challengeOptions);
    await db.delete(schema.challenges);
    await db.delete(schema.lessons);
    await db.delete(schema.units);
    await db.delete(schema.userProgress);
    await db.delete(schema.courses);

    console.log('Creating Spanish course...');
    const [spanishCourse] = await db
      .insert(schema.courses)
      .values({
        title: 'Spanish',
        imageSrc: '/flags/ES.svg',
      })
      .returning();

    // Spanish Unit 1: Basics
    const [spanishUnit1] = await db
      .insert(schema.units)
      .values({
        courseId: spanishCourse.id,
        title: 'Unit 1: Basics',
        description: 'Learn the fundamentals of Spanish',
        order: 1,
      })
      .returning();

    // Spanish Unit 1 - Lesson 1: Greetings
    const [spanishLesson1] = await db
      .insert(schema.lessons)
      .values({
        unitId: spanishUnit1.id,
        title: 'Greetings',
        order: 1,
      })
      .returning();

    // Challenge 1: SELECT - Choose the correct greeting
    const [spanishChallenge1] = await db
      .insert(schema.challenges)
      .values({
        lessonId: spanishLesson1.id,
        type: 'SELECT',
        question: 'Which word means "hello" in Spanish?',
        order: 1,
      })
      .returning();

    await db.insert(schema.challengeOptions).values([
      { challengeId: spanishChallenge1.id, text: 'Hola', correct: true },
      { challengeId: spanishChallenge1.id, text: 'Adiós', correct: false },
      { challengeId: spanishChallenge1.id, text: 'Gracias', correct: false },
      { challengeId: spanishChallenge1.id, text: 'Por favor', correct: false },
    ]);

    // Challenge 2: ASSIST - Translate to Spanish
    const [spanishChallenge2] = await db
      .insert(schema.challenges)
      .values({
        lessonId: spanishLesson1.id,
        type: 'ASSIST',
        question: 'Translate "Good morning" to Spanish',
        order: 2,
      })
      .returning();

    await db.insert(schema.challengeOptions).values([
      { challengeId: spanishChallenge2.id, text: 'Buenos días', correct: true },
      {
        challengeId: spanishChallenge2.id,
        text: 'Buenas noches',
        correct: false,
      },
      {
        challengeId: spanishChallenge2.id,
        text: 'Buenas tardes',
        correct: false,
      },
      { challengeId: spanishChallenge2.id, text: 'Buen día', correct: false },
    ]);

    // Challenge 3: SELECT - Choose the correct response
    const [spanishChallenge3] = await db
      .insert(schema.challenges)
      .values({
        lessonId: spanishLesson1.id,
        type: 'SELECT',
        question: 'How do you say "How are you?" in Spanish?',
        order: 3,
      })
      .returning();

    await db.insert(schema.challengeOptions).values([
      {
        challengeId: spanishChallenge3.id,
        text: '¿Cómo estás?',
        correct: true,
      },
      { challengeId: spanishChallenge3.id, text: '¿Qué tal?', correct: false },
      {
        challengeId: spanishChallenge3.id,
        text: '¿Cómo te llamas?',
        correct: false,
      },
      {
        challengeId: spanishChallenge3.id,
        text: '¿Dónde vives?',
        correct: false,
      },
    ]);

    // Challenge 4: ASSIST - Audio challenge
    const [spanishChallenge4] = await db
      .insert(schema.challenges)
      .values({
        lessonId: spanishLesson1.id,
        type: 'ASSIST',
        question: 'Listen and select the correct word',
        order: 4,
      })
      .returning();

    await db.insert(schema.challengeOptions).values([
      {
        challengeId: spanishChallenge4.id,
        text: 'Hola',
        correct: true,
        audioSrc: '/audio/spanish/the-man.mp3',
      },
      {
        challengeId: spanishChallenge4.id,
        text: 'Adiós',
        correct: false,
        audioSrc: '/audio/spanish/the-milk.mp3',
      },
      {
        challengeId: spanishChallenge4.id,
        text: 'Gracias',
        correct: false,
        audioSrc: '/audio/spanish/the-women.mp3',
      },
    ]);

    // Challenge 5: SELECT - Image challenge
    const [spanishChallenge5] = await db
      .insert(schema.challenges)
      .values({
        lessonId: spanishLesson1.id,
        type: 'SELECT',
        question: 'Select the correct greeting for this situation',
        order: 5,
      })
      .returning();

    await db.insert(schema.challengeOptions).values([
      {
        challengeId: spanishChallenge5.id,
        text: 'Buenas noches',
        correct: true,
        imageSrc: '/man.webp',
      },
      {
        challengeId: spanishChallenge5.id,
        text: 'Buenos días',
        correct: false,
        imageSrc: '/woman.webp',
      },
      {
        challengeId: spanishChallenge5.id,
        text: 'Buenas tardes',
        correct: false,
        imageSrc: '/boy.webp',
      },
    ]);

    // Spanish Unit 1 - Lesson 2: Common Phrases
    const [spanishLesson2] = await db
      .insert(schema.lessons)
      .values({
        unitId: spanishUnit1.id,
        title: 'Common Phrases',
        order: 2,
      })
      .returning();

    const [spanishChallenge6] = await db
      .insert(schema.challenges)
      .values({
        lessonId: spanishLesson2.id,
        type: 'SELECT',
        question: 'What does "Por favor" mean?',
        order: 1,
      })
      .returning();

    await db.insert(schema.challengeOptions).values([
      { challengeId: spanishChallenge6.id, text: 'Please', correct: true },
      { challengeId: spanishChallenge6.id, text: 'Thank you', correct: false },
      {
        challengeId: spanishChallenge6.id,
        text: "You're welcome",
        correct: false,
      },
      { challengeId: spanishChallenge6.id, text: 'Excuse me', correct: false },
    ]);

    const [spanishChallenge7] = await db
      .insert(schema.challenges)
      .values({
        lessonId: spanishLesson2.id,
        type: 'ASSIST',
        question: 'Translate "Thank you" to Spanish',
        order: 2,
      })
      .returning();

    await db.insert(schema.challengeOptions).values([
      { challengeId: spanishChallenge7.id, text: 'Gracias', correct: true },
      { challengeId: spanishChallenge7.id, text: 'Por favor', correct: false },
      { challengeId: spanishChallenge7.id, text: 'De nada', correct: false },
      { challengeId: spanishChallenge7.id, text: 'Perdón', correct: false },
    ]);

    const [spanishChallenge8] = await db
      .insert(schema.challenges)
      .values({
        lessonId: spanishLesson2.id,
        type: 'SELECT',
        question: 'How do you say "You\'re welcome" in Spanish?',
        order: 3,
      })
      .returning();

    await db.insert(schema.challengeOptions).values([
      { challengeId: spanishChallenge8.id, text: 'De nada', correct: true },
      { challengeId: spanishChallenge8.id, text: 'Gracias', correct: false },
      { challengeId: spanishChallenge8.id, text: 'Por favor', correct: false },
      { challengeId: spanishChallenge8.id, text: 'Lo siento', correct: false },
    ]);

    const [spanishChallenge9] = await db
      .insert(schema.challenges)
      .values({
        lessonId: spanishLesson2.id,
        type: 'ASSIST',
        question: 'What does "Lo siento" mean?',
        order: 4,
      })
      .returning();

    await db.insert(schema.challengeOptions).values([
      { challengeId: spanishChallenge9.id, text: "I'm sorry", correct: true },
      { challengeId: spanishChallenge9.id, text: 'Thank you', correct: false },
      { challengeId: spanishChallenge9.id, text: 'Please', correct: false },
      { challengeId: spanishChallenge9.id, text: 'Excuse me', correct: false },
    ]);

    // Spanish Unit 1 - Lesson 3: Numbers
    const [spanishLesson3] = await db
      .insert(schema.lessons)
      .values({
        unitId: spanishUnit1.id,
        title: 'Numbers 1-10',
        order: 3,
      })
      .returning();

    const [spanishChallenge10] = await db
      .insert(schema.challenges)
      .values({
        lessonId: spanishLesson3.id,
        type: 'SELECT',
        question: 'What is "uno" in English?',
        order: 1,
      })
      .returning();

    await db.insert(schema.challengeOptions).values([
      { challengeId: spanishChallenge10.id, text: 'One', correct: true },
      { challengeId: spanishChallenge10.id, text: 'Two', correct: false },
      { challengeId: spanishChallenge10.id, text: 'Three', correct: false },
      { challengeId: spanishChallenge10.id, text: 'Four', correct: false },
    ]);

    const [spanishChallenge11] = await db
      .insert(schema.challenges)
      .values({
        lessonId: spanishLesson3.id,
        type: 'ASSIST',
        question: 'Translate "five" to Spanish',
        order: 2,
      })
      .returning();

    await db.insert(schema.challengeOptions).values([
      { challengeId: spanishChallenge11.id, text: 'Cinco', correct: true },
      { challengeId: spanishChallenge11.id, text: 'Cuatro', correct: false },
      { challengeId: spanishChallenge11.id, text: 'Seis', correct: false },
      { challengeId: spanishChallenge11.id, text: 'Siete', correct: false },
    ]);

    // Spanish Unit 2: People & Family
    const [spanishUnit2] = await db
      .insert(schema.units)
      .values({
        courseId: spanishCourse.id,
        title: 'Unit 2: People & Family',
        description: 'Learn to talk about people and family',
        order: 2,
      })
      .returning();

    const [spanishLesson4] = await db
      .insert(schema.lessons)
      .values({
        unitId: spanishUnit2.id,
        title: 'Family Members',
        order: 1,
      })
      .returning();

    const [spanishChallenge12] = await db
      .insert(schema.challenges)
      .values({
        lessonId: spanishLesson4.id,
        type: 'SELECT',
        question: 'What does "madre" mean?',
        order: 1,
      })
      .returning();

    await db.insert(schema.challengeOptions).values([
      { challengeId: spanishChallenge12.id, text: 'Mother', correct: true },
      { challengeId: spanishChallenge12.id, text: 'Father', correct: false },
      { challengeId: spanishChallenge12.id, text: 'Sister', correct: false },
      { challengeId: spanishChallenge12.id, text: 'Brother', correct: false },
    ]);

    const [spanishChallenge13] = await db
      .insert(schema.challenges)
      .values({
        lessonId: spanishLesson4.id,
        type: 'ASSIST',
        question: 'Translate "father" to Spanish',
        order: 2,
      })
      .returning();

    await db.insert(schema.challengeOptions).values([
      { challengeId: spanishChallenge13.id, text: 'Padre', correct: true },
      { challengeId: spanishChallenge13.id, text: 'Madre', correct: false },
      { challengeId: spanishChallenge13.id, text: 'Hermano', correct: false },
      { challengeId: spanishChallenge13.id, text: 'Hermana', correct: false },
    ]);

    const [spanishChallenge14] = await db
      .insert(schema.challenges)
      .values({
        lessonId: spanishLesson4.id,
        type: 'SELECT',
        question: 'What is "hermana" in English?',
        order: 3,
      })
      .returning();

    await db.insert(schema.challengeOptions).values([
      { challengeId: spanishChallenge14.id, text: 'Sister', correct: true },
      { challengeId: spanishChallenge14.id, text: 'Brother', correct: false },
      { challengeId: spanishChallenge14.id, text: 'Mother', correct: false },
      { challengeId: spanishChallenge14.id, text: 'Father', correct: false },
    ]);

    // Spanish Unit 3: Food & Drink
    const [spanishUnit3] = await db
      .insert(schema.units)
      .values({
        courseId: spanishCourse.id,
        title: 'Unit 3: Food & Drink',
        description: 'Learn about food and beverages',
        order: 3,
      })
      .returning();

    const [spanishLesson5] = await db
      .insert(schema.lessons)
      .values({
        unitId: spanishUnit3.id,
        title: 'Basic Foods',
        order: 1,
      })
      .returning();

    const [spanishChallenge15] = await db
      .insert(schema.challenges)
      .values({
        lessonId: spanishLesson5.id,
        type: 'SELECT',
        question: 'What does "pan" mean?',
        order: 1,
      })
      .returning();

    await db.insert(schema.challengeOptions).values([
      { challengeId: spanishChallenge15.id, text: 'Bread', correct: true },
      { challengeId: spanishChallenge15.id, text: 'Water', correct: false },
      { challengeId: spanishChallenge15.id, text: 'Milk', correct: false },
      { challengeId: spanishChallenge15.id, text: 'Cheese', correct: false },
    ]);

    const [spanishChallenge16] = await db
      .insert(schema.challenges)
      .values({
        lessonId: spanishLesson5.id,
        type: 'ASSIST',
        question: 'Translate "water" to Spanish',
        order: 2,
      })
      .returning();

    await db.insert(schema.challengeOptions).values([
      { challengeId: spanishChallenge16.id, text: 'Agua', correct: true },
      { challengeId: spanishChallenge16.id, text: 'Leche', correct: false },
      { challengeId: spanishChallenge16.id, text: 'Pan', correct: false },
      { challengeId: spanishChallenge16.id, text: 'Queso', correct: false },
    ]);

    const [spanishChallenge17] = await db
      .insert(schema.challenges)
      .values({
        lessonId: spanishLesson5.id,
        type: 'SELECT',
        question: 'What is "leche" in English?',
        order: 3,
      })
      .returning();

    await db.insert(schema.challengeOptions).values([
      {
        challengeId: spanishChallenge17.id,
        text: 'Milk',
        correct: true,
        audioSrc: '/audio/spanish/the-milk.mp3',
      },
      { challengeId: spanishChallenge17.id, text: 'Water', correct: false },
      { challengeId: spanishChallenge17.id, text: 'Bread', correct: false },
      { challengeId: spanishChallenge17.id, text: 'Cheese', correct: false },
    ]);

    // Spanish Unit 4: Travel
    const [spanishUnit4] = await db
      .insert(schema.units)
      .values({
        courseId: spanishCourse.id,
        title: 'Unit 4: Travel',
        description: 'Essential phrases for traveling',
        order: 4,
      })
      .returning();

    const [spanishLesson6] = await db
      .insert(schema.lessons)
      .values({
        unitId: spanishUnit4.id,
        title: 'Directions',
        order: 1,
      })
      .returning();

    const [spanishChallenge18] = await db
      .insert(schema.challenges)
      .values({
        lessonId: spanishLesson6.id,
        type: 'SELECT',
        question: 'What does "derecha" mean?',
        order: 1,
      })
      .returning();

    await db.insert(schema.challengeOptions).values([
      { challengeId: spanishChallenge18.id, text: 'Right', correct: true },
      { challengeId: spanishChallenge18.id, text: 'Left', correct: false },
      { challengeId: spanishChallenge18.id, text: 'Straight', correct: false },
      { challengeId: spanishChallenge18.id, text: 'Back', correct: false },
    ]);

    const [spanishChallenge19] = await db
      .insert(schema.challenges)
      .values({
        lessonId: spanishLesson6.id,
        type: 'ASSIST',
        question: 'Translate "left" to Spanish',
        order: 2,
      })
      .returning();

    await db.insert(schema.challengeOptions).values([
      { challengeId: spanishChallenge19.id, text: 'Izquierda', correct: true },
      { challengeId: spanishChallenge19.id, text: 'Derecha', correct: false },
      { challengeId: spanishChallenge19.id, text: 'Recto', correct: false },
      { challengeId: spanishChallenge19.id, text: 'Atrás', correct: false },
    ]);

    // Spanish Unit 5: Colors & Descriptions
    const [spanishUnit5] = await db
      .insert(schema.units)
      .values({
        courseId: spanishCourse.id,
        title: 'Unit 5: Colors & Descriptions',
        description: 'Learn colors and describing things',
        order: 5,
      })
      .returning();

    const [spanishLesson7] = await db
      .insert(schema.lessons)
      .values({
        unitId: spanishUnit5.id,
        title: 'Colors',
        order: 1,
      })
      .returning();

    const [spanishChallenge20] = await db
      .insert(schema.challenges)
      .values({
        lessonId: spanishLesson7.id,
        type: 'SELECT',
        question: 'What does "rojo" mean?',
        order: 1,
      })
      .returning();

    await db.insert(schema.challengeOptions).values([
      { challengeId: spanishChallenge20.id, text: 'Red', correct: true },
      { challengeId: spanishChallenge20.id, text: 'Blue', correct: false },
      { challengeId: spanishChallenge20.id, text: 'Green', correct: false },
      { challengeId: spanishChallenge20.id, text: 'Yellow', correct: false },
    ]);

    const [spanishChallenge21] = await db
      .insert(schema.challenges)
      .values({
        lessonId: spanishLesson7.id,
        type: 'ASSIST',
        question: 'Translate "blue" to Spanish',
        order: 2,
      })
      .returning();

    await db.insert(schema.challengeOptions).values([
      { challengeId: spanishChallenge21.id, text: 'Azul', correct: true },
      { challengeId: spanishChallenge21.id, text: 'Rojo', correct: false },
      { challengeId: spanishChallenge21.id, text: 'Verde', correct: false },
      { challengeId: spanishChallenge21.id, text: 'Amarillo', correct: false },
    ]);

    // Add more lessons to Spanish units
    const [spanishLesson8] = await db
      .insert(schema.lessons)
      .values({
        unitId: spanishUnit2.id,
        title: 'Describing People',
        order: 2,
      })
      .returning();

    const [spanishChallenge22] = await db
      .insert(schema.challenges)
      .values({
        lessonId: spanishLesson8.id,
        type: 'SELECT',
        question: 'What does "alto" mean?',
        order: 1,
      })
      .returning();

    await db.insert(schema.challengeOptions).values([
      { challengeId: spanishChallenge22.id, text: 'Tall', correct: true },
      { challengeId: spanishChallenge22.id, text: 'Short', correct: false },
      { challengeId: spanishChallenge22.id, text: 'Big', correct: false },
      { challengeId: spanishChallenge22.id, text: 'Small', correct: false },
    ]);

    const [spanishChallenge22b] = await db
      .insert(schema.challenges)
      .values({
        lessonId: spanishLesson8.id,
        type: 'ASSIST',
        question: 'Translate "short" to Spanish',
        order: 2,
      })
      .returning();

    await db.insert(schema.challengeOptions).values([
      { challengeId: spanishChallenge22b.id, text: 'Bajo', correct: true },
      { challengeId: spanishChallenge22b.id, text: 'Alto', correct: false },
      { challengeId: spanishChallenge22b.id, text: 'Grande', correct: false },
      { challengeId: spanishChallenge22b.id, text: 'Pequeño', correct: false },
    ]);

    const [spanishLesson9] = await db
      .insert(schema.lessons)
      .values({
        unitId: spanishUnit3.id,
        title: 'At the Restaurant',
        order: 2,
      })
      .returning();

    const [spanishChallenge23] = await db
      .insert(schema.challenges)
      .values({
        lessonId: spanishLesson9.id,
        type: 'ASSIST',
        question: 'How do you say "I would like" in Spanish?',
        order: 1,
      })
      .returning();

    await db.insert(schema.challengeOptions).values([
      { challengeId: spanishChallenge23.id, text: 'Quisiera', correct: true },
      { challengeId: spanishChallenge23.id, text: 'Quiero', correct: false },
      { challengeId: spanishChallenge23.id, text: 'Necesito', correct: false },
      { challengeId: spanishChallenge23.id, text: 'Tengo', correct: false },
    ]);

    const [spanishChallenge23b] = await db
      .insert(schema.challenges)
      .values({
        lessonId: spanishLesson9.id,
        type: 'SELECT',
        question: 'What does "la cuenta" mean?',
        order: 2,
      })
      .returning();

    await db.insert(schema.challengeOptions).values([
      { challengeId: spanishChallenge23b.id, text: 'The bill', correct: true },
      { challengeId: spanishChallenge23b.id, text: 'The menu', correct: false },
      {
        challengeId: spanishChallenge23b.id,
        text: 'The table',
        correct: false,
      },
      {
        challengeId: spanishChallenge23b.id,
        text: 'The waiter',
        correct: false,
      },
    ]);

    // ========== FRENCH COURSE ==========
    console.log('Creating French course...');
    const [frenchCourse] = await db
      .insert(schema.courses)
      .values({
        title: 'French',
        imageSrc: '/flags/FR.svg',
      })
      .returning();

    // French Unit 1: Basics
    const [frenchUnit1] = await db
      .insert(schema.units)
      .values({
        courseId: frenchCourse.id,
        title: 'Unit 1: Basics',
        description: 'Learn the fundamentals of French',
        order: 1,
      })
      .returning();

    // French Unit 1 - Lesson 1: Greetings
    const [frenchLesson1] = await db
      .insert(schema.lessons)
      .values({
        unitId: frenchUnit1.id,
        title: 'Greetings',
        order: 1,
      })
      .returning();

    const [frenchChallenge1] = await db
      .insert(schema.challenges)
      .values({
        lessonId: frenchLesson1.id,
        type: 'SELECT',
        question: 'Which word means "hello" in French?',
        order: 1,
      })
      .returning();

    await db.insert(schema.challengeOptions).values([
      { challengeId: frenchChallenge1.id, text: 'Bonjour', correct: true },
      { challengeId: frenchChallenge1.id, text: 'Au revoir', correct: false },
      { challengeId: frenchChallenge1.id, text: 'Merci', correct: false },
      {
        challengeId: frenchChallenge1.id,
        text: "S'il vous plaît",
        correct: false,
      },
    ]);

    const [frenchChallenge2] = await db
      .insert(schema.challenges)
      .values({
        lessonId: frenchLesson1.id,
        type: 'ASSIST',
        question: 'Translate "Good evening" to French',
        order: 2,
      })
      .returning();

    await db.insert(schema.challengeOptions).values([
      { challengeId: frenchChallenge2.id, text: 'Bonsoir', correct: true },
      { challengeId: frenchChallenge2.id, text: 'Bonjour', correct: false },
      { challengeId: frenchChallenge2.id, text: 'Bonne nuit', correct: false },
      {
        challengeId: frenchChallenge2.id,
        text: 'Bon après-midi',
        correct: false,
      },
    ]);

    const [frenchChallenge3] = await db
      .insert(schema.challenges)
      .values({
        lessonId: frenchLesson1.id,
        type: 'SELECT',
        question: 'How do you say "How are you?" in French?',
        order: 3,
      })
      .returning();

    await db.insert(schema.challengeOptions).values([
      {
        challengeId: frenchChallenge3.id,
        text: 'Comment allez-vous?',
        correct: true,
      },
      {
        challengeId: frenchChallenge3.id,
        text: 'Comment ça va?',
        correct: false,
      },
      {
        challengeId: frenchChallenge3.id,
        text: 'Quel est votre nom?',
        correct: false,
      },
      {
        challengeId: frenchChallenge3.id,
        text: 'Où habitez-vous?',
        correct: false,
      },
    ]);

    const [frenchChallenge4] = await db
      .insert(schema.challenges)
      .values({
        lessonId: frenchLesson1.id,
        type: 'ASSIST',
        question: 'What does "Salut" mean?',
        order: 4,
      })
      .returning();

    await db.insert(schema.challengeOptions).values([
      { challengeId: frenchChallenge4.id, text: 'Hi / Bye', correct: true },
      { challengeId: frenchChallenge4.id, text: 'Hello', correct: false },
      { challengeId: frenchChallenge4.id, text: 'Thank you', correct: false },
      { challengeId: frenchChallenge4.id, text: 'Please', correct: false },
    ]);

    // French Unit 1 - Lesson 2: Common Phrases
    const [frenchLesson2] = await db
      .insert(schema.lessons)
      .values({
        unitId: frenchUnit1.id,
        title: 'Common Phrases',
        order: 2,
      })
      .returning();

    const [frenchChallenge5] = await db
      .insert(schema.challenges)
      .values({
        lessonId: frenchLesson2.id,
        type: 'SELECT',
        question: 'What does "S\'il vous plaît" mean?',
        order: 1,
      })
      .returning();

    await db.insert(schema.challengeOptions).values([
      { challengeId: frenchChallenge5.id, text: 'Please', correct: true },
      { challengeId: frenchChallenge5.id, text: 'Thank you', correct: false },
      {
        challengeId: frenchChallenge5.id,
        text: "You're welcome",
        correct: false,
      },
      { challengeId: frenchChallenge5.id, text: 'Excuse me', correct: false },
    ]);

    const [frenchChallenge6] = await db
      .insert(schema.challenges)
      .values({
        lessonId: frenchLesson2.id,
        type: 'ASSIST',
        question: 'Translate "Thank you" to French',
        order: 2,
      })
      .returning();

    await db.insert(schema.challengeOptions).values([
      { challengeId: frenchChallenge6.id, text: 'Merci', correct: true },
      {
        challengeId: frenchChallenge6.id,
        text: "S'il vous plaît",
        correct: false,
      },
      { challengeId: frenchChallenge6.id, text: 'De rien', correct: false },
      { challengeId: frenchChallenge6.id, text: 'Pardon', correct: false },
    ]);

    const [frenchChallenge7] = await db
      .insert(schema.challenges)
      .values({
        lessonId: frenchLesson2.id,
        type: 'SELECT',
        question: 'How do you say "You\'re welcome" in French?',
        order: 3,
      })
      .returning();

    await db.insert(schema.challengeOptions).values([
      { challengeId: frenchChallenge7.id, text: 'De rien', correct: true },
      { challengeId: frenchChallenge7.id, text: 'Merci', correct: false },
      {
        challengeId: frenchChallenge7.id,
        text: "S'il vous plaît",
        correct: false,
      },
      {
        challengeId: frenchChallenge7.id,
        text: 'Je suis désolé',
        correct: false,
      },
    ]);

    // French Unit 1 - Lesson 3: Numbers
    const [frenchLesson3] = await db
      .insert(schema.lessons)
      .values({
        unitId: frenchUnit1.id,
        title: 'Numbers 1-10',
        order: 3,
      })
      .returning();

    const [frenchChallenge8] = await db
      .insert(schema.challenges)
      .values({
        lessonId: frenchLesson3.id,
        type: 'SELECT',
        question: 'What is "un" in English?',
        order: 1,
      })
      .returning();

    await db.insert(schema.challengeOptions).values([
      { challengeId: frenchChallenge8.id, text: 'One', correct: true },
      { challengeId: frenchChallenge8.id, text: 'Two', correct: false },
      { challengeId: frenchChallenge8.id, text: 'Three', correct: false },
      { challengeId: frenchChallenge8.id, text: 'Four', correct: false },
    ]);

    const [frenchChallenge9] = await db
      .insert(schema.challenges)
      .values({
        lessonId: frenchLesson3.id,
        type: 'ASSIST',
        question: 'Translate "five" to French',
        order: 2,
      })
      .returning();

    await db.insert(schema.challengeOptions).values([
      { challengeId: frenchChallenge9.id, text: 'Cinq', correct: true },
      { challengeId: frenchChallenge9.id, text: 'Quatre', correct: false },
      { challengeId: frenchChallenge9.id, text: 'Six', correct: false },
      { challengeId: frenchChallenge9.id, text: 'Sept', correct: false },
    ]);

    // French Unit 2: People & Family
    const [frenchUnit2] = await db
      .insert(schema.units)
      .values({
        courseId: frenchCourse.id,
        title: 'Unit 2: People & Family',
        description: 'Learn to talk about people and family',
        order: 2,
      })
      .returning();

    const [frenchLesson4] = await db
      .insert(schema.lessons)
      .values({
        unitId: frenchUnit2.id,
        title: 'Family Members',
        order: 1,
      })
      .returning();

    const [frenchChallenge10] = await db
      .insert(schema.challenges)
      .values({
        lessonId: frenchLesson4.id,
        type: 'SELECT',
        question: 'What does "mère" mean?',
        order: 1,
      })
      .returning();

    await db.insert(schema.challengeOptions).values([
      { challengeId: frenchChallenge10.id, text: 'Mother', correct: true },
      { challengeId: frenchChallenge10.id, text: 'Father', correct: false },
      { challengeId: frenchChallenge10.id, text: 'Sister', correct: false },
      { challengeId: frenchChallenge10.id, text: 'Brother', correct: false },
    ]);

    const [frenchChallenge11] = await db
      .insert(schema.challenges)
      .values({
        lessonId: frenchLesson4.id,
        type: 'ASSIST',
        question: 'Translate "father" to French',
        order: 2,
      })
      .returning();

    await db.insert(schema.challengeOptions).values([
      { challengeId: frenchChallenge11.id, text: 'Père', correct: true },
      { challengeId: frenchChallenge11.id, text: 'Mère', correct: false },
      { challengeId: frenchChallenge11.id, text: 'Frère', correct: false },
      { challengeId: frenchChallenge11.id, text: 'Sœur', correct: false },
    ]);

    const [frenchChallenge12] = await db
      .insert(schema.challenges)
      .values({
        lessonId: frenchLesson4.id,
        type: 'SELECT',
        question: 'What is "sœur" in English?',
        order: 3,
      })
      .returning();

    await db.insert(schema.challengeOptions).values([
      { challengeId: frenchChallenge12.id, text: 'Sister', correct: true },
      { challengeId: frenchChallenge12.id, text: 'Brother', correct: false },
      { challengeId: frenchChallenge12.id, text: 'Mother', correct: false },
      { challengeId: frenchChallenge12.id, text: 'Father', correct: false },
    ]);

    // French Unit 3: Food & Drink
    const [frenchUnit3] = await db
      .insert(schema.units)
      .values({
        courseId: frenchCourse.id,
        title: 'Unit 3: Food & Drink',
        description: 'Learn about food and beverages',
        order: 3,
      })
      .returning();

    const [frenchLesson5] = await db
      .insert(schema.lessons)
      .values({
        unitId: frenchUnit3.id,
        title: 'Basic Foods',
        order: 1,
      })
      .returning();

    const [frenchChallenge13] = await db
      .insert(schema.challenges)
      .values({
        lessonId: frenchLesson5.id,
        type: 'SELECT',
        question: 'What does "pain" mean?',
        order: 1,
      })
      .returning();

    await db.insert(schema.challengeOptions).values([
      { challengeId: frenchChallenge13.id, text: 'Bread', correct: true },
      { challengeId: frenchChallenge13.id, text: 'Water', correct: false },
      { challengeId: frenchChallenge13.id, text: 'Milk', correct: false },
      { challengeId: frenchChallenge13.id, text: 'Cheese', correct: false },
    ]);

    const [frenchChallenge14] = await db
      .insert(schema.challenges)
      .values({
        lessonId: frenchLesson5.id,
        type: 'ASSIST',
        question: 'Translate "water" to French',
        order: 2,
      })
      .returning();

    await db.insert(schema.challengeOptions).values([
      { challengeId: frenchChallenge14.id, text: 'Eau', correct: true },
      { challengeId: frenchChallenge14.id, text: 'Lait', correct: false },
      { challengeId: frenchChallenge14.id, text: 'Pain', correct: false },
      { challengeId: frenchChallenge14.id, text: 'Fromage', correct: false },
    ]);

    const [frenchChallenge15] = await db
      .insert(schema.challenges)
      .values({
        lessonId: frenchLesson5.id,
        type: 'SELECT',
        question: 'What is "lait" in English?',
        order: 3,
      })
      .returning();

    await db.insert(schema.challengeOptions).values([
      { challengeId: frenchChallenge15.id, text: 'Milk', correct: true },
      { challengeId: frenchChallenge15.id, text: 'Water', correct: false },
      { challengeId: frenchChallenge15.id, text: 'Bread', correct: false },
      { challengeId: frenchChallenge15.id, text: 'Cheese', correct: false },
    ]);

    // French Unit 4: Travel
    const [frenchUnit4] = await db
      .insert(schema.units)
      .values({
        courseId: frenchCourse.id,
        title: 'Unit 4: Travel',
        description: 'Essential phrases for traveling',
        order: 4,
      })
      .returning();

    const [frenchLesson6] = await db
      .insert(schema.lessons)
      .values({
        unitId: frenchUnit4.id,
        title: 'Directions',
        order: 1,
      })
      .returning();

    const [frenchChallenge16] = await db
      .insert(schema.challenges)
      .values({
        lessonId: frenchLesson6.id,
        type: 'SELECT',
        question: 'What does "droite" mean?',
        order: 1,
      })
      .returning();

    await db.insert(schema.challengeOptions).values([
      { challengeId: frenchChallenge16.id, text: 'Right', correct: true },
      { challengeId: frenchChallenge16.id, text: 'Left', correct: false },
      { challengeId: frenchChallenge16.id, text: 'Straight', correct: false },
      { challengeId: frenchChallenge16.id, text: 'Back', correct: false },
    ]);

    const [frenchChallenge17] = await db
      .insert(schema.challenges)
      .values({
        lessonId: frenchLesson6.id,
        type: 'ASSIST',
        question: 'Translate "left" to French',
        order: 2,
      })
      .returning();

    await db.insert(schema.challengeOptions).values([
      { challengeId: frenchChallenge17.id, text: 'Gauche', correct: true },
      { challengeId: frenchChallenge17.id, text: 'Droite', correct: false },
      { challengeId: frenchChallenge17.id, text: 'Tout droit', correct: false },
      { challengeId: frenchChallenge17.id, text: 'En arrière', correct: false },
    ]);

    // French Unit 5: Colors & Descriptions
    const [frenchUnit5] = await db
      .insert(schema.units)
      .values({
        courseId: frenchCourse.id,
        title: 'Unit 5: Colors & Descriptions',
        description: 'Learn colors and describing things',
        order: 5,
      })
      .returning();

    const [frenchLesson7] = await db
      .insert(schema.lessons)
      .values({
        unitId: frenchUnit5.id,
        title: 'Colors',
        order: 1,
      })
      .returning();

    const [frenchChallenge18] = await db
      .insert(schema.challenges)
      .values({
        lessonId: frenchLesson7.id,
        type: 'SELECT',
        question: 'What does "rouge" mean?',
        order: 1,
      })
      .returning();

    await db.insert(schema.challengeOptions).values([
      { challengeId: frenchChallenge18.id, text: 'Red', correct: true },
      { challengeId: frenchChallenge18.id, text: 'Blue', correct: false },
      { challengeId: frenchChallenge18.id, text: 'Green', correct: false },
      { challengeId: frenchChallenge18.id, text: 'Yellow', correct: false },
    ]);

    const [frenchChallenge19] = await db
      .insert(schema.challenges)
      .values({
        lessonId: frenchLesson7.id,
        type: 'ASSIST',
        question: 'Translate "blue" to French',
        order: 2,
      })
      .returning();

    await db.insert(schema.challengeOptions).values([
      { challengeId: frenchChallenge19.id, text: 'Bleu', correct: true },
      { challengeId: frenchChallenge19.id, text: 'Rouge', correct: false },
      { challengeId: frenchChallenge19.id, text: 'Vert', correct: false },
      { challengeId: frenchChallenge19.id, text: 'Jaune', correct: false },
    ]);

    // Add more lessons to French units
    const [frenchLesson8] = await db
      .insert(schema.lessons)
      .values({
        unitId: frenchUnit2.id,
        title: 'Describing People',
        order: 2,
      })
      .returning();

    const [frenchChallenge20] = await db
      .insert(schema.challenges)
      .values({
        lessonId: frenchLesson8.id,
        type: 'SELECT',
        question: 'What does "grand" mean?',
        order: 1,
      })
      .returning();

    await db.insert(schema.challengeOptions).values([
      { challengeId: frenchChallenge20.id, text: 'Tall / Big', correct: true },
      {
        challengeId: frenchChallenge20.id,
        text: 'Short / Small',
        correct: false,
      },
      { challengeId: frenchChallenge20.id, text: 'Beautiful', correct: false },
      { challengeId: frenchChallenge20.id, text: 'Ugly', correct: false },
    ]);

    const [frenchChallenge20b] = await db
      .insert(schema.challenges)
      .values({
        lessonId: frenchLesson8.id,
        type: 'ASSIST',
        question: 'Translate "short" to French',
        order: 2,
      })
      .returning();

    await db.insert(schema.challengeOptions).values([
      { challengeId: frenchChallenge20b.id, text: 'Petit', correct: true },
      { challengeId: frenchChallenge20b.id, text: 'Grand', correct: false },
      { challengeId: frenchChallenge20b.id, text: 'Beau', correct: false },
      { challengeId: frenchChallenge20b.id, text: 'Moche', correct: false },
    ]);

    const [frenchLesson9] = await db
      .insert(schema.lessons)
      .values({
        unitId: frenchUnit3.id,
        title: 'At the Restaurant',
        order: 2,
      })
      .returning();

    const [frenchChallenge21] = await db
      .insert(schema.challenges)
      .values({
        lessonId: frenchLesson9.id,
        type: 'ASSIST',
        question: 'How do you say "I would like" in French?',
        order: 1,
      })
      .returning();

    await db.insert(schema.challengeOptions).values([
      { challengeId: frenchChallenge21.id, text: 'Je voudrais', correct: true },
      { challengeId: frenchChallenge21.id, text: 'Je veux', correct: false },
      {
        challengeId: frenchChallenge21.id,
        text: "J'ai besoin",
        correct: false,
      },
      { challengeId: frenchChallenge21.id, text: "J'ai", correct: false },
    ]);

    const [frenchChallenge21b] = await db
      .insert(schema.challenges)
      .values({
        lessonId: frenchLesson9.id,
        type: 'SELECT',
        question: 'What does "l\'addition" mean?',
        order: 2,
      })
      .returning();

    await db.insert(schema.challengeOptions).values([
      { challengeId: frenchChallenge21b.id, text: 'The bill', correct: true },
      { challengeId: frenchChallenge21b.id, text: 'The menu', correct: false },
      { challengeId: frenchChallenge21b.id, text: 'The table', correct: false },
      {
        challengeId: frenchChallenge21b.id,
        text: 'The waiter',
        correct: false,
      },
    ]);

    // Spanish Unit 1 - Lesson 4: Pronouns
    const [spanishLesson10] = await db
      .insert(schema.lessons)
      .values({
        unitId: spanishUnit1.id,
        title: 'Pronouns',
        order: 4,
      })
      .returning();

    const [spanishChallenge27] = await db
      .insert(schema.challenges)
      .values({
        lessonId: spanishLesson10.id,
        type: 'SELECT',
        question: 'What does "yo" mean?',
        order: 1,
      })
      .returning();

    await db.insert(schema.challengeOptions).values([
      { challengeId: spanishChallenge27.id, text: 'I', correct: true },
      { challengeId: spanishChallenge27.id, text: 'You', correct: false },
      { challengeId: spanishChallenge27.id, text: 'He', correct: false },
      { challengeId: spanishChallenge27.id, text: 'She', correct: false },
    ]);

    const [spanishChallenge28] = await db
      .insert(schema.challenges)
      .values({
        lessonId: spanishLesson10.id,
        type: 'ASSIST',
        question: 'Translate "you" (informal) to Spanish',
        order: 2,
      })
      .returning();

    await db.insert(schema.challengeOptions).values([
      { challengeId: spanishChallenge28.id, text: 'Tú', correct: true },
      { challengeId: spanishChallenge28.id, text: 'Yo', correct: false },
      { challengeId: spanishChallenge28.id, text: 'Él', correct: false },
      { challengeId: spanishChallenge28.id, text: 'Ella', correct: false },
    ]);

    // Spanish Unit 2 - Lesson 3: More Family
    const [spanishLesson11] = await db
      .insert(schema.lessons)
      .values({
        unitId: spanishUnit2.id,
        title: 'Extended Family',
        order: 3,
      })
      .returning();

    const [spanishChallenge29] = await db
      .insert(schema.challenges)
      .values({
        lessonId: spanishLesson11.id,
        type: 'SELECT',
        question: 'What does "abuelo" mean?',
        order: 1,
      })
      .returning();

    await db.insert(schema.challengeOptions).values([
      {
        challengeId: spanishChallenge29.id,
        text: 'Grandfather',
        correct: true,
      },
      {
        challengeId: spanishChallenge29.id,
        text: 'Grandmother',
        correct: false,
      },
      { challengeId: spanishChallenge29.id, text: 'Uncle', correct: false },
      { challengeId: spanishChallenge29.id, text: 'Aunt', correct: false },
    ]);

    const [spanishChallenge29b] = await db
      .insert(schema.challenges)
      .values({
        lessonId: spanishLesson11.id,
        type: 'ASSIST',
        question: 'Translate "grandmother" to Spanish',
        order: 2,
      })
      .returning();

    await db.insert(schema.challengeOptions).values([
      { challengeId: spanishChallenge29b.id, text: 'Abuela', correct: true },
      { challengeId: spanishChallenge29b.id, text: 'Abuelo', correct: false },
      { challengeId: spanishChallenge29b.id, text: 'Tío', correct: false },
      { challengeId: spanishChallenge29b.id, text: 'Tía', correct: false },
    ]);

    // Spanish Unit 2 - Lesson 4: Relationships
    const [spanishLesson15] = await db
      .insert(schema.lessons)
      .values({
        unitId: spanishUnit2.id,
        title: 'Relationships',
        order: 4,
      })
      .returning();

    const [spanishChallenge33] = await db
      .insert(schema.challenges)
      .values({
        lessonId: spanishLesson15.id,
        type: 'SELECT',
        question: 'What does "amigo" mean?',
        order: 1,
      })
      .returning();

    await db.insert(schema.challengeOptions).values([
      { challengeId: spanishChallenge33.id, text: 'Friend', correct: true },
      { challengeId: spanishChallenge33.id, text: 'Enemy', correct: false },
      { challengeId: spanishChallenge33.id, text: 'Neighbor', correct: false },
      { challengeId: spanishChallenge33.id, text: 'Colleague', correct: false },
    ]);

    const [spanishChallenge34] = await db
      .insert(schema.challenges)
      .values({
        lessonId: spanishLesson15.id,
        type: 'ASSIST',
        question: 'Translate "neighbor" to Spanish',
        order: 2,
      })
      .returning();

    await db.insert(schema.challengeOptions).values([
      { challengeId: spanishChallenge34.id, text: 'Vecino', correct: true },
      { challengeId: spanishChallenge34.id, text: 'Amigo', correct: false },
      { challengeId: spanishChallenge34.id, text: 'Familiar', correct: false },
      { challengeId: spanishChallenge34.id, text: 'Conocido', correct: false },
    ]);

    // Spanish Unit 2 - Lesson 5: Age & Descriptions
    const [spanishLesson16] = await db
      .insert(schema.lessons)
      .values({
        unitId: spanishUnit2.id,
        title: 'Age & Descriptions',
        order: 5,
      })
      .returning();

    const [spanishChallenge35] = await db
      .insert(schema.challenges)
      .values({
        lessonId: spanishLesson16.id,
        type: 'SELECT',
        question: 'What does "joven" mean?',
        order: 1,
      })
      .returning();

    await db.insert(schema.challengeOptions).values([
      { challengeId: spanishChallenge35.id, text: 'Young', correct: true },
      { challengeId: spanishChallenge35.id, text: 'Old', correct: false },
      { challengeId: spanishChallenge35.id, text: 'Middle-aged', correct: false },
      { challengeId: spanishChallenge35.id, text: 'Teenager', correct: false },
    ]);

    const [spanishChallenge36] = await db
      .insert(schema.challenges)
      .values({
        lessonId: spanishLesson16.id,
        type: 'ASSIST',
        question: 'Translate "old" to Spanish',
        order: 2,
      })
      .returning();

    await db.insert(schema.challengeOptions).values([
      { challengeId: spanishChallenge36.id, text: 'Viejo', correct: true },
      { challengeId: spanishChallenge36.id, text: 'Joven', correct: false },
      { challengeId: spanishChallenge36.id, text: 'Nuevo', correct: false },
      { challengeId: spanishChallenge36.id, text: 'Antiguo', correct: false },
    ]);

    // Spanish Unit 3 - Lesson 3: Drinks
    const [spanishLesson12] = await db
      .insert(schema.lessons)
      .values({
        unitId: spanishUnit3.id,
        title: 'Drinks',
        order: 3,
      })
      .returning();

    const [spanishChallenge30] = await db
      .insert(schema.challenges)
      .values({
        lessonId: spanishLesson12.id,
        type: 'SELECT',
        question: 'What does "café" mean?',
        order: 1,
      })
      .returning();

    await db.insert(schema.challengeOptions).values([
      { challengeId: spanishChallenge30.id, text: 'Coffee', correct: true },
      { challengeId: spanishChallenge30.id, text: 'Tea', correct: false },
      { challengeId: spanishChallenge30.id, text: 'Juice', correct: false },
      { challengeId: spanishChallenge30.id, text: 'Wine', correct: false },
    ]);

    const [spanishChallenge30b] = await db
      .insert(schema.challenges)
      .values({
        lessonId: spanishLesson12.id,
        type: 'ASSIST',
        question: 'Translate "juice" to Spanish',
        order: 2,
      })
      .returning();

    await db.insert(schema.challengeOptions).values([
      { challengeId: spanishChallenge30b.id, text: 'Jugo', correct: true },
      { challengeId: spanishChallenge30b.id, text: 'Café', correct: false },
      { challengeId: spanishChallenge30b.id, text: 'Agua', correct: false },
      { challengeId: spanishChallenge30b.id, text: 'Leche', correct: false },
    ]);

    // Spanish Unit 3 - Lesson 4: Fruits
    const [spanishLesson17] = await db
      .insert(schema.lessons)
      .values({
        unitId: spanishUnit3.id,
        title: 'Fruits',
        order: 4,
      })
      .returning();

    const [spanishChallenge37] = await db
      .insert(schema.challenges)
      .values({
        lessonId: spanishLesson17.id,
        type: 'SELECT',
        question: 'What does "manzana" mean?',
        order: 1,
      })
      .returning();

    await db.insert(schema.challengeOptions).values([
      { challengeId: spanishChallenge37.id, text: 'Apple', correct: true },
      { challengeId: spanishChallenge37.id, text: 'Orange', correct: false },
      { challengeId: spanishChallenge37.id, text: 'Banana', correct: false },
      { challengeId: spanishChallenge37.id, text: 'Grape', correct: false },
    ]);

    const [spanishChallenge38] = await db
      .insert(schema.challenges)
      .values({
        lessonId: spanishLesson17.id,
        type: 'ASSIST',
        question: 'Translate "banana" to Spanish',
        order: 2,
      })
      .returning();

    await db.insert(schema.challengeOptions).values([
      { challengeId: spanishChallenge38.id, text: 'Plátano', correct: true },
      { challengeId: spanishChallenge38.id, text: 'Manzana', correct: false },
      { challengeId: spanishChallenge38.id, text: 'Naranja', correct: false },
      { challengeId: spanishChallenge38.id, text: 'Uva', correct: false },
    ]);

    // Spanish Unit 3 - Lesson 5: Vegetables
    const [spanishLesson18] = await db
      .insert(schema.lessons)
      .values({
        unitId: spanishUnit3.id,
        title: 'Vegetables',
        order: 5,
      })
      .returning();

    const [spanishChallenge39] = await db
      .insert(schema.challenges)
      .values({
        lessonId: spanishLesson18.id,
        type: 'SELECT',
        question: 'What does "tomate" mean?',
        order: 1,
      })
      .returning();

    await db.insert(schema.challengeOptions).values([
      { challengeId: spanishChallenge39.id, text: 'Tomato', correct: true },
      { challengeId: spanishChallenge39.id, text: 'Potato', correct: false },
      { challengeId: spanishChallenge39.id, text: 'Carrot', correct: false },
      { challengeId: spanishChallenge39.id, text: 'Onion', correct: false },
    ]);

    const [spanishChallenge40] = await db
      .insert(schema.challenges)
      .values({
        lessonId: spanishLesson18.id,
        type: 'ASSIST',
        question: 'Translate "carrot" to Spanish',
        order: 2,
      })
      .returning();

    await db.insert(schema.challengeOptions).values([
      { challengeId: spanishChallenge40.id, text: 'Zanahoria', correct: true },
      { challengeId: spanishChallenge40.id, text: 'Tomate', correct: false },
      { challengeId: spanishChallenge40.id, text: 'Papa', correct: false },
      { challengeId: spanishChallenge40.id, text: 'Cebolla', correct: false },
    ]);

    // Spanish Unit 4 - Lesson 2: Transportation
    const [spanishLesson13] = await db
      .insert(schema.lessons)
      .values({
        unitId: spanishUnit4.id,
        title: 'Transportation',
        order: 2,
      })
      .returning();

    const [spanishChallenge31] = await db
      .insert(schema.challenges)
      .values({
        lessonId: spanishLesson13.id,
        type: 'SELECT',
        question: 'What does "coche" mean?',
        order: 1,
      })
      .returning();

    await db.insert(schema.challengeOptions).values([
      { challengeId: spanishChallenge31.id, text: 'Car', correct: true },
      { challengeId: spanishChallenge31.id, text: 'Bus', correct: false },
      { challengeId: spanishChallenge31.id, text: 'Train', correct: false },
      { challengeId: spanishChallenge31.id, text: 'Plane', correct: false },
    ]);

    const [spanishChallenge31b] = await db
      .insert(schema.challenges)
      .values({
        lessonId: spanishLesson13.id,
        type: 'ASSIST',
        question: 'Translate "bus" to Spanish',
        order: 2,
      })
      .returning();

    await db.insert(schema.challengeOptions).values([
      { challengeId: spanishChallenge31b.id, text: 'Autobús', correct: true },
      { challengeId: spanishChallenge31b.id, text: 'Coche', correct: false },
      { challengeId: spanishChallenge31b.id, text: 'Tren', correct: false },
      { challengeId: spanishChallenge31b.id, text: 'Avión', correct: false },
    ]);

    // Spanish Unit 4 - Lesson 3: Asking for Directions
    const [spanishLesson19] = await db
      .insert(schema.lessons)
      .values({
        unitId: spanishUnit4.id,
        title: 'Asking for Directions',
        order: 3,
      })
      .returning();

    const [spanishChallenge41] = await db
      .insert(schema.challenges)
      .values({
        lessonId: spanishLesson19.id,
        type: 'SELECT',
        question: 'How do you say "Where is..." in Spanish?',
        order: 1,
      })
      .returning();

    await db.insert(schema.challengeOptions).values([
      { challengeId: spanishChallenge41.id, text: '¿Dónde está...?', correct: true },
      { challengeId: spanishChallenge41.id, text: '¿Cómo está...?', correct: false },
      { challengeId: spanishChallenge41.id, text: '¿Qué es...?', correct: false },
      { challengeId: spanishChallenge41.id, text: '¿Cuándo es...?', correct: false },
    ]);

    const [spanishChallenge42] = await db
      .insert(schema.challenges)
      .values({
        lessonId: spanishLesson19.id,
        type: 'ASSIST',
        question: 'Translate "straight ahead" to Spanish',
        order: 2,
      })
      .returning();

    await db.insert(schema.challengeOptions).values([
      { challengeId: spanishChallenge42.id, text: 'Recto', correct: true },
      { challengeId: spanishChallenge42.id, text: 'Derecha', correct: false },
      { challengeId: spanishChallenge42.id, text: 'Izquierda', correct: false },
      { challengeId: spanishChallenge42.id, text: 'Atrás', correct: false },
    ]);

    // Spanish Unit 4 - Lesson 4: Hotel & Accommodation
    const [spanishLesson20] = await db
      .insert(schema.lessons)
      .values({
        unitId: spanishUnit4.id,
        title: 'Hotel & Accommodation',
        order: 4,
      })
      .returning();

    const [spanishChallenge43] = await db
      .insert(schema.challenges)
      .values({
        lessonId: spanishLesson20.id,
        type: 'SELECT',
        question: 'What does "hotel" mean in Spanish?',
        order: 1,
      })
      .returning();

    await db.insert(schema.challengeOptions).values([
      { challengeId: spanishChallenge43.id, text: 'Hotel', correct: true },
      { challengeId: spanishChallenge43.id, text: 'House', correct: false },
      { challengeId: spanishChallenge43.id, text: 'Room', correct: false },
      { challengeId: spanishChallenge43.id, text: 'Bed', correct: false },
    ]);

    const [spanishChallenge44] = await db
      .insert(schema.challenges)
      .values({
        lessonId: spanishLesson20.id,
        type: 'ASSIST',
        question: 'Translate "room" to Spanish',
        order: 2,
      })
      .returning();

    await db.insert(schema.challengeOptions).values([
      { challengeId: spanishChallenge44.id, text: 'Habitación', correct: true },
      { challengeId: spanishChallenge44.id, text: 'Hotel', correct: false },
      { challengeId: spanishChallenge44.id, text: 'Cama', correct: false },
      { challengeId: spanishChallenge44.id, text: 'Baño', correct: false },
    ]);

    // Spanish Unit 4 - Lesson 5: At the Airport
    const [spanishLesson21] = await db
      .insert(schema.lessons)
      .values({
        unitId: spanishUnit4.id,
        title: 'At the Airport',
        order: 5,
      })
      .returning();

    const [spanishChallenge45] = await db
      .insert(schema.challenges)
      .values({
        lessonId: spanishLesson21.id,
        type: 'SELECT',
        question: 'What does "aeropuerto" mean?',
        order: 1,
      })
      .returning();

    await db.insert(schema.challengeOptions).values([
      { challengeId: spanishChallenge45.id, text: 'Airport', correct: true },
      { challengeId: spanishChallenge45.id, text: 'Airplane', correct: false },
      { challengeId: spanishChallenge45.id, text: 'Ticket', correct: false },
      { challengeId: spanishChallenge45.id, text: 'Passport', correct: false },
    ]);

    const [spanishChallenge46] = await db
      .insert(schema.challenges)
      .values({
        lessonId: spanishLesson21.id,
        type: 'ASSIST',
        question: 'Translate "ticket" to Spanish',
        order: 2,
      })
      .returning();

    await db.insert(schema.challengeOptions).values([
      { challengeId: spanishChallenge46.id, text: 'Boleto', correct: true },
      { challengeId: spanishChallenge46.id, text: 'Aeropuerto', correct: false },
      { challengeId: spanishChallenge46.id, text: 'Avión', correct: false },
      { challengeId: spanishChallenge46.id, text: 'Pasaporte', correct: false },
    ]);

    // Spanish Unit 5 - Lesson 2: More Colors
    const [spanishLesson14] = await db
      .insert(schema.lessons)
      .values({
        unitId: spanishUnit5.id,
        title: 'More Colors',
        order: 2,
      })
      .returning();

    const [spanishChallenge32] = await db
      .insert(schema.challenges)
      .values({
        lessonId: spanishLesson14.id,
        type: 'ASSIST',
        question: 'Translate "green" to Spanish',
        order: 1,
      })
      .returning();

    await db.insert(schema.challengeOptions).values([
      { challengeId: spanishChallenge32.id, text: 'Verde', correct: true },
      { challengeId: spanishChallenge32.id, text: 'Rojo', correct: false },
      { challengeId: spanishChallenge32.id, text: 'Azul', correct: false },
      { challengeId: spanishChallenge32.id, text: 'Amarillo', correct: false },
    ]);

    const [spanishChallenge32b] = await db
      .insert(schema.challenges)
      .values({
        lessonId: spanishLesson14.id,
        type: 'SELECT',
        question: 'What does "amarillo" mean?',
        order: 2,
      })
      .returning();

    await db.insert(schema.challengeOptions).values([
      { challengeId: spanishChallenge32b.id, text: 'Yellow', correct: true },
      { challengeId: spanishChallenge32b.id, text: 'Green', correct: false },
      { challengeId: spanishChallenge32b.id, text: 'Orange', correct: false },
      { challengeId: spanishChallenge32b.id, text: 'Purple', correct: false },
    ]);

    // Spanish Unit 5 - Lesson 3: Sizes
    const [spanishLesson22] = await db
      .insert(schema.lessons)
      .values({
        unitId: spanishUnit5.id,
        title: 'Sizes',
        order: 3,
      })
      .returning();

    const [spanishChallenge47] = await db
      .insert(schema.challenges)
      .values({
        lessonId: spanishLesson22.id,
        type: 'SELECT',
        question: 'What does "grande" mean?',
        order: 1,
      })
      .returning();

    await db.insert(schema.challengeOptions).values([
      { challengeId: spanishChallenge47.id, text: 'Big / Large', correct: true },
      { challengeId: spanishChallenge47.id, text: 'Small', correct: false },
      { challengeId: spanishChallenge47.id, text: 'Medium', correct: false },
      { challengeId: spanishChallenge47.id, text: 'Huge', correct: false },
    ]);

    const [spanishChallenge48] = await db
      .insert(schema.challenges)
      .values({
        lessonId: spanishLesson22.id,
        type: 'ASSIST',
        question: 'Translate "small" to Spanish',
        order: 2,
      })
      .returning();

    await db.insert(schema.challengeOptions).values([
      { challengeId: spanishChallenge48.id, text: 'Pequeño', correct: true },
      { challengeId: spanishChallenge48.id, text: 'Grande', correct: false },
      { challengeId: spanishChallenge48.id, text: 'Mediano', correct: false },
      { challengeId: spanishChallenge48.id, text: 'Enorme', correct: false },
    ]);

    // Spanish Unit 5 - Lesson 4: Shapes
    const [spanishLesson23] = await db
      .insert(schema.lessons)
      .values({
        unitId: spanishUnit5.id,
        title: 'Shapes',
        order: 4,
      })
      .returning();

    const [spanishChallenge49] = await db
      .insert(schema.challenges)
      .values({
        lessonId: spanishLesson23.id,
        type: 'SELECT',
        question: 'What does "círculo" mean?',
        order: 1,
      })
      .returning();

    await db.insert(schema.challengeOptions).values([
      { challengeId: spanishChallenge49.id, text: 'Circle', correct: true },
      { challengeId: spanishChallenge49.id, text: 'Square', correct: false },
      { challengeId: spanishChallenge49.id, text: 'Triangle', correct: false },
      { challengeId: spanishChallenge49.id, text: 'Rectangle', correct: false },
    ]);

    const [spanishChallenge50] = await db
      .insert(schema.challenges)
      .values({
        lessonId: spanishLesson23.id,
        type: 'ASSIST',
        question: 'Translate "square" to Spanish',
        order: 2,
      })
      .returning();

    await db.insert(schema.challengeOptions).values([
      { challengeId: spanishChallenge50.id, text: 'Cuadrado', correct: true },
      { challengeId: spanishChallenge50.id, text: 'Círculo', correct: false },
      { challengeId: spanishChallenge50.id, text: 'Triángulo', correct: false },
      { challengeId: spanishChallenge50.id, text: 'Rectángulo', correct: false },
    ]);

    // Spanish Unit 5 - Lesson 5: Adjectives
    const [spanishLesson24] = await db
      .insert(schema.lessons)
      .values({
        unitId: spanishUnit5.id,
        title: 'Adjectives',
        order: 5,
      })
      .returning();

    const [spanishChallenge51] = await db
      .insert(schema.challenges)
      .values({
        lessonId: spanishLesson24.id,
        type: 'SELECT',
        question: 'What does "bonito" mean?',
        order: 1,
      })
      .returning();

    await db.insert(schema.challengeOptions).values([
      { challengeId: spanishChallenge51.id, text: 'Beautiful / Pretty', correct: true },
      { challengeId: spanishChallenge51.id, text: 'Ugly', correct: false },
      { challengeId: spanishChallenge51.id, text: 'Nice', correct: false },
      { challengeId: spanishChallenge51.id, text: 'Good', correct: false },
    ]);

    const [spanishChallenge52] = await db
      .insert(schema.challenges)
      .values({
        lessonId: spanishLesson24.id,
        type: 'ASSIST',
        question: 'Translate "ugly" to Spanish',
        order: 2,
      })
      .returning();

    await db.insert(schema.challengeOptions).values([
      { challengeId: spanishChallenge52.id, text: 'Feo', correct: true },
      { challengeId: spanishChallenge52.id, text: 'Bonito', correct: false },
      { challengeId: spanishChallenge52.id, text: 'Bueno', correct: false },
      { challengeId: spanishChallenge52.id, text: 'Malo', correct: false },
    ]);

    // Spanish Unit 1 - Lesson 5: Days of the Week
    const [spanishLesson25] = await db
      .insert(schema.lessons)
      .values({
        unitId: spanishUnit1.id,
        title: 'Days of the Week',
        order: 5,
      })
      .returning();

    const [spanishChallenge53] = await db
      .insert(schema.challenges)
      .values({
        lessonId: spanishLesson25.id,
        type: 'SELECT',
        question: 'What does "lunes" mean?',
        order: 1,
      })
      .returning();

    await db.insert(schema.challengeOptions).values([
      { challengeId: spanishChallenge53.id, text: 'Monday', correct: true },
      { challengeId: spanishChallenge53.id, text: 'Tuesday', correct: false },
      { challengeId: spanishChallenge53.id, text: 'Wednesday', correct: false },
      { challengeId: spanishChallenge53.id, text: 'Thursday', correct: false },
    ]);

    const [spanishChallenge54] = await db
      .insert(schema.challenges)
      .values({
        lessonId: spanishLesson25.id,
        type: 'ASSIST',
        question: 'Translate "Friday" to Spanish',
        order: 2,
      })
      .returning();

    await db.insert(schema.challengeOptions).values([
      { challengeId: spanishChallenge54.id, text: 'Viernes', correct: true },
      { challengeId: spanishChallenge54.id, text: 'Lunes', correct: false },
      { challengeId: spanishChallenge54.id, text: 'Martes', correct: false },
      { challengeId: spanishChallenge54.id, text: 'Sábado', correct: false },
    ]);

    // French Unit 1 - Lesson 4: Pronouns
    const [frenchLesson10] = await db
      .insert(schema.lessons)
      .values({
        unitId: frenchUnit1.id,
        title: 'Pronouns',
        order: 4,
      })
      .returning();

    const [frenchChallenge25] = await db
      .insert(schema.challenges)
      .values({
        lessonId: frenchLesson10.id,
        type: 'SELECT',
        question: 'What does "je" mean?',
        order: 1,
      })
      .returning();

    await db.insert(schema.challengeOptions).values([
      { challengeId: frenchChallenge25.id, text: 'I', correct: true },
      { challengeId: frenchChallenge25.id, text: 'You', correct: false },
      { challengeId: frenchChallenge25.id, text: 'He', correct: false },
      { challengeId: frenchChallenge25.id, text: 'She', correct: false },
    ]);

    const [frenchChallenge26] = await db
      .insert(schema.challenges)
      .values({
        lessonId: frenchLesson10.id,
        type: 'ASSIST',
        question: 'Translate "you" (informal) to French',
        order: 2,
      })
      .returning();

    await db.insert(schema.challengeOptions).values([
      { challengeId: frenchChallenge26.id, text: 'Tu', correct: true },
      { challengeId: frenchChallenge26.id, text: 'Je', correct: false },
      { challengeId: frenchChallenge26.id, text: 'Il', correct: false },
      { challengeId: frenchChallenge26.id, text: 'Elle', correct: false },
    ]);

    // French Unit 2 - Lesson 3: More Family
    const [frenchLesson11] = await db
      .insert(schema.lessons)
      .values({
        unitId: frenchUnit2.id,
        title: 'Extended Family',
        order: 3,
      })
      .returning();

    const [frenchChallenge27] = await db
      .insert(schema.challenges)
      .values({
        lessonId: frenchLesson11.id,
        type: 'SELECT',
        question: 'What does "grand-père" mean?',
        order: 1,
      })
      .returning();

    await db.insert(schema.challengeOptions).values([
      { challengeId: frenchChallenge27.id, text: 'Grandfather', correct: true },
      {
        challengeId: frenchChallenge27.id,
        text: 'Grandmother',
        correct: false,
      },
      { challengeId: frenchChallenge27.id, text: 'Uncle', correct: false },
      { challengeId: frenchChallenge27.id, text: 'Aunt', correct: false },
    ]);

    const [frenchChallenge27b] = await db
      .insert(schema.challenges)
      .values({
        lessonId: frenchLesson11.id,
        type: 'ASSIST',
        question: 'Translate "grandmother" to French',
        order: 2,
      })
      .returning();

    await db.insert(schema.challengeOptions).values([
      { challengeId: frenchChallenge27b.id, text: 'Grand-mère', correct: true },
      { challengeId: frenchChallenge27b.id, text: 'Grand-père', correct: false },
      { challengeId: frenchChallenge27b.id, text: 'Oncle', correct: false },
      { challengeId: frenchChallenge27b.id, text: 'Tante', correct: false },
    ]);

    // French Unit 2 - Lesson 4: Relationships
    const [frenchLesson15] = await db
      .insert(schema.lessons)
      .values({
        unitId: frenchUnit2.id,
        title: 'Relationships',
        order: 4,
      })
      .returning();

    const [frenchChallenge31] = await db
      .insert(schema.challenges)
      .values({
        lessonId: frenchLesson15.id,
        type: 'SELECT',
        question: 'What does "ami" mean?',
        order: 1,
      })
      .returning();

    await db.insert(schema.challengeOptions).values([
      { challengeId: frenchChallenge31.id, text: 'Friend', correct: true },
      { challengeId: frenchChallenge31.id, text: 'Enemy', correct: false },
      { challengeId: frenchChallenge31.id, text: 'Neighbor', correct: false },
      { challengeId: frenchChallenge31.id, text: 'Colleague', correct: false },
    ]);

    const [frenchChallenge32] = await db
      .insert(schema.challenges)
      .values({
        lessonId: frenchLesson15.id,
        type: 'ASSIST',
        question: 'Translate "neighbor" to French',
        order: 2,
      })
      .returning();

    await db.insert(schema.challengeOptions).values([
      { challengeId: frenchChallenge32.id, text: 'Voisin', correct: true },
      { challengeId: frenchChallenge32.id, text: 'Ami', correct: false },
      { challengeId: frenchChallenge32.id, text: 'Famille', correct: false },
      { challengeId: frenchChallenge32.id, text: 'Connaissance', correct: false },
    ]);

    // French Unit 2 - Lesson 5: Age & Descriptions
    const [frenchLesson16] = await db
      .insert(schema.lessons)
      .values({
        unitId: frenchUnit2.id,
        title: 'Age & Descriptions',
        order: 5,
      })
      .returning();

    const [frenchChallenge33] = await db
      .insert(schema.challenges)
      .values({
        lessonId: frenchLesson16.id,
        type: 'SELECT',
        question: 'What does "jeune" mean?',
        order: 1,
      })
      .returning();

    await db.insert(schema.challengeOptions).values([
      { challengeId: frenchChallenge33.id, text: 'Young', correct: true },
      { challengeId: frenchChallenge33.id, text: 'Old', correct: false },
      { challengeId: frenchChallenge33.id, text: 'Middle-aged', correct: false },
      { challengeId: frenchChallenge33.id, text: 'Teenager', correct: false },
    ]);

    const [frenchChallenge34] = await db
      .insert(schema.challenges)
      .values({
        lessonId: frenchLesson16.id,
        type: 'ASSIST',
        question: 'Translate "old" to French',
        order: 2,
      })
      .returning();

    await db.insert(schema.challengeOptions).values([
      { challengeId: frenchChallenge34.id, text: 'Vieux', correct: true },
      { challengeId: frenchChallenge34.id, text: 'Jeune', correct: false },
      { challengeId: frenchChallenge34.id, text: 'Nouveau', correct: false },
      { challengeId: frenchChallenge34.id, text: 'Ancien', correct: false },
    ]);

    // French Unit 3 - Lesson 3: Drinks
    const [frenchLesson12] = await db
      .insert(schema.lessons)
      .values({
        unitId: frenchUnit3.id,
        title: 'Drinks',
        order: 3,
      })
      .returning();

    const [frenchChallenge28] = await db
      .insert(schema.challenges)
      .values({
        lessonId: frenchLesson12.id,
        type: 'SELECT',
        question: 'What does "café" mean?',
        order: 1,
      })
      .returning();

    await db.insert(schema.challengeOptions).values([
      { challengeId: frenchChallenge28.id, text: 'Coffee', correct: true },
      { challengeId: frenchChallenge28.id, text: 'Tea', correct: false },
      { challengeId: frenchChallenge28.id, text: 'Juice', correct: false },
      { challengeId: frenchChallenge28.id, text: 'Wine', correct: false },
    ]);

    const [frenchChallenge28b] = await db
      .insert(schema.challenges)
      .values({
        lessonId: frenchLesson12.id,
        type: 'ASSIST',
        question: 'Translate "juice" to French',
        order: 2,
      })
      .returning();

    await db.insert(schema.challengeOptions).values([
      { challengeId: frenchChallenge28b.id, text: 'Jus', correct: true },
      { challengeId: frenchChallenge28b.id, text: 'Café', correct: false },
      { challengeId: frenchChallenge28b.id, text: 'Eau', correct: false },
      { challengeId: frenchChallenge28b.id, text: 'Lait', correct: false },
    ]);

    // French Unit 3 - Lesson 4: Fruits
    const [frenchLesson17] = await db
      .insert(schema.lessons)
      .values({
        unitId: frenchUnit3.id,
        title: 'Fruits',
        order: 4,
      })
      .returning();

    const [frenchChallenge35] = await db
      .insert(schema.challenges)
      .values({
        lessonId: frenchLesson17.id,
        type: 'SELECT',
        question: 'What does "pomme" mean?',
        order: 1,
      })
      .returning();

    await db.insert(schema.challengeOptions).values([
      { challengeId: frenchChallenge35.id, text: 'Apple', correct: true },
      { challengeId: frenchChallenge35.id, text: 'Orange', correct: false },
      { challengeId: frenchChallenge35.id, text: 'Banana', correct: false },
      { challengeId: frenchChallenge35.id, text: 'Grape', correct: false },
    ]);

    const [frenchChallenge36] = await db
      .insert(schema.challenges)
      .values({
        lessonId: frenchLesson17.id,
        type: 'ASSIST',
        question: 'Translate "banana" to French',
        order: 2,
      })
      .returning();

    await db.insert(schema.challengeOptions).values([
      { challengeId: frenchChallenge36.id, text: 'Banane', correct: true },
      { challengeId: frenchChallenge36.id, text: 'Pomme', correct: false },
      { challengeId: frenchChallenge36.id, text: 'Orange', correct: false },
      { challengeId: frenchChallenge36.id, text: 'Raisin', correct: false },
    ]);

    // French Unit 3 - Lesson 5: Vegetables
    const [frenchLesson18] = await db
      .insert(schema.lessons)
      .values({
        unitId: frenchUnit3.id,
        title: 'Vegetables',
        order: 5,
      })
      .returning();

    const [frenchChallenge37] = await db
      .insert(schema.challenges)
      .values({
        lessonId: frenchLesson18.id,
        type: 'SELECT',
        question: 'What does "tomate" mean?',
        order: 1,
      })
      .returning();

    await db.insert(schema.challengeOptions).values([
      { challengeId: frenchChallenge37.id, text: 'Tomato', correct: true },
      { challengeId: frenchChallenge37.id, text: 'Potato', correct: false },
      { challengeId: frenchChallenge37.id, text: 'Carrot', correct: false },
      { challengeId: frenchChallenge37.id, text: 'Onion', correct: false },
    ]);

    const [frenchChallenge38] = await db
      .insert(schema.challenges)
      .values({
        lessonId: frenchLesson18.id,
        type: 'ASSIST',
        question: 'Translate "carrot" to French',
        order: 2,
      })
      .returning();

    await db.insert(schema.challengeOptions).values([
      { challengeId: frenchChallenge38.id, text: 'Carotte', correct: true },
      { challengeId: frenchChallenge38.id, text: 'Tomate', correct: false },
      { challengeId: frenchChallenge38.id, text: 'Pomme de terre', correct: false },
      { challengeId: frenchChallenge38.id, text: 'Oignon', correct: false },
    ]);

    // French Unit 4 - Lesson 2: Transportation
    const [frenchLesson13] = await db
      .insert(schema.lessons)
      .values({
        unitId: frenchUnit4.id,
        title: 'Transportation',
        order: 2,
      })
      .returning();

    const [frenchChallenge29] = await db
      .insert(schema.challenges)
      .values({
        lessonId: frenchLesson13.id,
        type: 'SELECT',
        question: 'What does "voiture" mean?',
        order: 1,
      })
      .returning();

    await db.insert(schema.challengeOptions).values([
      { challengeId: frenchChallenge29.id, text: 'Car', correct: true },
      { challengeId: frenchChallenge29.id, text: 'Bus', correct: false },
      { challengeId: frenchChallenge29.id, text: 'Train', correct: false },
      { challengeId: frenchChallenge29.id, text: 'Plane', correct: false },
    ]);

    const [frenchChallenge29b] = await db
      .insert(schema.challenges)
      .values({
        lessonId: frenchLesson13.id,
        type: 'ASSIST',
        question: 'Translate "bus" to French',
        order: 2,
      })
      .returning();

    await db.insert(schema.challengeOptions).values([
      { challengeId: frenchChallenge29b.id, text: 'Bus', correct: true },
      { challengeId: frenchChallenge29b.id, text: 'Voiture', correct: false },
      { challengeId: frenchChallenge29b.id, text: 'Train', correct: false },
      { challengeId: frenchChallenge29b.id, text: 'Avion', correct: false },
    ]);

    // French Unit 4 - Lesson 3: Asking for Directions
    const [frenchLesson19] = await db
      .insert(schema.lessons)
      .values({
        unitId: frenchUnit4.id,
        title: 'Asking for Directions',
        order: 3,
      })
      .returning();

    const [frenchChallenge39] = await db
      .insert(schema.challenges)
      .values({
        lessonId: frenchLesson19.id,
        type: 'SELECT',
        question: 'How do you say "Where is..." in French?',
        order: 1,
      })
      .returning();

    await db.insert(schema.challengeOptions).values([
      { challengeId: frenchChallenge39.id, text: "Où est...?", correct: true },
      { challengeId: frenchChallenge39.id, text: "Comment est...?", correct: false },
      { challengeId: frenchChallenge39.id, text: "Qu'est-ce que...?", correct: false },
      { challengeId: frenchChallenge39.id, text: "Quand est...?", correct: false },
    ]);

    const [frenchChallenge40] = await db
      .insert(schema.challenges)
      .values({
        lessonId: frenchLesson19.id,
        type: 'ASSIST',
        question: 'Translate "straight ahead" to French',
        order: 2,
      })
      .returning();

    await db.insert(schema.challengeOptions).values([
      { challengeId: frenchChallenge40.id, text: 'Tout droit', correct: true },
      { challengeId: frenchChallenge40.id, text: 'Droite', correct: false },
      { challengeId: frenchChallenge40.id, text: 'Gauche', correct: false },
      { challengeId: frenchChallenge40.id, text: 'En arrière', correct: false },
    ]);

    // French Unit 4 - Lesson 4: Hotel & Accommodation
    const [frenchLesson20] = await db
      .insert(schema.lessons)
      .values({
        unitId: frenchUnit4.id,
        title: 'Hotel & Accommodation',
        order: 4,
      })
      .returning();

    const [frenchChallenge41] = await db
      .insert(schema.challenges)
      .values({
        lessonId: frenchLesson20.id,
        type: 'SELECT',
        question: 'What does "hôtel" mean in French?',
        order: 1,
      })
      .returning();

    await db.insert(schema.challengeOptions).values([
      { challengeId: frenchChallenge41.id, text: 'Hotel', correct: true },
      { challengeId: frenchChallenge41.id, text: 'House', correct: false },
      { challengeId: frenchChallenge41.id, text: 'Room', correct: false },
      { challengeId: frenchChallenge41.id, text: 'Bed', correct: false },
    ]);

    const [frenchChallenge42] = await db
      .insert(schema.challenges)
      .values({
        lessonId: frenchLesson20.id,
        type: 'ASSIST',
        question: 'Translate "room" to French',
        order: 2,
      })
      .returning();

    await db.insert(schema.challengeOptions).values([
      { challengeId: frenchChallenge42.id, text: 'Chambre', correct: true },
      { challengeId: frenchChallenge42.id, text: 'Hôtel', correct: false },
      { challengeId: frenchChallenge42.id, text: 'Lit', correct: false },
      { challengeId: frenchChallenge42.id, text: 'Salle de bain', correct: false },
    ]);

    // French Unit 4 - Lesson 5: At the Airport
    const [frenchLesson21] = await db
      .insert(schema.lessons)
      .values({
        unitId: frenchUnit4.id,
        title: 'At the Airport',
        order: 5,
      })
      .returning();

    const [frenchChallenge43] = await db
      .insert(schema.challenges)
      .values({
        lessonId: frenchLesson21.id,
        type: 'SELECT',
        question: 'What does "aéroport" mean?',
        order: 1,
      })
      .returning();

    await db.insert(schema.challengeOptions).values([
      { challengeId: frenchChallenge43.id, text: 'Airport', correct: true },
      { challengeId: frenchChallenge43.id, text: 'Airplane', correct: false },
      { challengeId: frenchChallenge43.id, text: 'Ticket', correct: false },
      { challengeId: frenchChallenge43.id, text: 'Passport', correct: false },
    ]);

    const [frenchChallenge44] = await db
      .insert(schema.challenges)
      .values({
        lessonId: frenchLesson21.id,
        type: 'ASSIST',
        question: 'Translate "ticket" to French',
        order: 2,
      })
      .returning();

    await db.insert(schema.challengeOptions).values([
      { challengeId: frenchChallenge44.id, text: 'Billet', correct: true },
      { challengeId: frenchChallenge44.id, text: 'Aéroport', correct: false },
      { challengeId: frenchChallenge44.id, text: 'Avion', correct: false },
      { challengeId: frenchChallenge44.id, text: 'Passeport', correct: false },
    ]);

    // French Unit 5 - Lesson 2: More Colors
    const [frenchLesson14] = await db
      .insert(schema.lessons)
      .values({
        unitId: frenchUnit5.id,
        title: 'More Colors',
        order: 2,
      })
      .returning();

    const [frenchChallenge30] = await db
      .insert(schema.challenges)
      .values({
        lessonId: frenchLesson14.id,
        type: 'ASSIST',
        question: 'Translate "green" to French',
        order: 1,
      })
      .returning();

    await db.insert(schema.challengeOptions).values([
      { challengeId: frenchChallenge30.id, text: 'Vert', correct: true },
      { challengeId: frenchChallenge30.id, text: 'Rouge', correct: false },
      { challengeId: frenchChallenge30.id, text: 'Bleu', correct: false },
      { challengeId: frenchChallenge30.id, text: 'Jaune', correct: false },
    ]);

    const [frenchChallenge30b] = await db
      .insert(schema.challenges)
      .values({
        lessonId: frenchLesson14.id,
        type: 'SELECT',
        question: 'What does "jaune" mean?',
        order: 2,
      })
      .returning();

    await db.insert(schema.challengeOptions).values([
      { challengeId: frenchChallenge30b.id, text: 'Yellow', correct: true },
      { challengeId: frenchChallenge30b.id, text: 'Green', correct: false },
      { challengeId: frenchChallenge30b.id, text: 'Orange', correct: false },
      { challengeId: frenchChallenge30b.id, text: 'Purple', correct: false },
    ]);

    // French Unit 5 - Lesson 3: Sizes
    const [frenchLesson22] = await db
      .insert(schema.lessons)
      .values({
        unitId: frenchUnit5.id,
        title: 'Sizes',
        order: 3,
      })
      .returning();

    const [frenchChallenge45] = await db
      .insert(schema.challenges)
      .values({
        lessonId: frenchLesson22.id,
        type: 'SELECT',
        question: 'What does "grand" mean?',
        order: 1,
      })
      .returning();

    await db.insert(schema.challengeOptions).values([
      { challengeId: frenchChallenge45.id, text: 'Big / Large', correct: true },
      { challengeId: frenchChallenge45.id, text: 'Small', correct: false },
      { challengeId: frenchChallenge45.id, text: 'Medium', correct: false },
      { challengeId: frenchChallenge45.id, text: 'Huge', correct: false },
    ]);

    const [frenchChallenge46] = await db
      .insert(schema.challenges)
      .values({
        lessonId: frenchLesson22.id,
        type: 'ASSIST',
        question: 'Translate "small" to French',
        order: 2,
      })
      .returning();

    await db.insert(schema.challengeOptions).values([
      { challengeId: frenchChallenge46.id, text: 'Petit', correct: true },
      { challengeId: frenchChallenge46.id, text: 'Grand', correct: false },
      { challengeId: frenchChallenge46.id, text: 'Moyen', correct: false },
      { challengeId: frenchChallenge46.id, text: 'Énorme', correct: false },
    ]);

    // French Unit 5 - Lesson 4: Shapes
    const [frenchLesson23] = await db
      .insert(schema.lessons)
      .values({
        unitId: frenchUnit5.id,
        title: 'Shapes',
        order: 4,
      })
      .returning();

    const [frenchChallenge47] = await db
      .insert(schema.challenges)
      .values({
        lessonId: frenchLesson23.id,
        type: 'SELECT',
        question: 'What does "cercle" mean?',
        order: 1,
      })
      .returning();

    await db.insert(schema.challengeOptions).values([
      { challengeId: frenchChallenge47.id, text: 'Circle', correct: true },
      { challengeId: frenchChallenge47.id, text: 'Square', correct: false },
      { challengeId: frenchChallenge47.id, text: 'Triangle', correct: false },
      { challengeId: frenchChallenge47.id, text: 'Rectangle', correct: false },
    ]);

    const [frenchChallenge48] = await db
      .insert(schema.challenges)
      .values({
        lessonId: frenchLesson23.id,
        type: 'ASSIST',
        question: 'Translate "square" to French',
        order: 2,
      })
      .returning();

    await db.insert(schema.challengeOptions).values([
      { challengeId: frenchChallenge48.id, text: 'Carré', correct: true },
      { challengeId: frenchChallenge48.id, text: 'Cercle', correct: false },
      { challengeId: frenchChallenge48.id, text: 'Triangle', correct: false },
      { challengeId: frenchChallenge48.id, text: 'Rectangle', correct: false },
    ]);

    // French Unit 5 - Lesson 5: Adjectives
    const [frenchLesson24] = await db
      .insert(schema.lessons)
      .values({
        unitId: frenchUnit5.id,
        title: 'Adjectives',
        order: 5,
      })
      .returning();

    const [frenchChallenge49] = await db
      .insert(schema.challenges)
      .values({
        lessonId: frenchLesson24.id,
        type: 'SELECT',
        question: 'What does "beau" mean?',
        order: 1,
      })
      .returning();

    await db.insert(schema.challengeOptions).values([
      { challengeId: frenchChallenge49.id, text: 'Beautiful / Handsome', correct: true },
      { challengeId: frenchChallenge49.id, text: 'Ugly', correct: false },
      { challengeId: frenchChallenge49.id, text: 'Nice', correct: false },
      { challengeId: frenchChallenge49.id, text: 'Good', correct: false },
    ]);

    const [frenchChallenge50] = await db
      .insert(schema.challenges)
      .values({
        lessonId: frenchLesson24.id,
        type: 'ASSIST',
        question: 'Translate "ugly" to French',
        order: 2,
      })
      .returning();

    await db.insert(schema.challengeOptions).values([
      { challengeId: frenchChallenge50.id, text: 'Moche', correct: true },
      { challengeId: frenchChallenge50.id, text: 'Beau', correct: false },
      { challengeId: frenchChallenge50.id, text: 'Bon', correct: false },
      { challengeId: frenchChallenge50.id, text: 'Mauvais', correct: false },
    ]);

    // French Unit 1 - Lesson 5: Days of the Week
    const [frenchLesson25] = await db
      .insert(schema.lessons)
      .values({
        unitId: frenchUnit1.id,
        title: 'Days of the Week',
        order: 5,
      })
      .returning();

    const [frenchChallenge51] = await db
      .insert(schema.challenges)
      .values({
        lessonId: frenchLesson25.id,
        type: 'SELECT',
        question: 'What does "lundi" mean?',
        order: 1,
      })
      .returning();

    await db.insert(schema.challengeOptions).values([
      { challengeId: frenchChallenge51.id, text: 'Monday', correct: true },
      { challengeId: frenchChallenge51.id, text: 'Tuesday', correct: false },
      { challengeId: frenchChallenge51.id, text: 'Wednesday', correct: false },
      { challengeId: frenchChallenge51.id, text: 'Thursday', correct: false },
    ]);

    const [frenchChallenge52] = await db
      .insert(schema.challenges)
      .values({
        lessonId: frenchLesson25.id,
        type: 'ASSIST',
        question: 'Translate "Friday" to French',
        order: 2,
      })
      .returning();

    await db.insert(schema.challengeOptions).values([
      { challengeId: frenchChallenge52.id, text: 'Vendredi', correct: true },
      { challengeId: frenchChallenge52.id, text: 'Lundi', correct: false },
      { challengeId: frenchChallenge52.id, text: 'Mardi', correct: false },
      { challengeId: frenchChallenge52.id, text: 'Samedi', correct: false },
    ]);

    // Add more challenges to existing lessons to make them more comprehensive
    // Spanish Lesson 1 - Additional challenges
    const [spanishChallenge24] = await db
      .insert(schema.challenges)
      .values({
        lessonId: spanishLesson1.id,
        type: 'SELECT',
        question: 'What does "Adiós" mean?',
        order: 6,
      })
      .returning();

    await db.insert(schema.challengeOptions).values([
      { challengeId: spanishChallenge24.id, text: 'Goodbye', correct: true },
      { challengeId: spanishChallenge24.id, text: 'Hello', correct: false },
      { challengeId: spanishChallenge24.id, text: 'Thank you', correct: false },
      { challengeId: spanishChallenge24.id, text: 'Please', correct: false },
    ]);

    // Spanish Lesson 2 - Additional challenges
    const [spanishChallenge25] = await db
      .insert(schema.challenges)
      .values({
        lessonId: spanishLesson2.id,
        type: 'SELECT',
        question: 'How do you say "Excuse me" in Spanish?',
        order: 5,
      })
      .returning();

    await db.insert(schema.challengeOptions).values([
      { challengeId: spanishChallenge25.id, text: 'Perdón', correct: true },
      { challengeId: spanishChallenge25.id, text: 'Gracias', correct: false },
      { challengeId: spanishChallenge25.id, text: 'Por favor', correct: false },
      { challengeId: spanishChallenge25.id, text: 'De nada', correct: false },
    ]);

    // Spanish Lesson 3 - Additional challenges
    const [spanishChallenge26] = await db
      .insert(schema.challenges)
      .values({
        lessonId: spanishLesson3.id,
        type: 'SELECT',
        question: 'What is "diez" in English?',
        order: 3,
      })
      .returning();

    await db.insert(schema.challengeOptions).values([
      { challengeId: spanishChallenge26.id, text: 'Ten', correct: true },
      { challengeId: spanishChallenge26.id, text: 'Nine', correct: false },
      { challengeId: spanishChallenge26.id, text: 'Eight', correct: false },
      { challengeId: spanishChallenge26.id, text: 'Seven', correct: false },
    ]);

    // French Lesson 1 - Additional challenges
    const [frenchChallenge22] = await db
      .insert(schema.challenges)
      .values({
        lessonId: frenchLesson1.id,
        type: 'SELECT',
        question: 'What does "Au revoir" mean?',
        order: 5,
      })
      .returning();

    await db.insert(schema.challengeOptions).values([
      { challengeId: frenchChallenge22.id, text: 'Goodbye', correct: true },
      { challengeId: frenchChallenge22.id, text: 'Hello', correct: false },
      { challengeId: frenchChallenge22.id, text: 'Thank you', correct: false },
      { challengeId: frenchChallenge22.id, text: 'Please', correct: false },
    ]);

    // French Lesson 2 - Additional challenges
    const [frenchChallenge23] = await db
      .insert(schema.challenges)
      .values({
        lessonId: frenchLesson2.id,
        type: 'SELECT',
        question: 'How do you say "Excuse me" in French?',
        order: 4,
      })
      .returning();

    await db.insert(schema.challengeOptions).values([
      { challengeId: frenchChallenge23.id, text: 'Excusez-moi', correct: true },
      { challengeId: frenchChallenge23.id, text: 'Merci', correct: false },
      {
        challengeId: frenchChallenge23.id,
        text: "S'il vous plaît",
        correct: false,
      },
      { challengeId: frenchChallenge23.id, text: 'De rien', correct: false },
    ]);

    // French Lesson 3 - Additional challenges
    const [frenchChallenge24] = await db
      .insert(schema.challenges)
      .values({
        lessonId: frenchLesson3.id,
        type: 'SELECT',
        question: 'What is "dix" in English?',
        order: 3,
      })
      .returning();

    await db.insert(schema.challengeOptions).values([
      { challengeId: frenchChallenge24.id, text: 'Ten', correct: true },
      { challengeId: frenchChallenge24.id, text: 'Nine', correct: false },
      { challengeId: frenchChallenge24.id, text: 'Eight', correct: false },
      { challengeId: frenchChallenge24.id, text: 'Seven', correct: false },
    ]);

    console.log('✅ Database seeded successfully!');
    console.log(`   - Created 2 courses (Spanish, French)`);
    console.log(`   - Created 10 units (5 per course)`);
    console.log(`   - Created 50 lessons (5 per unit)`);
    console.log(`   - Created 100+ challenges (at least 2 per lesson)`);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw new Error('Failed to seed database');
  }
};

main();

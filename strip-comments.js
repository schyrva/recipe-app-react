import { promises as fs } from 'fs';
import path from 'path';
import stripComments from 'strip-comments';
import { glob } from 'glob';

// Шаблони файлів, в яких будемо видаляти коментарі
const patterns = ['src/**/*.ts', 'src/**/*.tsx', 'src/**/*.js', 'src/**/*.jsx'];

// Функція для видалення коментарів
async function removeCommentsFromFiles() {
  // Проходимо по всіх шаблонах
  for (const pattern of patterns) {
    // Знаходимо всі файли, що відповідають шаблону
    const files = await glob(pattern);

    console.log(`Обробка ${files.length} файлів за шаблоном: ${pattern}`);

    // Обробляємо кожен файл
    for (const file of files) {
      try {
        // Читаємо вміст файлу
        const content = await fs.readFile(file, 'utf8');

        // Видаляємо коментарі
        const strippedContent = stripComments(content);

        // Якщо вміст змінився, записуємо назад у файл
        if (content !== strippedContent) {
          await fs.writeFile(file, strippedContent, 'utf8');
          console.log(`✅ Видалено коментарі з файлу: ${file}`);
        } else {
          console.log(`ℹ️ Немає коментарів для видалення: ${file}`);
        }
      } catch (error) {
        console.error(`❌ Помилка при обробці файлу ${file}:`, error);
      }
    }
  }

  console.log('Готово! Всі коментарі видалено.');
}

// Запускаємо функцію
removeCommentsFromFiles();

import OpenAI from "openai";
import fs from "fs/promises";

const KEY = "";

const openai = new OpenAI({ apiKey: KEY });

async function generateHTMLFromArticle() {
  try {
    const articleContent = await fs.readFile("artykul.txt", "utf-8");

    const prompt = `Based on the article.txt content provided below, generate an HTML structure as described:

        1. Use appropriate HTML tags to structure the content.
        - The title of the article should be placed inside <h1> tags.
        - Subsections should use <h2> or <h3> tags, depending on their hierarchy.
        - Paragraphs should be enclosed in <p> tags.
        - Include image placeholders using the <img> tag with a src="image_placeholder.jpg". Include a description in the alt attribute for each image.

        2. Optionally, include captions for images using <figcaption>.

        3. The HTML should **not** contain CSS or JavaScript.
        - Only include content between the <body> and </body> tags.
        - Do not include <html>, <head>, or <body> tags.

        4. The output should be clean and correctly formatted HTML code, suitable for insertion into an article page.

        Article content:
        ${articleContent}
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const htmlContent = completion.choices[0].message.content;

    await fs.writeFile("artykul.html", htmlContent);
    console.log("Plik artykul.html został pomyślnie zapisany.");
  } catch (error) {
    console.error("Wystąpił błąd:", error);
  }
}

generateHTMLFromArticle();

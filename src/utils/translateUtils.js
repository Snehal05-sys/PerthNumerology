export async function translateText(text, targetLang = "hi") {
  const MAX_CHARS = 490;

  // If text is short enough, translate directly
  if (text.length <= MAX_CHARS) {
    return await translateChunk(text, targetLang);
  }

  // Split into sentences and batch into chunks under 490 chars
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
  const chunks = [];
  let current = "";

  for (const sentence of sentences) {
    if ((current + sentence).length > MAX_CHARS) {
      if (current.trim()) chunks.push(current.trim());
      current = sentence;
    } else {
      current += sentence;
    }
  }
  if (current.trim()) chunks.push(current.trim());

  // Translate each chunk and join
  const translated = [];
  for (const chunk of chunks) {
    const result = await translateChunk(chunk, targetLang);
    translated.push(result);
  }
  return translated.join(" ");
}

async function translateChunk(text, targetLang) {
  try {
    const res = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${targetLang}`
    );
    const data = await res.json();
    if (data.responseStatus === 200) {
      return data.responseData?.translatedText || text;
    }
    return text;
  } catch {
    return text;
  }
}

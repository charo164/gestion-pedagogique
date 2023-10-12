export function csvToJson(csv: string, delimiter = ',') {
  try {
    const lines = csv.split('\n');
    const result = [];
    const headers = lines[0].split(delimiter);

    for (let i = 1; i < lines.length; i++) {
      const obj: Record<string, number | string> = {};
      const currentLine = lines[i].split(delimiter);
      if (currentLine.length < headers.length) continue;

      for (let j = 0; j < headers.length; j++) {
        obj[slugify(headers[j])] = currentLine[j];
      }

      result.push(obj);
    }

    console.log(result);

    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export function slugify(text: string, separator = '_') {
  return text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9 ]/g, '')
    .replace(/\s+/g, separator);
}

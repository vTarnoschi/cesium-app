export function parseTleFile(fileContent, stationOptions) {
  const result = [];
  const lines = fileContent.split("\n");
  let current = null;

  for (let i = 0; i < lines.length; ++i) {
    const line = lines[i].trim();

    if (line.length === 0) continue;

    if (line[0] === "1") {
      current.tle1 = line;
    } else if (line[0] === "2") {
      current.tle2 = line;
    } else {
      current = {
        name: line,
        ...stationOptions,
      };
      result.push(current);
    }
  }

  return result;
}

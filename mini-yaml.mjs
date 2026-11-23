// mini-yaml.mjs — a zero-dependency parser for the restricted YAML subset
// this repo authors in (see DESIGN.md, "Authoring format"):
//   - block mappings and block sequences, indentation with spaces
//   - scalar values only: plain, "double-quoted" or 'single-quoted'
//   - full-line comments (# ...) and blank lines
// No anchors, no flow collections, no multi-line scalars, no inline comments.
// If a file needs more than this, the format decision gets revisited —
// the restriction is what lets the gates run with no dependencies.

function scalar(raw) {
  const s = raw.trim();
  if (s.length >= 2 && s.startsWith('"') && s.endsWith('"')) {
    return s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\");
  }
  if (s.length >= 2 && s.startsWith("'") && s.endsWith("'")) {
    return s.slice(1, -1).replace(/''/g, "'");
  }
  if (s === "true") return true;
  if (s === "false") return false;
  if (s === "null" || s === "~") return null;
  if (/^-?\d+(\.\d+)?$/.test(s)) return Number(s);
  return s;
}

function tokenize(text) {
  const lines = [];
  for (const raw of text.split(/\r?\n/)) {
    if (!raw.trim() || raw.trim().startsWith("#")) continue;
    const indent = raw.length - raw.trimStart().length;
    lines.push({ indent, content: raw.trim() });
  }
  return lines;
}

// Parse a block starting at lines[i] with the given indent; returns [value, nextIndex].
function parseBlock(lines, i, indent) {
  if (i >= lines.length || lines[i].indent < indent) return [null, i];
  if (lines[i].content.startsWith("- ") || lines[i].content === "-") {
    // sequence
    const list = [];
    while (
      i < lines.length &&
      lines[i].indent === indent &&
      (lines[i].content.startsWith("- ") || lines[i].content === "-")
    ) {
      const first = lines[i].content === "-" ? "" : lines[i].content.slice(2);
      if (first === "") {
        const childIndent = i + 1 < lines.length ? lines[i + 1].indent : indent + 1;
        const [v, ni] = parseBlock(lines, i + 1, childIndent);
        list.push(v);
        i = ni;
      } else if (/^[^:\s][^:]*:(\s|$)/.test(first) && !first.startsWith('"') && !first.startsWith("'")) {
        // inline first key of a mapping item: rewrite as a virtual line at indent+2
        const virtual = { indent: indent + 2, content: first };
        const sub = [virtual];
        let j = i + 1;
        while (j < lines.length && lines[j].indent > indent) { sub.push(lines[j]); j++; }
        const [v] = parseBlock(sub, 0, indent + 2);
        list.push(v);
        i = j;
      } else {
        list.push(scalar(first));
        i++;
      }
    }
    return [list, i];
  }
  // mapping
  const map = {};
  while (i < lines.length && lines[i].indent === indent && !lines[i].content.startsWith("- ")) {
    const m = lines[i].content.match(/^([^:]+):(\s+(.*))?$/);
    if (!m) throw new Error(`mini-yaml: cannot parse line: ${lines[i].content}`);
    const key = m[1].trim();
    const rest = m[3];
    if (rest !== undefined && rest !== "") {
      map[key] = scalar(rest);
      i++;
    } else {
      const childIndent = i + 1 < lines.length ? lines[i + 1].indent : indent + 1;
      const [v, ni] = parseBlock(lines, i + 1, childIndent);
      map[key] = v;
      i = ni;
    }
  }
  return [map, i];
}

export function parseYaml(text) {
  const lines = tokenize(text);
  if (lines.length === 0) return null;
  const [value, next] = parseBlock(lines, 0, lines[0].indent);
  if (next < lines.length) {
    throw new Error(`mini-yaml: trailing content at: ${lines[next].content}`);
  }
  return value;
}

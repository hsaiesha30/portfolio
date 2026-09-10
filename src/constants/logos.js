/*
  Skill groups for the portfolio skills section.
  1. programmingLanguages
  2. frameworks
  3. aiMlFrameworks
  4. dataStreaming
  5. cloudDevOpsTools
*/

// 1️⃣  Languages
export const programmingLanguages = [
  { name: 'python', file: 'python.svg', display: 'Python' },
  { name: 'sql', file: 'sql.svg', display: 'SQL' },
  { name: 'javascript', file: 'javascript.svg', display: 'JavaScript' },
  { name: 'html', file: 'html.svg', display: 'HTML' },
  { name: 'css', file: 'css.svg', display: 'CSS' },
];

// 2️⃣  Frameworks & Libraries
export const frameworks = [
  { name: 'nodejs', file: 'nodejs.svg', display: 'Node.js' },
  { name: 'numpy', file: 'numpy.svg', display: 'NumPy' },
  { name: 'pandas', file: 'pandas.svg', display: 'Pandas' },
  { name: 'express', file: 'express.svg', display: 'Express.js' },
];

// 3️⃣  AI / Analytics / ML Concepts
export const aiMlFrameworks = [
  { name: 'aws', file: 'aws.svg', display: 'AWS' },
  { name: 'rag', file: 'rag.svg', display: 'RAG' },
  { name: 'nlp', file: 'nlp.svg', display: 'NLP' },
  { name: 'eda', file: 'data-analysis.svg', display: 'EDA' },
  { name: 'data-analysis', file: 'data-analysis.svg', display: 'Data Analysis' },
];

// 4️⃣  Databases & Development Tools
export const dataStreaming = [
  { name: 'mysql', file: 'mysql.svg', display: 'MySQL' },
  { name: 'mongodb', file: 'mongodb.svg', display: 'MongoDB' },
  { name: 'git', file: 'git.svg', display: 'Git' },
  { name: 'postman', file: 'postman.svg', display: 'Postman' },
  { name: 'ui-path', file: 'ui-path.svg', display: 'UiPath' },
];

// 5️⃣  AI Tools & Platforms
export const cloudDevOpsTools = [
  { name: 'google-antigravity', file: 'google-antigravity.svg', display: 'Google Antigravity' },
  { name: 'claude', file: 'claude.svg', display: 'Claude AI' },
  { name: 'windows', file: 'windows.svg', display: 'Windows' },
  { name: 'notebook-llm', file: 'notebook-llm.svg', display: 'Notebook LLM' },
  { name: 'lovable', file: 'lovable.svg', display: 'Lovable' },
  { name: 'google-ai-studio', file: 'google-ai-studio.svg', display: 'Google AI Studio' },
];

// Master list used by floating-logo field
export const logos = [
  ...programmingLanguages,
  ...frameworks,
  ...aiMlFrameworks,
  ...dataStreaming,
  ...cloudDevOpsTools,
];

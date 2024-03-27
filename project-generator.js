import fs from "fs";

const templates = {
  component: name =>
    `import './${name}.css';

export default function ${capitalize(name)}() {
  // TODO: write rest of ${capitalize(name)} component.
  return (
    <div className="${name}">
      {"${name}"}
    </div>
  );
}`,
  test: name => `import { renderWithProviders as render } from 'src/testUtils/testingLibrary';
import ${capitalize(name)} from './${name}';

const component = <${capitalize(name)} />;

describe('${capitalize(name)} component', () => {
  it('renders correctly', () => {
    const page = render(component);
    expect(page.getByText("${name}")).toBeInTheDocument();
  });
});`,
  css: name => `.${name} {
  
}`
};

const capitalize = (name) => name.charAt(0).toUpperCase() + name.slice(1);

const fileExists = path => file => fs.existsSync(`${path}/${file}`);

const writeToPath = path => (file, content) => {
  const filePath = `${path}/${file}`;

  fs.writeFile(filePath, content, err => {
    if (err) throw err;
    console.log("Created file: ", filePath);
    return true;
  });
};

function createDirectory(path) {
  fs.mkdirSync(path);
  console.log('\nDirectory created successfully.');
}

function createFiles(path, name) {
  const files = {
    component: `${name}.tsx`,
    test: `${name}.test.tsx`,
    css: `${name}.css`
  };

  if (name !== "components") {
    const writeFile = writeToPath(path);
    const toFileMissingBool = file => !fileExists(path)(file);
    const checkAllMissing = (acc, cur) => acc && cur;

    const noneExist = Object.values(files)
      .map(toFileMissingBool)
      .reduce(checkAllMissing);

    if (noneExist) {
      console.log(`Crearing new project for: ${name}, ${path}`);
      Object.entries(files).forEach(([type, fileName]) => {
        writeFile(fileName, templates[type](name));
      });
    }
  }
}

export function generate(name) {
  const path = `./src/pages/${name}`;
  if (!fs.existsSync(path)) {
    createDirectory(path);
  }

  createFiles(path, name);
}
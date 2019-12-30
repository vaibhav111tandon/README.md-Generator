#!/usr/bin/env node

const inquirer = require("inquirer");
const fs = require("fs");
const path = require("path");
const chalk = require("chalk");

const existingReadme = fs.existsSync("README.md");

if (existingReadme) {
  inquirer
    .prompt([
      {
        type: "confirm",
        name: "overwriteReadme",
        message: "README.md already exists! Would you like to overwrite it?",
        default: false
      }
    ])
    .then(answers => {
      if (answers.overwriteReadme) {
        writeFile();
      } else console.log(chalk.yellow("Thank you!🙏 Goodbye!👋"));
    });
} else {
  writeFile();
}

async function writeFile() {
  var createStream = await fs.createWriteStream("README.md");
  await createStream.end();
  await console.log(chalk.green("✅ README.md file created"));
  await buildReadme();
}

function buildReadme() {
  inquirer
    .prompt([
      {
        type: "text",
        name: "projectName",
        message: "What is the name of your project?",
        default: path.basename(process.cwd())
      },
      {
        type: "text",
        name: "projectVersion",
        message: "Project version? (Press Enter to skip)"
      },
      {
        type: "text",
        name: "projectHomepage",
        message: "Project Homepage url? (Press Enter to skip)"
      },
      {
        type: "text",
        name: "projectDescription",
        message: "Enter something about the project. (Project Description)",
        default: "It helps somebody in some way"
      },
      {
        type: "text",
        name: "projectDocumentationUrl",
        message: "Project Documentation Url? (Press Enter to slit)"
      },
      {
        type: "text",
        name: "author",
        message: "Author name?",
        default: "Some nice guy"
      },
      {
        type: "text",
        name: "githubusername",
        message: "Github Username? (Press Enter to skip)"
      },
      {
        type: "text",
        name: "twitterusername",
        message: "Twitter Username? (Press Enter to skip)"
      },
      {
        type: "text",
        name: "patreonusername",
        message: "Patreon Username? (Press Enter to skip)"
      },
      {
        type: "text",
        name: "projectPrerequisites",
        message: "Enter Project Prerequisites?",
        default: "None. Just download it and open it"
      },
      {
        type: "text",
        name: "installCommand",
        message: "Install Command? (Press Enter to skip)"
      },
      {
        type: "text",
        name: "projectUsageCommand",
        message: "Usage Command or Instructions? (Press Enter to skip)"
      },
      {
        type: "text",
        name: "testCommand",
        message: "Test Command? (Press Enter to skip)"
      },
      {
        type: "text",
        name: "issuePageUrl",
        message: "Issues Page Url? (Press Enter to skip)"
      }
    ])
    .then(answers => {
      inquirer
        .prompt([
          {
            type: "text",
            name: "licenseName",
            message: "License name? (Press Enter to skip)"
          }
        ])
        .then(licenseAvailable => {
          if (licenseAvailable.licenseName) {
            inquirer
              .prompt([
                {
                  type: "text",
                  name: "licenseUrl",
                  message: "License Url?",
                  default: `https://github.com/${answers.githubusername}/${answers.projectName}/blob/master/LICENSE`
                }
              ])
              .then(licenseAvailableUrl => {
                  
                fs.writeFileSync("README.md", `
# ${answers.projectName}

${(answers.projectVersion) ? "![Project Version](https://img.shields.io/badge/Version-"+answers.projectVersion+"-blue)" : '' } ${(answers.projectHomepage) ? "![Documentation](https://img.shields.io/badge/Documentation-Yes-yellowgreen)" : '' } ![Maintained](https://img.shields.io/badge/Maintained-Yes-yellowgreen) ${(answers.twitterusername) ? "![Twitter Follow](https://img.shields.io/twitter/follow/"+answers.twitterusername+"?style=social)" : '' } ${(licenseAvailable.licenseName) ? "![License](https://img.shields.io/badge/License-"+licenseAvailable.licenseName+"-green)" : '' }

**${answers.projectDescription}**

${(answers.projectPrerequisites)? "## Prerequisites ":""}
${(answers.projectPrerequisites)? ""+answers.projectPrerequisites+"":""}

${(answers.installCommand)? "## Install ":""}
${(answers.installCommand)? ""+answers.installCommand+"":""}

${(answers.projectUsageCommand)? "## Usage ":""}
${(answers.projectUsageCommand)? ""+answers.projectUsageCommand+"":""}

${(answers.testCommand)? "## Run Tests ":""}
${(answers.testCommand)? ""+answers.testCommand+"":""}

## Author
**${answers.author}**
${(answers.githubusername) ? '- Github : [@'+answers.githubusername+'](https://github.com/'+answers.githubusername+')': ''}
${(answers.twitterusername) ? '- Twitter : [@'+answers.twitterusername+'](https://twitter.com/'+answers.twitterusername+')': ''}

## Contributing
Issues, Feature requests are most welcomed!

## Show your support :pray:
Give a :star: or follow me if this project helped you.

${(licenseAvailable.licenseName)? "## License ":""}
${(licenseAvailable.licenseName)? ""+licenseAvailable.licenseName+"":""}

---

*This README was generated with :heart: by rd*

`)
              }).then(() => console.log("Now, you can check README.md, Hope you like it.💚"));
          }
        });
    });
}

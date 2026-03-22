const fs = require("fs");

module.exports = function generateHTML(data) {
  let template = fs.readFileSync("./templates/template1.html", "utf-8");

  template = template.replace("{{name}}", data.name);
  template = template.replace("{{title}}", data.title);
  template = template.replace("{{email}}", data.contact.email);

  const skillsHTML = data.skills.map(s => `<li>${s}</li>`).join("");
  template = template.replace("{{skills}}", skillsHTML);

  return template;
};

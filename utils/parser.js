module.exports = function parseResume(text) {
  const lines = text.split("\n");

  return {
    name: lines[0] || "Your Name",
    title: "Student",
    skills: extractSkills(text),
    projects: [],
    education: [],
    contact: {
      email: extractEmail(text),
      phone: extractPhone(text)
    }
  };
};

function extractEmail(text) {
  const match = text.match(/\S+@\S+\.\S+/);
  return match ? match[0] : "";
}

function extractPhone(text) {
  const match = text.match(/\d{10}/);
  return match ? match[0] : "";
}

function extractSkills(text) {
  const skills = ["HTML", "CSS", "JavaScript", "React", "Node"];
  return skills.filter(skill => text.includes(skill));
} 

const key = "csd0111-section-f-records-v1";
const byId = id => document.getElementById(id);
const markFields = ["maths", "c", "ai"];
let records = sampleRecords.map(record => ({ ...record }));
let editing = null;
let removing = null;

try {
  const saved = localStorage.getItem(key);
  if (saved !== null) records = JSON.parse(saved);
} catch {
  byId("notice").textContent = "Saved records could not be opened. Showing the sample class.";
}

function total(record) {
  return record.maths + record.c + record.ai;
}

function save(message) {
  try {
    localStorage.setItem(key, JSON.stringify(records));
  } catch {
    message += " Browser storage is unavailable. Changes last for this visit only.";
  }
  byId("notice").textContent = message;
  drawRegister();
}

function actionButton(label, onClick) {
  const button = document.createElement("button");
  button.className = "secondary";
  button.textContent = label;
  button.addEventListener("click", onClick);
  return button;
}

function drawRegister() {
  const query = byId("search").value.trim().toLowerCase();
  const matches = records.filter(student =>
    student.name.toLowerCase().includes(query) || student.roll.toLowerCase().includes(query));
  const body = byId("rows");
  body.replaceChildren();
  for (const student of matches) {
    const row = body.insertRow();
    const values = [student.roll, student.name, student.maths, student.c, student.ai,
      total(student), (total(student) / 3).toFixed(1)];
    for (const value of values) row.insertCell().textContent = value;
    const actions = row.insertCell();
    actions.append(actionButton("Edit", () => openForm(student)),
      actionButton("Remove", () => askToRemove(student)));
  }
  byId("matches").textContent = matches.length ? "Showing " + matches.length + " of " + records.length + " students" : "No matching records.";
  const totals = records.map(total);
  byId("count").textContent = records.length;
  byId("average").textContent = totals.length ? (totals.reduce((sum, value) => sum + value, 0) / (3 * totals.length)).toFixed(1) : "—";
  byId("highest").textContent = totals.length ? Math.max(...totals) : "—";
}

function openForm(student) {
  editing = student ? student.roll : null;
  byId("form").reset();
  byId("error").textContent = "";
  byId("formTitle").textContent = student ? "Edit student" : "Add student";
  byId("roll").readOnly = Boolean(editing);
  if (student) {
    byId("roll").value = student.roll;
    byId("studentName").value = student.name;
    for (const field of markFields) byId(field).value = student[field];
  }
  byId("editor").showModal();
}

byId("form").addEventListener("submit", event => {
  event.preventDefault();
  const roll = byId("roll").value.trim().toUpperCase();
  const name = byId("studentName").value.trim();
  const student = { roll, name };
  let error = "";
  if (!/^[A-Z0-9-]{1,12}$/.test(roll)) error = "Enter a roll number using letters, digits or a hyphen.";
  else if (!editing && records.some(record => record.roll === roll)) error = "This roll number already exists.";
  else if (!name) error = "Enter the student's name.";
  else {
    for (const field of markFields) {
      const input = byId(field);
      const value = input.valueAsNumber;
      if (!Number.isInteger(value) || value < 0 || value > 100) {
        error = "Enter a whole number from 0 to 100 for each subject.";
        break;
      }
      student[field] = value;
    }
  }
  if (error) {
    byId("error").textContent = error;
    return;
  }
  if (editing) records[records.findIndex(record => record.roll === editing)] = student;
  else records.unshift(student);
  byId("search").value = "";
  byId("editor").close();
  save((editing ? "Updated " : "Added ") + student.name + " (" + roll + ").");
});

function askToRemove(student) {
  removing = student.roll;
  byId("deleteText").textContent = "Remove " + student.name + " (" + removing + ") from this register?";
  byId("remover").showModal();
}
byId("confirm").addEventListener("click", () => {
  records = records.filter(student => student.roll !== removing);
  byId("remover").close();
  save("Removed " + removing + ".");
});
byId("keep").addEventListener("click", () => byId("remover").close());
byId("cancel").addEventListener("click", () => byId("editor").close());
byId("add").addEventListener("click", () => openForm(null));
byId("search").addEventListener("input", drawRegister);
function classCsv() {
  const lines = [["Roll no.", "Student", "Maths", "C Programming", "AI & Ethics"]];
  for (const s of records) lines.push([s.roll, s.name, s.maths, s.c, s.ai]);
  function quote(value) {
    let text = String(value);
    if (/^[=+@-]/.test(text)) text = "'" + text;
    return '"' + text.replaceAll('"', '""') + '"';
  }
  return lines.map(line => line.map(quote).join(",")).join("\r\n");
}
byId("export").addEventListener("click", () => {
  const url = URL.createObjectURL(new Blob(["\uFEFF", classCsv()], { type: "text/csv;charset=utf-8" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = "Class_Records.csv";
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
});
drawRegister();


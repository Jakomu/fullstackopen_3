const { response } = require("express");
const express = require("express");
const app = express();
app.use(express.json());

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1,
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2,
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3,
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4,
  },
];

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/info", (req, res) => {
  const personAmount = persons.length;
  const time = Date();
  res.send(
    `Phonebook has info for ${personAmount} people` + "<br/><br/>" + `${time}`
  );
});

app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  const person = persons.find((person) => person.id == id);
  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  persons = persons.filter((person) => person.id != id);

  res.status(204).end();
});

app.post("/api/persons", (req, res) => {
  const body = req.body;
  let id;

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: "content missing",
    });
  }

  do {
    id = Math.floor(Math.random() * 1000);
  } while (id == persons.find((person) => person.id));

  const newPerson = {
    name: body.name,
    number: body.number,
    id: id,
  };

  persons = persons.concat(newPerson);
  console.log(persons);

  res.json(newPerson);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

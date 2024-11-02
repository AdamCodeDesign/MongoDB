export default function randomPerson() {
  const firstName = [
    "Anna",
    "Joanna",
    "Katarzyna",
    "Aleksandra",
    "Małgorzata",
    "Zuzanna",
    "Maja",
    "Laura",
  ];

  const surname = ["Kowalska", "Nowak", "Jaworska", "Sochacka", "Adamska"];
  const cities = ["Wrocław", "Kraków", "Wałbrzych", "Opole"];

  let person = {
    firstName: firstName[Math.floor(Math.random() * firstName.length)],
    surname: surname[Math.floor(Math.random() * surname.length)],
    city: cities[Math.floor(Math.random() * cities.length)],
    age: 18 + Math.floor(Math.random() * (50 - 18)),
  };

  return person;
}

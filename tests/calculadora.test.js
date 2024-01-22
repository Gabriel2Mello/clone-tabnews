const calculadora = require("../models/calculadora.js");

test("somar 2 + 2 deveria retornar 4", () => {
  const result = calculadora.somar(2, 2);
  expect(result).toBe(4);
});

test("somar 2 + 2 deveria retornar 4", () => {
  const result = calculadora.somar(2, 2);
  expect(result).toBe(4);
});

test("somar 'banana' + 100 deveria retornar 'Erro'", () => {
  const result = calculadora.somar("banana", 100);
  expect(result).toBe("Erro");
});

test("somar 100 + '' deveria retornar 'Erro'", () => {
  const result = calculadora.somar(100, "");
  expect(result).toBe("Erro");
});

test("somar '' + 100 deveria retornar 'Erro'", () => {
  const result = calculadora.somar("", 100);
  expect(result).toBe("Erro");
});

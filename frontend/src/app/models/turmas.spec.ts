import { Turma } from './turmas';

describe('Turma', () => {
  it('should create an instance', () => {
    expect(new Turma("", "", "", "", "", 0)).toBeTruthy();
  });
});

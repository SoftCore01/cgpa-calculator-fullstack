import type { System } from "../../utils/types";

export default function GradeComponent({
  system,
  ...props
}: React.ComponentProps<"select"> & { system: System }) {
  return system === 4 ? (
    <select name="grade"{...props}>
      <option value="A">A</option>
      <option value="B">B</option>
      <option value="C">C</option>
      <option value="D">D</option>
      <option value="F">F</option>
    </select>
  ) : (
    <select name="grade"{...props}>
      <option value="A">A</option>
      <option value="B">B</option>
      <option value="C">C</option>
      <option value="D">D</option>
      <option value="E">E</option>
      <option value="F">F</option>
    </select>
  );
}

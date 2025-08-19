import { useAtom } from "jotai";
import { systemAtom } from "../store/atoms";

export default function System() {
  const [system, setSystem] = useAtom(systemAtom);
  const handleSystemChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = parseInt(event.target.value);
    if (value === 4 || value === 5) {
      setSystem(value);
    }
  };
  return (
    <>
      <label htmlFor="system">GP System</label>
      <select value={system} onChange={handleSystemChange} name="system" id="system">
        <option value="5">5</option>
        <option value="4">4</option>
      </select>
    </>
  );
}

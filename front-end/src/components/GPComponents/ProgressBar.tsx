import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useAtom } from "jotai";
import { systemAtom } from "../../store/atoms";
type ProgressBarPropType = {
  value: number;
  textInfo: string;
}
export default function Progressbar({ value, textInfo }: ProgressBarPropType) {
  const [system] = useAtom(systemAtom)
  const value_int = (value / system) * 100;
  return (
    <div className="max-w-[400px] mb-2.5">
      <CircularProgressbarWithChildren
        value={value_int}
        circleRatio={0.6}
        strokeWidth={12}
        styles={{
          root: {
            transform: "rotate(-108deg)",
          },
          path: {
            stroke: `${
              value >= 4.5
                ? `#3e98c7`
                : value >= 3.5 && value < 4.5
                ? `green`
                : value >= 2.4 && value < 3.5
                ? `orange`
                : value >= 1.5 && value < 2.4
                ? `red`
                : `black`
            }`,
          },
          trail: { stroke: "rgba(128,128,200, 0.4)", strokeLinecap: "round" },
        }}
      >
        <div
          style={{
            fontSize: 32,
            marginTop: -30,
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          <strong style={{ display: "block" }}>{value}</strong>
          <p style={{ fontSize: 16 }}>{textInfo}</p>
        </div>
      </CircularProgressbarWithChildren>
    </div>
  );
}

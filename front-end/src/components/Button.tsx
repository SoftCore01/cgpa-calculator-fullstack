import { cn } from "../utils/cn";

export default function Button({
  className='',
  ...props
}: React.ComponentProps<"button">) {
  const class_Name = cn(
      className,
      "rounded-[8px] px-2.5 py-2 text-sm font-semibold bg-[#1a1a1a] cursor-pointer hover:border-[#646cff]"
  );
  return (
    <>

      <button className={class_Name} {...props}></button>
    </>
  );
}
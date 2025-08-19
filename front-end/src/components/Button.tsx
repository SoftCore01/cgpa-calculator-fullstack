export default function DefaultButton({
  buttonText,
  onClick
}: { buttonText: string, onClick: () => Promise<void> }) {
  return (
    <>
      <button onClick={onClick} className="default-button">{buttonText}</button>
    </>
  );
}

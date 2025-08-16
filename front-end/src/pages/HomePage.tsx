import { BASEURL } from "../utils/Contants";
import { endPoint } from "../utils/endPoints";

const url = BASEURL + endPoint.auth.signout;
export default function HomePage() {
  const cookie = document.cookie;
  const handleSignout = async () => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      }
      console.log("Signed out");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <p>HomePage</p>
      <button onClick={handleSignout}>Signout</button>
      {console.log(cookie,'kvr')}
    </>
  );
}

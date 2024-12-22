import Navbar from "../component/navbar";
import Footer from "../component/Footer";
export const metadata = {
  title: "FilmFlex | Reserve movie now",
  description:
    "Reserve your favorite movie tickets at FilmFlex, the best online movie booking platform. Choose from a wide variety of movies now!",
};

export default function Layout({ children }) {
  return (
      
      <div
         
        >
          <Navbar />

          {children}
          <Footer />
          </div>
  );
}

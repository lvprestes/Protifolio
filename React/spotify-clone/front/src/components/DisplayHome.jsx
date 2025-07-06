import { albumsData, songsData } from "../assets/assets";
import AlbumItem from "./AlbumItem";
import Navbar from "./Navbar";
import SongItem from "./SongItem";

const Section = ({ title, data, ItemComponent }) => (
  <div className="mb-4">
    <h1 className="my-5 font-bold text-2xl">{title}</h1>
    <div className="flex overflow-auto">
      {data.map(item => (
        <ItemComponent
          key={item.id}  // Usando id único como key
          image={item.image}
          name={item.name}
          desc={item.desc}
          id={item.id}
        />
      ))}
    </div>
  </div>
);

const DisplayHome = () => (
  <>
    <Navbar />
    <Section title="Featured Charts" data={albumsData} ItemComponent={AlbumItem} />
    <Section title="Today's Biggest Hits" data={songsData} ItemComponent={SongItem} />
  </>
);

export default DisplayHome;

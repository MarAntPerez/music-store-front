import './App.css';

import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import Navbar from "./components/Navbar";

import AlbumsPage from "./pages/AlbumsPage";
import GlobalSearch from "./components/GlobalSearch";
import ArtistsPage from "./pages/ArtistsPage";
import GenresPage from "./pages/GenresPage";
import FormatsPage from './pages/FormatsPage';
import YearsPage from './pages/YearsPage';
import AlbumDetailPage from './pages/AlbumDetailPage';
import ArtistAlbumsPage from './pages/ArtistAlbumsPage';
import GenreAlbumsPage from './pages/GenreAlbumsPage';
import FormatAlbumsPage from './pages/FormatAlbumsPages';
import YearAlbumsPage from './pages/YearAlbumsPage';
import EditAlbumPage from './pages/EditAlbumPage';
import ManageSongsPage from './pages/ManageSongsPage';
import AvailabilityPage from './pages/AvailabilityPage';
import InventoryPage from './pages/InventoryPage';
import TopArtistsPage from './pages/TopArtistsPage';

function App() {

    return (

        <BrowserRouter>

            <Navbar />

            <Routes>

                <Route
                    path="/"
                    element={<GlobalSearch />}
                />

                <Route
                    path="/albums"
                    element={<AlbumsPage />}
                />

                <Route path="/artists" element={<ArtistsPage />} />

                <Route path="/genres" element={<GenresPage />} />

                <Route path='/formats' element={<FormatsPage />} />

                <Route path='/years' element={<YearsPage />} />

                <Route path='/albums/:id' element={<AlbumDetailPage />} />

                <Route path='/artist/:id' element={<ArtistAlbumsPage />} />

                <Route path='/genre/:id' element={<GenreAlbumsPage />} />

                <Route path='/formats/:id' element={<FormatAlbumsPage />}/>

                <Route path='/years/:year' element={<YearAlbumsPage />}/>

                <Route path='/albums/edit/:id' element={<EditAlbumPage />}/>

                <Route path='/albums/:id/songs' element={<ManageSongsPage />}/>

                <Route path="/availability" element={<AvailabilityPage />} />

                <Route path="/inventory" element={<InventoryPage />} />

                <Route path="/top-artists" element={<TopArtistsPage />} />

            </Routes>

        </BrowserRouter>

    );

}

export default App;
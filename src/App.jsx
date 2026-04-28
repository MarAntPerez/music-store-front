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

            </Routes>

        </BrowserRouter>

    );

}

export default App;
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/common/Layout';
import Home from './pages/Home';
import ToolPage from './pages/ToolPage';
import CategoriesPage from './pages/CategoriesPage'; // if you kept
import CategoryPage from './pages/CategoryPage';
import PopularTools from './pages/PopularTools';
import NewTools from './pages/NewTools';
import About from './pages/About';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import ImageConverter from './pages/ImageConverter';
import PDFConvert from './pages/PDFConvert'; {/* 👈 your only Convert-PDF tool */}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="tools/:toolId" element={<ToolPage />} />
          <Route path="categories" element={<CategoriesPage />} /> {/* Optional */}
          <Route path="categories/:categoryId" element={<CategoryPage />} />
          <Route path="popular" element={<PopularTools />} />
          <Route path="new" element={<NewTools />} />
          <Route path="convert-image" element={<ImageConverter />} />
          <Route path="convert-pdf" element={<PDFConvert />} /> {/* ✅ Main PDF Converter */}
          <Route path="about" element={<About />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="terms" element={<Terms />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
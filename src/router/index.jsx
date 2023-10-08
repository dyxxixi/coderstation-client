import { Routes, Route, Navigate } from 'react-router-dom'

// 引入页面
import Issues from "../pages/Issues";
import Books from "../pages/Books";
import Interviews from "../pages/Interviews";
import AddIssue from '../pages/AddIssue';
import IssueDetail from '../pages/IssueDetail';
import SearchPage from '../pages/SearchPage';
import BookDetail from '../pages/BookDetail';
import Personal from '../pages/Personal';

function RouteConfig() {
  return (
    <Routes>
      <Route path='/issues' element={<Issues />} />
      <Route path='/books' element={<Books />} />
      <Route path='/interviews' element={<Interviews />} />
      <Route path='/addIssue' element={<AddIssue />} />
      <Route path='/issues/:id' element={<IssueDetail />} />
      <Route path='/books/:id' element={<BookDetail />} />
      <Route path='/searchPage' element={<SearchPage />} />
      <Route path='/personal' element={<Personal />} />
      <Route path='/' element={<Navigate replace to='/issues' />} />
    </Routes>
  );
}

export default RouteConfig;

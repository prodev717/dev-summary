import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Landing from '../../pages/Landing';
import DevInfo from '../../pages/DevInfo';
import RepoInfo from '../../pages/RepoInfo';

export default function Navigator() {
    const location = useLocation();

    useEffect(() => {
        switch (location.pathname) {
            case '/devinfo':
                document.title = 'DevInfo';
                break;
            case '/repoinfo':
                document.title = 'RepoInfo';
                break;
            case '/apidocs':
                document.title = 'API Documentation';
                break;
            default:
                document.title = 'Git2Know';
        }
    }, [location])

    return (
        <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/devinfo" element={<DevInfo />} />
            <Route path="/repoinfo" element={<RepoInfo />} />
        </Routes>
    );
};
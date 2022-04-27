// Lib
import React, { useState, useEffect } from 'react';

// Tauri
import { invoke } from '@tauri-apps/api';

// UI
import { message } from 'antd';

// Style
import './App.css';

// Components
import DirectoryListing from './components/DirectoryListing';
import TopBar from './components/TopBar';

// Types
import { DirectoryListingItem } from './types';

const fetchOptions = {
  sorting: 'Alphabetical',
  reverse: false,
  foldersFirst: true
};

const App: React.FC = () => {
  const [path, setPath] = useState<string>('/dir/dir');
  const [pathError, setPathError] = useState<string | undefined>(undefined);
  const [files, setFiles] = useState<DirectoryListingItem[]>([]);
  const [fetching, setFetching] = useState<boolean>(true);

  // const fetchDirectotyListing = async (path: string) => {
  //   setFetching(true);
  //   // message.error({ content: `fetching ${path}` });
  //   await invoke<DirectoryListingItem[]>('get_directory_listing', { ...fetchOptions, path })
  //     .then(result => {
  //       setFiles(result);
  //       setPathError(undefined);
  //     })
  //     .catch(setPathError);
  //   setFetching(false);
  // };

  const fetchDirectotyListing = (path: string) => {
    setFetching(true);
    const x: DirectoryListingItem[] = [];
    for (let i = 0; i < 3500; i++) {
      x.push({
        filename: 'filename',
        path,
        size: 609,
        extension: 'kekw',
        is_file: false,
        is_dir: true,
        is_symlink: false,
      });
      setFiles(x);
    }
    setFetching(false);
  };

  useEffect(() => {
    fetchDirectotyListing(path);
  }, [path]);

  return (
    <div className="App">
      <TopBar path={path} setPath={setPath} pathError={pathError} />
      <DirectoryListing files={files} fetching={fetching} />
    </div>
  );
};

export default App;

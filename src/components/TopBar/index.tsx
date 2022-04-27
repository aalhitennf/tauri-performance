// Lib
import React, { useState, KeyboardEvent, useEffect } from 'react';

// UI
import { Input, InputProps } from 'antd';

// Style
import './index.css';

// Types

interface Props {
  path: string;
  setPath: (value: string) => void;
  pathError: string | undefined;
}

const TopBar: React.FC<Props> = ({ path, setPath, pathError }) => {

  const [currentPath, setCurrentPath] = useState<string>(path);
  const [status, setStatus] = useState<InputProps['status']>('');

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    switch (event.code) {
      case 'Tab':
        event.preventDefault();
        break;
      case 'Enter':
        event.preventDefault();
        setPath(trimPath(currentPath));
        break;
      default:
        break;
    }
  };

  const trimPath = (p: string): string => {
    if (p.endsWith('/')) {
      p = p.slice(0, p.length - 1);
    }
    return p;
  };

  useEffect(() => {
    if (pathError) {
      setStatus('error');
    } else {
      setStatus(undefined);
    }
  }, [pathError]);

  return (
    <div id="top-bar-container" className="no-select">
      <Input
        defaultValue={currentPath}
        placeholder={currentPath}
        value={currentPath}
        onChange={event => setCurrentPath(event.target.value)}
        onKeyDown={event => handleKeyDown(event)}
        status={status}
      />
    </div>
  );
};

export default TopBar;

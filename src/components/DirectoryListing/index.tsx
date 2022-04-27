// Lib
import React, { useState, useEffect } from 'react';
import DragSelect from 'dragselect';

// Components
import ListItem from './ListItem';

// Style
import './index.css';

// Types
import { DirectoryListingItem } from '../../types';

interface Props {
  files: DirectoryListingItem[];
  fetching: boolean;
}

const DirectoryListing: React.FC<Props> = ({ files, fetching }) => {

  const [ds, setDs] = useState<DragSelect | null>(null);

  useEffect(() => {
    if (!fetching) {
      if (ds) {
        ds.clearSelection();
        ds.removeSelectables(document.getElementsByClassName('list-item-container') as unknown as DSInputElements);
        ds.stop();
        setDs(null);
      }

      setDs(new DragSelect({
        selectables: document.getElementsByClassName('list-item-container') as unknown as DSInputElements,
        area: document.getElementById('directory-listing-scroll-container') ?? undefined,
        draggability: false,
        autoScrollSpeed: 50,
      }));

    }
  }, [fetching]);

  return (
    <div id="directory-listing-container" className="no-select">
      <div id="directory-listing-scroll-container">
        {files.map((f, i) => <ListItem key={i} item={f} />)}
      </div>
    </div>
  );
};

export default DirectoryListing;

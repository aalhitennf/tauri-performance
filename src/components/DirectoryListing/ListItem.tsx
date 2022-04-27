// Lib
import React from 'react';

// Style
import './ListItem.css';

// Resources
import { icons } from '../../resources';

// Types
import { DirectoryListingItem } from '../../types';


interface Props {
  item: DirectoryListingItem;
}

const ListItem: React.FC<Props> = ({ item }) => {
  const icon = item.is_dir ? icons.folder : icons.filetext;

  return (
    <div className="list-item-container">
      <div className="list-item-inner">
        <div>
          <img
            src={icon}
            className="pointer-events-none"
          />
        </div>
        <div><p>{item.filename.substring(0, 18)}</p></div>
      </div>
    </div>

  );
};

export default ListItem;

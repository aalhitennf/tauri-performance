export type DirectoryListingItem = {
  filename: string;
  path: string;
  size: number,
  extension: string,
  is_file: boolean,
  is_dir: boolean,
  is_symlink: boolean,
};

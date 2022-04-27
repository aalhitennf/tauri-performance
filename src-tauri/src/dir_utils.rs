
use std::{result::Result, path::Path, fs::DirEntry};

use serde::{Serialize, Deserialize};

#[derive(Serialize)]
pub struct DirectoryListingItem {
    filename: String,
    path: String,
    size: u64,
    extension: String,
    is_file: bool,
    is_dir: bool,
    is_symlink: bool,
}

impl TryFrom<DirEntry> for DirectoryListingItem {
    type Error = Box<dyn std::error::Error>;
    fn try_from(entry: DirEntry) -> Result<Self, Self::Error> {
        let filename = entry.file_name().to_str().map_or("default".into(), |f| f.to_string());
        let path = entry.path().to_str().map_or("default".into(), |p| p.to_string());
        let extension = if entry.path().is_dir() {
            "dir".into()
        } else {
            entry.path().extension().map_or("none".to_string(), |s| s.to_str().map_or("error".into(), |d| d.to_string()))
        };

        let metadata = entry.metadata()?;

        Ok(DirectoryListingItem {
            filename,
            path,
            size: metadata.len(),
            extension,
            is_file: metadata.is_file(),
            is_dir: metadata.is_dir(),
            is_symlink: metadata.is_symlink()
        })
    }
}

fn stringify_io_error(x: std::io::Error) -> String { format!("error code: {}", x) }

#[derive(Serialize, Deserialize)]
pub enum Sorting {
    Alphabetical,
    Size,
    Extension,
}

type DirectoryListing = Vec<DirectoryListingItem>;

#[tauri::command]
pub fn get_directory_listing(
    path: String,
    sorting: Option<Sorting>,
    reverse: Option<bool>,
    folders_first: Option<bool>,
) -> Result<DirectoryListing, String> {
    let path = Path::new(&path);

    if path.is_dir() {
        let read_dir = std::fs::read_dir(path).map_err(stringify_io_error)?;
        let mut items = read_dir
            .flatten()
            .flat_map(DirectoryListingItem::try_from)
            .collect::<Vec<DirectoryListingItem>>();

        if let Some(sort_type) = sorting {
            match sort_type {
                Sorting::Alphabetical => items.sort_by_key(|k| k.filename.clone()),
                Sorting::Size => items.sort_by_key(|k| k.size),
                Sorting::Extension => items.sort_by_key(|k| k.extension.clone())
            }
        }

        if let Some(value) = folders_first {
            if value { items.sort_by_key(|k| !k.is_dir)}
        }

        if let Some(value) = reverse {
            if value { items.reverse(); }
        }

        Ok(items)
    } else {
        Err("Path is not directory".into())
    }
}
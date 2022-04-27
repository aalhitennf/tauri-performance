#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod dir_utils;

fn main() {
    std::env::set_var("GTK_OVERLAY_SCROLLING", "0");

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            dir_utils::get_directory_listing
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

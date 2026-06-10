// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[cfg_attr(mobile, tauri::mobile_entry_point)]
mod command;
use command::*;

pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            get_file,
            get_file_content,
            save_file
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

use rfd::FileDialog;
use std::{fs, path::PathBuf};

#[tauri::command]
pub fn get_file() -> Option<PathBuf> {
    FileDialog::new()
        .add_filter("Markdown Files", &["md"])
        .set_directory("./")
        .pick_file()
}

#[tauri::command]
pub fn get_file_content(file: PathBuf) -> Result<String, String> {
    fs::read_to_string(file).map_err(|e| e.to_string())
}

#[tauri::command]
pub fn save_file(file_path: PathBuf, content: String) -> Result<(), String> {
    fs::write(file_path, content).map_err(|e| e.to_string())
}

// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::{fs, path::PathBuf};

use rfd::FileDialog;

fn main() {
    marky_lib::run();
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_file_content, get_file])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn get_file() -> PathBuf {
    FileDialog::new()
        .add_filter("Markdown Files", &["md"])
        .set_directory("/")
        .pick_file()
        .unwrap()
}

#[tauri::command]
fn get_file_content(file: PathBuf) -> String {
    fs::read_to_string(file).unwrap()
}

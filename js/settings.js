const STORAGE_KEY = "userSettings";

const form = document.getElementById("settings-form");
const messageEl = document.getElementById("form-message");

function loadSettings() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return;

  const settings = JSON.parse(saved);

  form.displayName.value = settings.displayName ?? "";
  form.email.value = settings.email ?? "";
  form.theme.value = settings.theme ?? "light";
  form.language.value = settings.language ?? "en";
  form.emailNotifications.checked = settings.emailNotifications ?? false;
  form.pushNotifications.checked = settings.pushNotifications ?? false;
}

function validateForm() {
  if (!form.displayName.value.trim()) {
    return "Display name is required.";
  }
  if (!form.email.validity.valid) {
    return "Please enter a valid email.";
  }
  return null;
}

function saveSettings(event) {
  event.preventDefault();

  const error = validateForm();
  if (error) {
    messageEl.textContent = error;
    messageEl.className = "error";
    return;
  }

  const settings = {
    displayName: form.displayName.value.trim(),
    email: form.email.value.trim(),
    theme: form.theme.value,
    language: form.language.value,
    emailNotifications: form.emailNotifications.checked,
    pushNotifications: form.pushNotifications.checked,
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  messageEl.textContent = "Settings saved successfully.";
  messageEl.className = "success";
}

form.addEventListener("submit", saveSettings);
loadSettings();

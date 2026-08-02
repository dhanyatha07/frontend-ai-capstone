(function () {
  "use strict";

  var STORAGE_KEY = "userSettings";

  var DEFAULTS = {
    displayName: "",
    email: "",
    theme: "system",
    language: "en",
    emailNotifications: true,
    pushNotifications: false,
  };

  var form = document.getElementById("settings-form");
  var statusEl = document.getElementById("form-status");
  var resetBtn = document.getElementById("reset-btn");

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function sanitizeSettings(data) {
    if (!data || typeof data !== "object") {
      return Object.assign({}, DEFAULTS);
    }

    var theme = data.theme;
    var language = data.language;

    return {
      displayName:
        typeof data.displayName === "string"
          ? data.displayName
          : DEFAULTS.displayName,
      email: typeof data.email === "string" ? data.email : DEFAULTS.email,
      theme: theme === "light" || theme === "dark" || theme === "system"
        ? theme
        : DEFAULTS.theme,
      language: language === "en" || language === "es" || language === "fr"
        ? language
        : DEFAULTS.language,
      emailNotifications:
        typeof data.emailNotifications === "boolean"
          ? data.emailNotifications
          : DEFAULTS.emailNotifications,
      pushNotifications:
        typeof data.pushNotifications === "boolean"
          ? data.pushNotifications
          : DEFAULTS.pushNotifications,
    };
  }

  function loadSettings() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return Object.assign({}, DEFAULTS);
      }
      return sanitizeSettings(JSON.parse(raw));
    } catch (error) {
      return Object.assign({}, DEFAULTS);
    }
  }

  function saveSettings(settings) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }

  function getFormData() {
    return {
      displayName: form.displayName.value,
      email: form.email.value,
      theme: form.theme.value,
      language: form.language.value,
      emailNotifications: form.emailNotifications.checked,
      pushNotifications: form.pushNotifications.checked,
    };
  }

  function applySettingsToForm(settings) {
    form.displayName.value = settings.displayName;
    form.email.value = settings.email;

    var themeInput = form.querySelector('input[name="theme"][value="' + settings.theme + '"]');
    if (themeInput) {
      themeInput.checked = true;
    }

    form.language.value = settings.language;
    form.emailNotifications.checked = settings.emailNotifications;
    form.pushNotifications.checked = settings.pushNotifications;
  }

  function clearStatus() {
    statusEl.textContent = "";
    statusEl.className = "form-status";
  }

  function showError(message) {
    statusEl.textContent = message;
    statusEl.className = "form-status form-status--error";
  }

  function showSuccess(message) {
    statusEl.textContent = message;
    statusEl.className = "form-status form-status--success";
  }

  function validateSettings(data) {
    if (!data.displayName.trim()) {
      return "Display name is required and cannot be blank.";
    }

    if (!data.email.trim()) {
      return "Email is required.";
    }

    if (!isValidEmail(data.email.trim())) {
      return "Please enter a valid email address.";
    }

    return "";
  }

  function handleSubmit(event) {
    event.preventDefault();
    clearStatus();

    var formData = getFormData();
    var error = validateSettings(formData);

    if (error) {
      showError(error);
      return;
    }

    var settings = sanitizeSettings({
      displayName: formData.displayName.trim(),
      email: formData.email.trim(),
      theme: formData.theme,
      language: formData.language,
      emailNotifications: formData.emailNotifications,
      pushNotifications: formData.pushNotifications,
    });

    saveSettings(settings);
    applySettingsToForm(settings);
    showSuccess("Settings saved successfully.");
  }

  function handleReset() {
    clearStatus();
    applySettingsToForm(Object.assign({}, DEFAULTS));
  }

  form.addEventListener("submit", handleSubmit);
  resetBtn.addEventListener("click", handleReset);

  applySettingsToForm(loadSettings());
})();

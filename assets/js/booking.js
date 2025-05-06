document.addEventListener("DOMContentLoaded", function () {
  const salonSelect = document.getElementById("salon");
  const masterSelect = document.getElementById("master");
  const timeSelect = document.getElementById("time");
  const submitButton = document.getElementById("submit");

  // Пример данных
  const salons = [
    { id: 1, name: "Салон 1" },
    { id: 2, name: "Салон 2" },
    { id: 3, name: "Салон 3" },
  ];

  const masters = {
    1: [
      { id: 1, name: "Мастер 1", salonId: 1 },
      { id: 2, name: "Мастер 2", salonId: 1 },
    ],
    2: [
      { id: 3, name: "Мастер 3", salonId: 2 },
      { id: 4, name: "Мастер 4", salonId: 2 },
    ],
    3: [
      { id: 5, name: "Мастер 5", salonId: 3 },
      { id: 6, name: "Мастер 6", salonId: 3 },
    ],
  };

  const availableTimes = {
    1: ["10:00", "11:00", "12:00", "13:00"],
    2: ["14:00", "15:00", "16:00", "17:00"],
    3: ["09:00", "10:00", "11:00", "12:00"],
    4: ["13:00", "14:00", "15:00", "16:00"],
  };

  // Функция для обновления select элементов
  function updateSelect(selectElement, options) {
    selectElement.innerHTML = ""; // Очистить текущие опции
    const placeholder = document.createElement("option");
    placeholder.classList.add("option", "selected");
    placeholder.textContent = "Выберите...";
    selectElement.appendChild(placeholder);

    options.forEach((option) => {
      const optionElement = document.createElement("option");
      optionElement.setAttribute("value", option.id || option);
      optionElement.textContent = option.name || option;
      selectElement.appendChild(optionElement);
    });
  }

  // Заполняем список салонов
  updateSelect(salonSelect, salons);

  // Инициализация nice-select для всех элементов на странице, за исключением элементов в sidebar
  $(".nice-select:not(.xs-sidebar-widget .nice-select)").niceSelect();

  // Обработчик для выбора салона
  salonSelect.addEventListener("change", function () {
    const selectedSalonId = parseInt(salonSelect.value);
    masterSelect.innerHTML = ""; // Сбросить мастеров
    timeSelect.innerHTML = ""; // Сбросить время

    if (selectedSalonId) {
      const mastersForSalon = masters[selectedSalonId] || [];
      updateSelect(masterSelect, mastersForSalon);
      masterSelect.disabled = false;
      $(masterSelect).niceSelect("update"); // Обновляем nice-select для мастера
    } else {
      masterSelect.disabled = true;
      timeSelect.disabled = true;
      submitButton.disabled = true;
    }
  });

  // Обработчик для выбора мастера
  masterSelect.addEventListener("change", function () {
    const selectedMasterId = parseInt(masterSelect.value);
    timeSelect.innerHTML = ""; // Сбросить время

    if (selectedMasterId) {
      const timesForMaster = availableTimes[selectedMasterId] || [];
      updateSelect(timeSelect, timesForMaster);
      timeSelect.disabled = false;
      $(timeSelect).niceSelect("update"); // Обновляем nice-select для времени
    } else {
      timeSelect.disabled = true;
      submitButton.disabled = true;
    }
  });

  // Обработчик для выбора времени
  timeSelect.addEventListener("change", function () {
    submitButton.disabled = !timeSelect.value;
  });

  // Обработчик отправки формы
  document
    .getElementById("booking-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      const formData = new FormData(event.target);
      const salonId = formData.get("salon");
      const masterId = formData.get("master");
      const time = formData.get("time");

      console.log(
        `Запись: Салон ID - ${salonId}, Мастер ID - ${masterId}, Время - ${time}`
      );

      alert(
        `Запись на стрижку успешна! Салон: ${salonId}, Мастер: ${masterId}, Время: ${time}`
      );
    });
});

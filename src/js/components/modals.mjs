const openModalButtons = document.querySelectorAll("[data-modal-target]");
const closeModalButtons = document.querySelectorAll("[data-close-button]");
const modalOverlay = document.getElementById("modal-overlay");

export function modalListeners() {
  openModalButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const modal = document.querySelector(button.dataset.modalTarget);
      openModal(modal);
    });
  });

  closeModalButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const modal = button.closest(".modal");
      closeModal(modal);
    });
  });
}
modalListeners();

export function openModal(modal) {
  if (modal == null) return;
  modal.classList.add("active");
  modalOverlay.classList.add("active");
}

export function closeModal(modal) {
  if (modal == null) return;
  modal.classList.remove("active");
  modalOverlay.classList.remove("active");
}

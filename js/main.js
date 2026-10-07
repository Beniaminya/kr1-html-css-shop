const orderDialog = document.getElementById("order-dialog");
const openDialogButtons = document.querySelectorAll(".js-open-dialog");
const closeDialogButtons = document.querySelectorAll(".js-close-dialog");
const dialogProduct = document.getElementById("dialog-product");

openDialogButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const dialogForm = orderDialog.querySelector("form");
    const successMessage = orderDialog.querySelector(".success-message");

    dialogForm.hidden = false;
    dialogForm.reset();
    successMessage.hidden = true;
    dialogProduct.value = button.dataset.product;
    orderDialog.showModal();
  });
});

closeDialogButtons.forEach((button) => {
  button.addEventListener("click", () => {
    orderDialog.close();
  });
});

const demoForms = document.querySelectorAll(".js-demo-form");

demoForms.forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formElements = Array.from(form.elements);

    formElements.forEach((element) => {
      if (element.willValidate) {
        element.removeAttribute("aria-invalid");
      }
    });

    if (!form.checkValidity()) {
      formElements.forEach((element) => {
        if (element.willValidate && !element.checkValidity()) {
          element.setAttribute("aria-invalid", "true");
        }
      });

      form.reportValidity();
      return;
    }

    const successMessage = document.getElementById(form.dataset.success);
    successMessage.hidden = false;
    form.reset();

    if (form.closest("dialog")) {
      form.hidden = true;
    }
  });
});

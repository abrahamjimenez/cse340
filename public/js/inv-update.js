const form = document.querySelector("#updateForm");
form.addEventListener("change", function () {
    const updateBtn = document.querySelector("[name='submit']");
    updateBtn.removeAttribute("disabled");
});
